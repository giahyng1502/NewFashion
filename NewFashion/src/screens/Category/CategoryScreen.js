import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window'); // Lấy độ rộng màn hình
const FEATURED_WIDTH = width / 4; // Chiều rộng của danh sách featured
const CATEGORY_WIDTH = width - FEATURED_WIDTH; // Chiều rộng của danh mục chính
const ITEM_WIDTH = CATEGORY_WIDTH / 2 - 15; // Chia 2 cột, trừ khoảng cách

const categories = [
  { id: '1', name: "Women's Clothing", image: { uri: 'https://images.squarespace-cdn.com/content/v1/63c18cf4466543579adb2f6c/59ca16a9-6b5b-4148-ba52-0bbd02a56612/Stoughton-Clothing-Center-teen-clothing.jpg' } },
  { id: '2', name: "Women's Shoes", image: { uri: 'https://images.squarespace-cdn.com/content/v1/63c18cf4466543579adb2f6c/59ca16a9-6b5b-4148-ba52-0bbd02a56612/Stoughton-Clothing-Center-teen-clothing.jpg' } },
  { id: '3', name: "Men's Clothing", image: { uri: 'https://images.squarespace-cdn.com/content/v1/63c18cf4466543579adb2f6c/59ca16a9-6b5b-4148-ba52-0bbd02a56612/Stoughton-Clothing-Center-teen-clothing.jpg' } },
  { id: '4', name: "Men's Shoes", image: { uri: 'https://images.squarespace-cdn.com/content/v1/63c18cf4466543579adb2f6c/59ca16a9-6b5b-4148-ba52-0bbd02a56612/Stoughton-Clothing-Center-teen-clothing.jpg' } },

  { id: '5', name: "Sport Clothing", image: { uri: 'https://images.squarespace-cdn.com/content/v1/63c18cf4466543579adb2f6c/59ca16a9-6b5b-4148-ba52-0bbd02a56612/Stoughton-Clothing-Center-teen-clothing.jpg' } },
  { id: '6', name: "Women's Dreses", image: { uri: 'https://images.squarespace-cdn.com/content/v1/63c18cf4466543579adb2f6c/59ca16a9-6b5b-4148-ba52-0bbd02a56612/Stoughton-Clothing-Center-teen-clothing.jpg' } },
];

const featured = [
  { id: '1', name: 'Women’s Clothing' },
  { id: '2', name: 'Women’s Shoes' },
  { id: '3', name: 'Women’s Lingerie & Lounge' },
  { id: '4', name: 'Men’s Clothing' },
  { id: '5', name: 'Men’s Shoes' },
  { id: '6', name: 'Men’s Underwear & Sleepwear' },
  { id: '7', name: "Kid's Clothing" },
  { id: '8', name: "Kid's Shoes" },
  { id: '9', name: "Sport Clothing" },
  { id: '10', name: "Office Clothing" },
];

const products = [
  { id: '1', image: { uri: 'https://dongphuchaianh.vn/wp-content/uploads/2022/04/dong-phuc-cong-so-nu-1.jpg' }, price: '332.495đ', rating: 4.5, sold: '831 sold' },
  { id: '2', image: { uri: 'https://dongphuchaianh.vn/wp-content/uploads/2022/04/dong-phuc-cong-so-nu-1.jpg' }, price: '248.062đ', rating: 4.8, sold: '3,2K+ sold' },
  { id: '3', image: { uri: 'https://dongphuchaianh.vn/wp-content/uploads/2022/04/dong-phuc-cong-so-nu-1.jpg' }, price: '152.882đ', rating: 4.2, sold: '1,1K+ sold' },
  { id: '4', image: { uri: 'https://dongphuchaianh.vn/wp-content/uploads/2022/04/dong-phuc-cong-so-nu-1.jpg' }, price: '169.548đ', rating: 4.6, sold: '20K+ sold' },
];

const CategoryScreen = () => {
  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Searching something..." />
      </View>

      {/* Chia màn hình thành 2 cột */}
      <View style={styles.containerItem}>
        {/* Cột 1: Danh sách nổi bật */}
        <View style={[styles.featuredContainer, { width: FEATURED_WIDTH }]}>
          <Text style={styles.heading}>Featured</Text>
          <FlatList
            data={featured}
            numColumns={1} // Hiển thị theo cột dọc
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.featuredItem}>
                <Text style={styles.featuredText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.featuredList}
          />
        </View>

        {/* Cột 2: Danh mục chính */}
        <View style={[styles.categoryContainer, { width: CATEGORY_WIDTH }]}>
          <Text style={styles.heading}>Shop by Category</Text>
          <FlatList
            data={categories}
            numColumns={3}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryItem}>
                <Image source={item.image} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.categoryList}
          />

          <Text style={styles.heading}>Trending items</Text>
          {/* FlatList - Danh sách sản phẩm */}
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />a
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.sold}>{item.sold}</Text>
                <TouchableOpacity style={styles.cartButton}>
                  <Ionicons name="cart-outline" size={20} color="black" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 5
  },

  searchInput: { flex: 1, padding: 8 },

  containerItem: {
    flex: 1,
    flexDirection: "row",
  },

  categoryList: {
    paddingRight: 10, // Tạo khoảng cách giữa 2 cột
  },

  featuredList: {
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
  },

  categoryItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },

  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  categoryText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },

  featuredItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  featuredText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerText: { fontSize: 18, fontWeight: 'bold' },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },

  sortText: { fontSize: 14, marginRight: 5 },

  itemContainer: {
    width: ITEM_WIDTH,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    marginRight: 10,
    padding: 8,
    borderRadius: 8,
    position: 'relative',
  },

  image: { width: '100%', height: 150, borderRadius: 8 },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  ratingText: { marginLeft: 5, fontSize: 14 },

  price: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },

  sold: { fontSize: 12, color: '#666', marginTop: 2 },

  cartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    elevation: 3,
  },
});
