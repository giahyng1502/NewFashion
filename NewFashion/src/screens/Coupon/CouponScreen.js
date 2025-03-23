import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import BaseHeader from '../../components/BaseHeader'
import { fetchProducts } from '../../redux/actions/productActions';
import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from "react-redux";

const CouponScreen = ({ navigation }) => {
  const tabs = ["All", "Free Shipping", "Discount"];
  const {products, loading, page, hasMore} = useSelector(state => state.product);
  const dispatch = useDispatch();

  const coupon = [
    {
      id: "1",
      type: "discount",
      amount: "70.000₫ DISCOUNT",
      condition: "Applicable to orders over 750.000₫",
      date: "05:07 3/11/2025 - 23:59 4/11/2025",
      usedtype: "For all items",
      code: "vnpromo001",
      colorborder: "#FA7806"
    },
    {
      id: "2",
      type: "discount",
      amount: "170.000₫ DISCOUNT",
      condition: "Applicable to orders over 1.250.000₫",
      date: "05:07 3/11/2025 - 23:59 4/11/2025",
      usedtype: "For all items",
      code: "vnpromo002",
      colorborder: "#FA7806"
    },
    {
      id: "3",
      type: "free_shipping",
      amount: "FREE SHIPPING",
      condition: "Reduce 30.000₫ shipping charges for orders worth 1.000₫ or higher",
      date: "05:07 3/11/2025 - 23:59 4/11/2025",
      usedtype: "For all items",
      code: "vnpromo003",
      colorborder: "#078809"
    },
  ]
  const [selecttabs, setSelecttabs] = useState("All")
  const [title, setTitle] = useState("Coupons & offers")
  const [showHelpButton, setshowHelpButton] = React.useState(false)
  const [filteredCoupons, setFilteredCoupons] = useState(coupon)

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

  //Hàm đọc lọc coupon
  useEffect(()=>{
    if(selecttabs === "All"){
      setFilteredCoupons(coupon);
    }else if(selecttabs === "Free Shipping"){
      setFilteredCoupons(coupon.filter(item=>item.type === "free_shipping"));
    }else if(selecttabs === "Discount"){
      setFilteredCoupons(coupon.filter(item=>item.type === "discount"));
    }
  },[selecttabs])


  return (
    <View style={st.container}>
      <BaseHeader
        title={title}
        showLeftButton={true}
        onLeftButtonPress={() => navigation.goBack()}
        showRightButton={setshowHelpButton}
        rightIcon={require("../../assets/icons/ic_help.png")}
        onRightButtonPress={null}
      />
     <FlatList
      ListHeaderComponent={
        <>
           {/* Thanh chọn thể loại voucher */}
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingVertical: 10 }}
        style={{ flexGrow: 0 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelecttabs(item)} style={{ paddingHorizontal: 30, marginRight: 30 }}>
            <Text style={[st.tab, selecttabs === item && st.activetab]}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Ô nhập code voucher */}
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, marginBottom: 10 }}>
        <TextInput placeholder="Enter coupon code" style={{ flex: 1, height: 40, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 5, marginHorizontal: 15 }} />
        <TouchableOpacity style={{ borderColor: "#000000", borderWidth: 1, height: 40, width: 80, borderRadius: 40, justifyContent: "center", marginRight: 10 }}>
          <Text style={{ textAlign: "center", color: "#000000", fontWeight: "bold" }}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Ghi chú */}
      <Text style={{ fontSize: 12, marginBottom: 12, marginHorizontal: 15 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>The discount code can be used</Text>
        {"\n"}Limit 1 coupon for each purchase. Discount sheets cannot be applied to shipping charges.
      </Text>

      {/* Danh sách coupon */}
      <FlatList
        data={filteredCoupons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ borderTopWidth: 3, marginVertical: 10, marginHorizontal: 12, borderTopColor: item.colorborder, borderRadius: 2, backgroundColor: "#F0FFEB", height: 150, gap: 5 }}>
            <View style={{ backgroundColor: item.colorborder, width: 30, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }}>
              <Text style={{ fontWeight: "bold", color: "#fff", textAlign: "center", fontSize: 10 }}>NEW</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <View style={{ flexDirection: "row", gap: 60 }}>
                <View style={{ width: 250 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.amount}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>{item.condition}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 12, marginTop: 30 }}>{item.date}</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: item.colorborder, height: 25, width: 54, borderRadius: 15, justifyContent: "center" }}>
                  <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Use</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#737373" , fontWeight:"bold", fontSize: 12}}>{item.usedtype}</Text>
                <Text style={{ fontWeight: "bold" }}><Text style={{ color: "#737373", fontSize: 12 }}>Code: </Text>{item.code}</Text>
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
      renderItem={({ item }) => <ProductCard item={item} onSelected={() => {handleSelectedItem(item)}} />}
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