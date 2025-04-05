import { FlatList, StyleSheet, Text, View, ActivityIndicator,TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import BaseHeader from '../../components/BaseHeader'
import { fetchProducts } from '../../redux/actions/productActions';
import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupon } from '../../redux/actions/voucherAction'

const CouponScreen = ({ navigation }) => {
  const {products, loading, page, hasMore} = useSelector(state => state.product);
  const { coupons } = useSelector(state => state.coupons);
  const dispatch = useDispatch();
  const [showHelpButton, setshowHelpButton] = React.useState(false)

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

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      dispatch(fetchProducts(page));
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
      return (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size="small" color="#FA7806" />
        </View>
    )
  }

  useEffect(() => {
    dispatch(fetchCoupon());
  }, []);

  return (
    <View style={st.container}>
      <BaseHeader
        title="Coupons & offers"
        showLeftButton={true}
        onLeftButtonPress={() => navigation.goBack()}
        showRightButton={setshowHelpButton}
        rightIcon={require("../../assets/icons/ic_help.png")}
        onRightButtonPress={null}
      />
     <FlatList
      ListHeaderComponent={
      <>

      {/* Ô nhập code voucher */}
      {/* <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, marginBottom: 10 }}>
        <TextInput placeholder="Enter coupon code" style={{ flex: 1, height: 40, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 10, marginHorizontal: 15 }} />
        <TouchableOpacity style={{ borderColor: "#000000", borderWidth: 1, height: 40, width: 80, borderRadius: 40, justifyContent: "center", marginRight: 10 }}>
          <Text style={{ textAlign: "center", color: "#000000", fontWeight: "bold" }}>Apply</Text>
        </TouchableOpacity>
      </View> */}

      {/* Ghi chú */}
      <Text style={{ fontSize: 12, marginBottom: 12, marginHorizontal: 15 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>The discount code can be used</Text>
        {"\n"}Limit 1 coupon for each purchase. Discount sheets cannot be applied to shipping charges.
      </Text>

      {/* Danh sách coupon */}
      <FlatList
        data={coupons}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ borderTopWidth: 3, marginVertical: 10, marginHorizontal: 12, borderTopColor: '#FA7806', borderRadius: 2, backgroundColor: "#F0FFEB", height: 150, gap: 5 }}>
            <View style={{ backgroundColor: '#FA7806', width: 30, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }}>
              <Text style={{ fontWeight: "bold", color: "#fff", textAlign: "center", fontSize: 10 }}>NEW</Text>
            </View>
            <View style={{ paddingHorizontal: 15 }}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <View style={{ width: 250 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.voucherName}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>{item.voucherDetail}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 12, marginTop: 30 }}>
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                <Text style={{ color: "#737373", fontWeight: "bold", fontSize: 12 }}>For all items</Text>
                <Text style={{ fontWeight: "bold" }}><Text style={{ color: "#737373", fontSize: 12 }}>Code: </Text>{item._id}</Text>
              </View>
            </View>
          </View>
        )}
      />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginVertical: 10 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: '#BBBBBB' }} />
              <Text style={{ marginHorizontal: 10, fontWeight: 'semibold', fontSize: 14, color: '#000' }}>Có thể bạn sẽ thích</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: '#BBBBBB' }} />
            </View>
        </>
      }
      data={products} // Danh sách sản phẩm chính
      keyExtractor={(item) => item._id}
      numColumns={2}
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
      contentContainerStyle={{paddingHorizontal: 3,backgroundColor: '#fff'}}
     />

    </View>
  )
}

export default CouponScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  tab: {
    fontSize: 16,
    color: "#777",
    paddingBottom: 4,
  },

  activetab: {
    fontWeight: "bold",
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  }

})