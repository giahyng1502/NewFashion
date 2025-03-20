import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import ProductCard from '../../components/ProductCard';
import BaseHeader from '../../components/BaseHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';

const tabs = ['All orders', 'Processing', 'Shipped', 'Delivered', 'Returns'];
const orders = [
  {
    id: '1',
    status: 'Shipped',
    deliveryDate: 'Mar 17-30',
    totalItems: 1,
    totalPrice: '805.329đ',
    product: {
      name: 'Embroidered Wool-blend Scarf Jacket',
      color: 'Green',
      size: 'XL',
      image: require('../../assets/image/ig_product2.png'),
      price: '268.443d x 3',
    },
  },
]

const OrderItem = ({ order }) => (
  <View style={styles.orderContainer}>
    <View style={styles.breaker} />

    <View style={[styles.header, { padding: 10 }]}>
      <Text style={[styles.textHeader, { fontSize: 16 }]}>{order.status}</Text>
      <Text style={[styles.textHeader, { fontSize: 14, color: '#737373' }]}>
        {order.totalItems} items: <Text style={[styles.textHeader, { fontSize: 14 }]}>{order.totalPrice}</Text>
      </Text>
    </View>

    <Text style={[styles.textHeader, { fontSize: 16, color: '#FA7806', padding: 10 }]}>Delivery: {order.deliveryDate}</Text>

    <View style={styles.productContainer}>
      <Image source={order.product.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <View>
          <Text style={styles.productName}>{order.product.name}</Text>
          <Text style={[styles.productName, { color: '#BBBBBB' }]}>{order.product.color}, {order.product.size}</Text>
        </View>

        <Text style={[styles.textHeader, { fontSize: 14, color: '#FA7806' }]}>{order.product.price}</Text>
      </View>
    </View>

    <TouchableOpacity style={styles.buyAgainButton}>
      <Text style={[styles.textHeader, { fontSize: 16 }]}>Buy this again</Text>
    </TouchableOpacity>
    <View style={styles.breaker} />
  </View>
);

const OrderScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const dispatch = useDispatch();
  const {products, loading, page, hasMore} = useSelector(state => state.product);

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      dispatch(fetchProducts(page));
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <BaseHeader title="Your orders" showLeftButton={true} showRightButton={true} rightIcon={require('../../assets/buttons/bt_cart2.png')} onLeftButtonPress={() => { navigation.goBack() }} />


<FlatList
      data={products} // Danh sách sản phẩm chính
      keyExtractor={(item) => item._id}
      numColumns={2}
      ListHeaderComponent={() => (
        <>
          <FlatList
            data={tabs}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setSelectedTab(index)} style={styles.tab}>
                <Text style={[styles.tabText, selectedTab === index && styles.activeText]}>{item}</Text>
                {selectedTab === index && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
          {orders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image source={require('../../assets/icons/ic_emptyOrder.png')} style={{ width: 60, height: 60 }} />
              <Text style={[styles.textHeader, { fontSize: 16, marginLeft: 10 }]}>You don’t have any processing orders</Text>
            </View>
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <OrderItem order={item} />}
            />
          )}

          <Text style={[styles.textHeader, { fontSize: 16, padding: 10 }]}>Maybe you will be also like</Text>
        </>
      )}
      renderItem={({ item }) => <ProductCard item={item} onSelected={() => {handleSelectedItem(item)}} />}
      onEndReached={loadMoreProducts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{paddingHorizontal: 3,backgroundColor: '#fff'}}
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
    padding: 12
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
    backgroundColor: '#fff'
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