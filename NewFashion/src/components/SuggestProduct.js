import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React, {useRef, useState } from 'react'

const products = [
    {
      _id: "1",
      image: require("../assets/image/img_rcproduct.png"),
      title: "Embroidered Wool-blend Scarf Jacket",
      price: "268.443đ",
      rating: 4,
      countsold: 57,
      sold: "🔥7,9k+ sold",
      almostSoldOut: true,
    },
    {
      _id: "2",
      image: require("../assets/image/img_rcproduct2.png"),
      title: "Unisex Herringbone Black Cat Sweater",
      price: "153.229đ",
      rating: 4,
      countsold: 435,
      sold: "🔥8,1k+ sold",
      almostSoldOut: true,
    },

    {
        _id: "3",
        image: require("../assets/image/img_rcproduct3.png"),
        title: "Unisex Herringbone Black Cat Sweater",
        price: "153.229đ",
        rating: 4,
        countsold: 49,
        sold: "🔥8,1k+ sold",
        almostSoldOut: true,
    },

    {
        _id: "4",
        image: require("../assets/image/img_rcproduct4.png"),
        title: "Unisex Herringbone Black Cat Sweater",
        price: "153.229đ",
        rating: 4,
        countsold: 232,
        sold: "🔥8,1k+ sold",
        almostSoldOut: true,
      },  

  ];

const SuggestProduct = () => {
    const categories = ['Recommended', 'Women', 'Men', 'Sports', 'Kids', 'Baby', 'Office', 'Sleepwear'];
    const flatListRef = useRef(null)
    const [selectedCategory, setSelectedCategory] = useState('All');

    const StarRating = ({ rating }) => {
        return (
          <Text>{"★".repeat(rating) + "☆".repeat(5 - rating)}</Text>
        );
      };

      const ProductCard = ({ item }) => (
        <TouchableOpacity style={st.card}>
          <Image source={item.image} style={st.image} />
          <Text style={st.title}>{item.title}</Text>
          {item.almostSoldOut && <Text style={st.almostSoldOut}>ALMOST SOLD OUT</Text>}
          <View style={st.cusrating}>
          <StarRating rating={item.rating} />
          <Text style={st.cuscount}>{item.countsold}</Text>
          </View>
          <View style={st.custsold}>
          <Text style={st.price}>{item.price}</Text>
          <Text style={st.sold}>{item.sold}</Text>
          <TouchableOpacity style={st.cartButton}>
            <Image source={require("../assets/icons/ic_cart.png")} style={st.cartIcon} />
          </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );

    const renderItemCategory = ({ index, item }) => {
        const isSelected = item === selectedCategory;
        return (
          <TouchableOpacity onPress={() => {
            setSelectedCategory(item)
            flatListRef.current.scrollToIndex({ index, animated: true });
          }
          }>
            <View style={st.categoryItem}>
              <Text style={[st.categoryText, isSelected && st.selectedText]}>
                {item}
              </Text>
              {isSelected && <View style={st.underline} />}
            </View>
          </TouchableOpacity>
        );
      };

  return (

    <FlatList
      data={products}
      keyExtractor={(item,index) =>`${item._id}${index} product in suggestProduct`}
      numColumns={2}
      renderItem={({ item }) => <ProductCard item={item} />}
      contentContainerStyle={st.container}
      ListHeaderComponent={
        <FlatList
                data={categories}
                ref={flatListRef}
                horizontal
                keyExtractor={(item) => item}
                renderItem={renderItemCategory}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={st.listContainer}
              />
      }
    />
  )
}

export default SuggestProduct

const st = StyleSheet.create({
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 10,
      },

      categoryText: {
        fontSize: 18,
        color: '#737373',
        fontWeight: 'bold'
      },

      selectedText: {
        color: '#000',
      },

      underline: {
        height: 5,
        backgroundColor: '#000',
        width: '80%',
        marginTop: 2,
        borderRadius: 5,
      },

      container: {
        padding: 2,
      },
      card: {
        width: "48%",
        backgroundColor: "#fff",
        padding: 10,
      },
      image: {
        width: 200,
        height: 200,
      },
      title: {
        fontSize: 14,
        fontWeight: "bold",
        color:"#737373",
        marginVertical: 5,
      },
      almostSoldOut: {
        color: "#FE7018",
        fontWeight:"bold",
        fontSize: 12,
      },
      price: {
        fontSize: 16,
        fontWeight: "bold",
      },
      sold: {
        fontSize: 12,
        color: "gray",
      },
      cartButton: {
        borderWidth: 1,
        width: 30,
        height: 25,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 15,
        marginLeft: 5,
      },

      custsold: {
        flexDirection: "row",
        alignItems:"center",
        gap: 5,
      },
      
      cusrating: {
        flexDirection:"row",
        alignItems:"center",
        gap: 5,
      },

      cuscount: {
        fontSize: 12,
        color:"#737373",
        fontWeight: "700",
      },
})