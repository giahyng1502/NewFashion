import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native'
import React, { useState, useEffect,useRef } from 'react'
import ProductCard from '../../components/ProductCard';
import BaseHeader from '../../components/BaseHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import { Dimensions } from 'react-native';
import { fetchOrders,cancelOrder } from '../../redux/actions/orderActions';
import { createPayment } from '../../redux/actions/paymentAction';
import SupportFunctions from '../../utils/SupportFunctions'
import generatePaymentCode from '../../until/genaratePaymentCode';

const screenWidth = Dimensions.get('window').width;

function formatDate(isoString) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0 nên +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const OrderScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(-2);
  const dispatch = useDispatch();
  const { products, loading, page, hasMore } = useSelector(state => state.product);
  const [isLoading, setIsLoading] = useState(true)
  const momoReturn = useRef(null);
  const orderStatus = [
    { id: -2, name: 'Tất cả các đơn hàng' },
    { id: 6, name: 'Đang chờ thanh toán' },
    { id: 0, name: 'Đang xử lý' },
    { id: 1, name: 'Chờ giao hàng' },
    { id: 2, name: 'Đang giao hàng' },
    { id: 3, name: 'Đã giao hàng' },
    { id: 4, name: 'Đã hủy' } ];
  const { orders } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  useEffect(() => {
    if (orders) {
      setIsLoading(false)
    }
  }, [orders])

  useEffect(() => {
    if (selectedTab === -2) {
      dispatch(fetchOrders()); // null = lấy tất cả đơn hàng
    } else {
      dispatch(fetchOrders(selectedTab)); // Lấy đơn hàng theo trạng thái cụ thể
    }
  }, [selectedTab])

  const handleSelectedItem = (item, discount, expire) => {
    console.log('Selected item:', item);

    navigation.navigate("ProductDetail", { item, discount, expire });
  }

    const handleCancelOrder = (orderId) => {
      Alert.alert(
        "Xác nhận Hủy bỏ",
        "Bạn có chắc chắn muốn hủy đơn hàng này không?",
        [
          {
            text: "Không",
            style: "cancel",
          },
          {
            text: "Đúng",
            style: "destructive",
            onPress: () => {
              dispatch(cancelOrder(orderId)).unwrap();
              Alert.alert('Thành công','Đơn hàng đã bị hủy')
            },
          },
        ],
        { cancelable: true }
      );
    };

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      dispatch(fetchProducts(page));
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải đơn hàng...</Text>
      </View>
    );
  }

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="small" color="#FA7806" />
      </View>
    )
  }

  const handleMoMoPayment = async (orderData) => {
    console.log('order data',orderData);
    try {
        const response = await createPayment({
            priceProduct: orderData.totalPrice,
            rawOrderId: generatePaymentCode(),
            idOrder: orderData._id,
        });

        if (response && response.resultCode === 0) {
            momoReturn.current = response;
            Linking.openURL(momoReturn.current.payUrl);
        } else {
          console.log('res',response);
            Alert.alert('Thông báo', 'Không thể thanh toán bằng hình thức momo lúc này');
        }
    } catch (error) {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi tạo thanh toán MoMo');
        console.log('lỗi',error);
    }
};

  const OrderItem = ({ order, orderStatus }) => (
    <View style={{ backgroundColor: '#fff', width: screenWidth }}>
      <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderTopWidth: 5, borderBottomColor: '#BBBBBB', borderTopColor: '#e7e7e7', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>
          {orderStatus.find(status => status.id === order.status)?.name}
        </Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('OrderDetail', { order })}>
          <Text style={{ fontSize: 14, color: '#737373', fontWeight: 'bold' }}>
            {order.items.length} mặt hàng: <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>{SupportFunctions.convertPrice(order.totalPrice)}</Text>
          </Text>
          <Image source={require('../../assets/icons/ic_arrowRight.png')} style={{ width: 12, height: 12, marginLeft: 3 }} />
        </TouchableOpacity>

      </View>

      <Text style={{ fontSize: 16, color: '#FA7806', padding: 10, fontWeight: 'bold' }}>Giao hàng lúc: {formatDate(order.dateCreated)}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
        <Image source={{ uri: order.items[0].color.imageColor }} style={styles.productImage} />
        <View style={{flexDirection: 'column', justifyContent: 'space-around', flex: 1,marginRight:10}}>
          <View style={{flex:1}}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize: 14,color: '#000',fontWeight: 'semibold'}}>{order.items[0].productName}</Text>
            <Text style={[styles.productName, { color: '#BBBBBB' }]}>{order.items[0].color.nameColor}, {order.items[0].size}</Text>
          </View>

          <Text style={[styles.textHeader, { fontSize: 14, color: '#FA7806' }]}>{order.items[0].price} x {order.items[0].quantity}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10 }}>
        {order.status === 0 ? (
          <TouchableOpacity style={{ marginHorizontal: 5, marginRight: 10,paddingVertical: 5, paddingHorizontal: 12, borderWidth: 1, borderColor: 'black', borderRadius: 18, alignSelf: 'flex-end' }}
            onPress={() => handleCancelOrder(order._id)}>
            <Text style={[styles.textHeader, { fontSize: 16 }]}>Hủy đơn hàng</Text>
          </TouchableOpacity>
        ) : (<View />)}

        {order.status === 6 ? (
          <TouchableOpacity style={{ marginHorizontal: 5, marginRight: 10, paddingVertical: 5, paddingHorizontal: 12, borderWidth: 1, borderColor: 'black', borderRadius: 18, alignSelf: 'flex-end' }}
            onPress={() => {console.log('order',order);
              handleMoMoPayment(order)}}>
            <Text style={[styles.textHeader, { fontSize: 16 }]}>Thanh toán ngay</Text>
          </TouchableOpacity>
        ) : (<View />)}
      </View>
      <View style={styles.breaker} />
    </View>
  )

  return (
    <View style={styles.container}>
      {/* header */}
      <BaseHeader
        title="Đơn hàng của bạn"
        showLeftButton={true}
        showRightButton={true}
        rightIcon={require('../../assets/buttons/bt_cart2.png')}
        onLeftButtonPress={() => { navigation.replace('Main') }}
        onRightButtonPress={() => { navigation.navigate('Cart') }}
      />

      <FlatList
        data={products} // Danh sách sản phẩm chính
        keyExtractor={(item,index) =>`${item._id}${index} products in orderScreen`}

        numColumns={2}
        ListHeaderComponent={() => (
          <>
            <FlatList
              data={orderStatus}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => setSelectedTab(Number(orderStatus[index].id))} style={styles.tab}>
                  <Text style={[styles.tabText, selectedTab === Number(item.id) && styles.activeText]}>{item.name}</Text>
                  {selectedTab === Number(item.id) && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
            {(orders && orders.length === 0) ? (
              <View style={styles.emptyContainer}>
                <Image source={require('../../assets/icons/ic_emptyOrder.png')} style={{ width: 60, height: 60 }} />
                <Text style={[styles.textHeader, { fontSize: 16, marginLeft: 10 }]}>Bạn không có đơn hàng nào</Text>
              </View>
            ) : (
              <View style={{ width: '100%' }}>
                <FlatList
                  data={orders}
                  pagingEnabled={true}
                  keyExtractor={(item,index) => `${item._id}`+index}
                  snapToInterval={screenWidth} // Cố định khoảng cách cuộn
                  snapToAlignment="center"
                  renderItem={({ item }) => <OrderItem order={item} orderStatus={orderStatus} />}
                />
              </View>
            )}

            <Text style={[styles.textHeader, { fontSize: 16, padding: 10 }]}>Có lẽ bạn cũng sẽ thích</Text>
          </>
        )}
        renderItem={({ item }) => (
          <View style={{ flex: 1 / 2, padding: 5 }}>
            <ProductCard
              item={item}
              onSelected={() => { handleSelectedItem(item) }}
            />
          </View>
        )}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingHorizontal: 3, backgroundColor: '#fff' }}
      />
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#BBBBBB',
    alignItems: 'center'
  },
  icon: {
    width: 25,
    height: 25
  },
  textHeader: {
    color: '#000',
    fontWeight: 'bold'
  },
  tab: {
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#BBBBBB'
  },
  tabText: {
    fontSize: 18,
    color: 'gray',
    color: "#737373",
    fontWeight: 'bold'
  },
  activeText: {
    color: 'black',
    fontWeight: 'bold'
  },
  activeIndicator: {
    width: 20,
    height: 4,
    backgroundColor: 'black',
    marginTop: 4
  },
  emptyContainer: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    padding: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  orderContainer: {
    backgroundColor: '#fff',
    flex: 1,
    marginRight: 10
  },
  breaker: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    height: 5
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10
  },
  productDetails: {
    height: 100,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  productName: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'semibold'
  },
  buyAgainButton: {
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 18,
    alignSelf: 'flex-end'
  },
  list: {
    paddingHorizontal: 3,
    backgroundColor: '#fff',
  }
})