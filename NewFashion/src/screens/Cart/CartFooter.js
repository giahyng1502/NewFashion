import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image,FlatList } from "react-native";

const CartFooter = ({ visible, originalPrice, discountedPrice, itemCount }) => {
  if (!visible) return null; // Nếu `visible` = false, ẩn modal
  const [isExpanded, setIsExpanded] = useState(false);

  const DATA = [
    {
      id: '1',
      image: require("../../assets/image/ig_product1.png"), // Thay bằng link ảnh thật
      price: '268.443đ',
      quantity: 'x3',
      status: 'Almost sold out'
    },
    {
      id: '2',
      image: require("../../assets/image/ig_product1.png"),
      price: '199.999đ',
      quantity: 'x1',
      status: 'Limited stock'
    },
    {
      id: '3',
      image: require("../../assets/image/ig_product1.png"),
      price: '320.000đ',
      quantity: 'x2',
      status: 'Selling fast'
    }
  ];

  const ProductItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={`${item.image}`} style={styles.image} resizeMode="cover" />
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
        <Text style={styles.priceDetail}>{item.price}</Text>
        <Text style={styles.quantityDetail}>{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Giao diện modal hiển thị khi mở */}
      <View style={[styles.priceDetailContainer, { zIndex: isExpanded ? 10 : -1 }]}>
        <View style={styles.headerContainer}>
          <Text />
          {/* Tiêu đề */}
          <Text style={styles.cointainerName}>Price details</Text>
          {/* Nút đóng */}
          <TouchableOpacity onPress={() => setIsExpanded(false)}>
            <Image source={require("../../assets/bt_exit.png")} style={styles.checkbox}/>
          </TouchableOpacity>
        </View>
          {/* Danh sách sản phẩm trong giỏ hàng */}
          <View style={styles.listCointainer}>
            <Text style={styles.cointainerName}>Cart (1)</Text>
            <FlatList
              data={DATA}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ProductItem item={item} />}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Bảng giá */}
          <View style={styles.priceBreakdown2}>
            <Text style={styles.totalPrice2}>Item(s) total:</Text>
            <Text style={styles.strikeThrough2}>{originalPrice}đ</Text>
          </View>
          <View style={styles.priceBreakdown2}>
            <Text style={styles.totalPrice2}>Item(s) discount:</Text>
            <Text style={styles.discountText2}>-{originalPrice - discountedPrice}đ</Text>
          </View>

          {/* Tổng giá */}
          <View style={[styles.totalContainer2,{borderTopWidth:0.3,paddingVertical:10}]}>
            <Text style={styles.totalPrice2}>Total:</Text>
            <Text style={styles.totalPrice2}>{discountedPrice * itemCount}đ</Text>
          </View>
      </View>

      <View style={styles.modalContent}>
        {/* Phần chọn tất cả */}
        <View style={styles.priceContainer}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/ic_unchecked.png")}
              style={styles.checkbox}
            />
          </TouchableOpacity>
          <Text style={styles.price}>All</Text>
        </View>

        {/* Phần giá */}
        <View>
          <View style={styles.priceContainer}>
            <Text style={styles.strikeThrough}>{originalPrice}đ</Text>
            <Text style={styles.price}>{discountedPrice}đ</Text>
            <TouchableOpacity onPress={() => setIsExpanded(true)}>
              <Image
                source={require("../../assets/icons/ic_arrowUp.png")}
                style={styles.checkbox}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.discount}>-25.9% limited time</Text>
        </View>

        {/* Nút Checkout */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy now ({itemCount})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "transparent", // Không có màu nền
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  strikeThrough: {
    textDecorationLine: "line-through",
    color: "#888",
    fontSize: 14
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
    marginHorizontal: 5
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  discount: {
    color: "red",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#ff7f00",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  checkbox: {
    width: 20,
    height: 20
  },

  //new
  priceDetailContainer: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection:'column',
    borderColor:'#000',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderWidth: 1,
    borderBottomWidth:0,
    padding:10
  },
  headerContainer: {
    width: "100%",
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:5,
    paddingBottom:10,
    borderBottomWidth:0.3
  },
  cointainerName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  listCointainer:{
    flexDirection:'column',
    padding:10,
    textAlign:'left'
  },

  priceBreakdown2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  strikeThrough2: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  discountText2: {
    color: "orange",
  },
  totalContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  totalPrice2: {
    fontSize: 18,
    fontWeight: "bold",
  },

  itemContainer: {
    width: 120,
    marginRight: 15,
    marginTop:10,
    paddingBottom:10,
    borderBottomWidth:0.3
  },
  image: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  statusContainer: {
    position: 'absolute',
    top:80,
    alignSelf:'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    opacity: 0.8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  priceDetail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityDetail: {
    fontSize: 12,
    color: 'orange'
  },
});

export default CartFooter;