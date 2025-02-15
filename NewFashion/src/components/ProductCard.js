import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import React from 'react'

const starImage = "https://cdn-icons-png.flaticon.com/512/2107/2107957.png";
const cartImage = "https://cdn-icons-png.flaticon.com/512/1170/1170678.png";

const ProductCard = ({ item }) => (
  <View style={st.card}>
    <View style={st.imageContainer}>
      <Image source={{ uri: item.image }} style={st.image} resizeMode='cover' />
    </View>
    <Text style={st.title}>{item.title}</Text>
    {item.almostSoldOut && <Text style={st.almostSoldOut}>Almost sold out</Text>}
    <View style={st.ratingContainer}>
      {[...Array(5)].map((_, index) => (
        <Image
          key={index}
          source={{ uri: starImage }}
          style={[st.star, { tintColor: index < Math.round(item.rating) ? "gold" : "gray" }]}
        />
      ))}
    </View>
    <View style={st.priceContainer}>
      <Text style={st.price}>{item.price}</Text>
      <Text style={st.sold}>{item.sold}</Text>
      <TouchableOpacity>
        <Image source={{ uri: cartImage }} style={st.cartIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

export default ProductCard

const st = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 0.9,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color:'#737373',
    marginVertical: 5,
  },
  almostSoldOut: {
    fontSize: 12,
    color: "red",
    fontWeight: "600",
    color:'#FE7018',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  star: {
    width: 13,
    height: 13,
    marginRight: 2,
  },
  sold: {
    fontSize: 12,
    color: "#737373",
    fontWeight:700,
    marginTop:3,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",  
    paddingHorizontal: 1,
  },
  price: {
    fontSize: 14,
    color: "#1D1D1D", 
    fontWeight: "700",
  },
  cartIcon: {
    width: 20,
    height: 20,
  },
});