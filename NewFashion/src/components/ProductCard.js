import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import React from 'react'
import StarRating from './StarRating';

const convertPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}

const ProductCard = ({ item, onSelected, style }) => (
  <TouchableOpacity style={[st.card, style]} onPress={() => onSelected(item)}>
    <View style={st.imageContainer}>
      <Image source={{ uri: item.image[0] }} style={st.image} resizeMode='cover' />
    </View>
    <Text style={st.title} numberOfLines={1}>{item.name}</Text>
    {(item.stock <= 10) && <Text style={st.almostSoldOut}>Almost sold out</Text>}
    <View style={st.ratingContainer}>
      <StarRating rating={item.rating} />
      <Text style={{color: '#737373', fontSize: 12}}>{item.rateCount}</Text>
    </View>
    <View style={st.priceContainer}>
      <Text style={st.price}>{convertPrice(item.price)}</Text>
      <Text style={st.sold}>{item.sold} sold</Text>
    </View>
  </TouchableOpacity>
);

export default ProductCard

const st = StyleSheet.create({
  card: {
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
    fontSize: 14,
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
    fontSize: 16,
    color: "#1D1D1D", 
    fontWeight: "700",
  },
  cartIcon: {
    width: 35,
    height: 25,
  },
});