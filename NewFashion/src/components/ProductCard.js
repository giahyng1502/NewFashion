import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import React from 'react'
import StarRating from './StarRating';


const ProductCard = ({ item }) => (
  <View style={st.card}>
    <View style={st.imageContainer}>
      <Image source={{ uri: item.image }} style={st.image} resizeMode='cover' />
    </View>
    <Text style={st.title} numberOfLines={1}>{item.title}</Text>
    {item.almostSoldOut && <Text style={st.almostSoldOut}>Almost sold out</Text>}
    <View style={st.ratingContainer}>
      <StarRating rating={item.rating} />
      <Text style={{color: '#737373', fontSize: 12}}>{item.ratingCount}</Text>
    </View>
    <View style={st.priceContainer}>
      <Text style={st.price}>{item.price}</Text>
      <Text style={st.sold}>{item.sold}</Text>
      <TouchableOpacity>
        <Image source={require('../assets/buttons/bt_addToCart.png')} style={st.cartIcon} />
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
    fontWeight: "600",
    color:'#FE7018',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 5,
    gap: 2
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
    alignItems: "center",
    width: "100%",  
    paddingHorizontal: 1,
  },
  price: {
    fontSize: 14,
    color: "#1D1D1D", 
    fontWeight: "700",
  },
  cartIcon: {
    width: 35,
    height: 25,
  },
});