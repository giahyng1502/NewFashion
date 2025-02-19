import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window'); // Lấy độ rộng màn hình
const FEATURED_WIDTH = width / 4; // Chiều rộng của danh sách featured
const CATEGORY_WIDTH = width - FEATURED_WIDTH; // Chiều rộng của danh mục chính
const ITEM_WIDTH = CATEGORY_WIDTH / 2 - 15; // Chia 2 cột, trừ khoảng cách

const categories = [
  { id: '1', name: "Women's Clothing", image: { uri: 'https://s3-alpha-sig.figma.com/img/04fd/7184/530281e3b8b6ab9a7b8cb99c9b633dd6?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uHL5VSE53uRV6lttEia7xAIFMo1p6qBnIOfVwsyhIng7ZYTZgtVMW3IV6CL7CmrorPXGi1DTCs3XADc5zg5k2VaGZlXq4t55TtTYdBiO-5fdnuODBHL4kPIpHTknGLo5iHEQQbrujWaBIufg3M60A4lpwjnbMjP-p-77wm5OS5imBmr9tko~fQ-ncz2JrSqAPEDzrz834YEatZwsdYwsKJq4Q3iZ69rUVjHS7tywhA9l1XrkSFfQ~U2Hv4xY-UUvZZUUuhDQE6JlFMQ76-ykqcvzA6FUielOWmLtZ826O9IT1CV7mlclltYuN54Z8y~cvFJ0om58GgNoCwvFi-fr1Q__' } },
  { id: '2', name: "Women's Shoes", image: { uri: 'https://s3-alpha-sig.figma.com/img/3ae6/86f9/62433b7cd378619848e3f07e8ace3179?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ck9GqmGfbFV3IgX4mFWIZU1KvuMqHlQybT88ZVt~vXwV-xD53tzrXnHGELTRx9xD6PrUkKUVS2C8BitCXw45jsLB2WFZOPiYSSWKvmqIPbNw9wLOUnQUzy2eOsI~5NxdxWtxgSFPhwqDgjEcmcm73IwbP-ygw0nQIQxrPR6xK7vFhaP0OXZGNNIc1ytKLatZmWnCbW~AMAnZwgceIvCHYtH0e7~7tMyUxOfJo7qXqzVM7YKpVtHO1kNbYRB0ix-~pi2fac4-XN9uzwGdDn7UZkrFnrf4f~uJuAPUcXyxYxfO-yyZA316eudGOz~tqPoCFgwh9Ht-rXGbaX2mKlbS4A__' } },
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
  { id: '11', name: "Men’s Clothing" },
];

const products = [
  { id: '1', image: { uri: 'https://s3-alpha-sig.figma.com/img/85e9/483f/0e6f0fd4ac1563d6e9756f6af1b43421?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Zj870PKSThT~lbAQXx-ezxwOF1IiRA2WGtuCv9pL5QuCX1RojQ53NiZ3Gi4LsXJESyh4rHRtPb4ZIjjc-xxWNcuJ3GIEn-p~yP3ztqP0fh99S6OTDGzDmdykS~f9AEdFS7oWv5kDtH3K2TJIXXb57NoHggTv~n8fjV0tsKdboJEv-RkbYV30PJdZ7jwZ2a7S6~RdCOhzWEvo2f4p6hCLFzjfGidps3T64DMy6rxtaXUMez~TOZsf9YnnlTFT8AwKKCwST6GVgrUoDJ9oSEzFxPtqte64C-8tHARsSWCkVBrRr-YuU8jJ03aIvk8GEW3Amxy88tWMTVeE1m7YOY9GGw__' }, price: '332.495đ', rating: 4.5, sold: '831 sold' },
  { id: '2', image: { uri: 'https://s3-alpha-sig.figma.com/img/6008/19e6/27c7ddc4ae40dd638c61fb39b3eb1178?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qgLXKI2fwC8F5ZkB4Iti-PaWdVRIL2oTwKUkl0MK5Cn812ptYpST~moQIYGIc5F0j06Qd0a6VkMygkF6k5TozHXbjK4M4~v6rJiSSLYLMvrjU5LtWCmLtPO~E0LumhnbESu3FI0V0sNn6wMD1mtsJ9amjIVgp1NyR7PnL5AcEOYUwB4OH37gwUf5XDk57wrvCL6k8YuyWRYibxst-eU5H0SKBlR8jEix50c4RPHdIHjH-RO0LrDloUdXtDrF2rEG4mmRGdyB7Jdo2iNuARdH6IO69uZjYl3Tmx2afICUBGijWCbqBedD6jeqQ8R4B8lsUFt9gCWSYGt8y-59WC-hHw__' }, price: '248.062đ', rating: 4.8, sold: '3,2K+ sold' },
  { id: '3', image: { uri: 'https://s3-alpha-sig.figma.com/img/9fb0/f656/90ba6aae03e4d18d95e4c1db53bd76cd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=C6TstkrbcscaGYifSjVJtk9PbuZVpmCFQzxfIDb2KokkE8bIugzZN8n9XVtthZ5vj6nn7UmidM1xJG3mRvd23QhnOLMknxUg6LsZazwu9QJTSZrVfP7uZFqia23zs7dUeWKlvGQKYGpuDbT0LxWEI1tiplUjSV9~AC7cBwJ2k0HxBPbf-UfJ62C5mMJ4VDw~i7XYaUpHvRtp5rezTs5VMxiu5LJpQLAVcWhjdNhTLeqSqPUkdKuGV8vy3ISHizasrEEECo~wAQrJI9cDNK6iB1o7BN68G45y4hBP1SZ5BfoWjv48Tn2cfXNNarnYGp4kNoECb90wURvrdjrF0-XnZw__' }, price: '152.882đ', rating: 4.2, sold: '1,1K+ sold' },
  { id: '4', image: { uri: 'https://s3-alpha-sig.figma.com/img/9688/bdf8/0b25afe9fc5e2d69aa47d5ac1da737d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=q22S8EkA24x9CwwPWcc41SHIzP-g2YoXlD5Q5QvtDqt3ddtZ4bXBOKT9xZsEez1nd3cnLvxC-0CxiNXSq8ODoV91VAQ-gLhhQjI4yHnSVkz4fcM7BmzJE74eE4K7XZupKyqono7PxzaUP6on6SDXGcNdnIJVlRUDRF3nzeLEXfJUAxe3fKYnElcaXZLqg2d8e~yseoCzDt0~~LCpk3TwgPHrcBcWLoqsfFChucXE~VkpezuJSUE~Z67UbF6Z3~B8NZpfL0OSxeUqG1las0DMVHOfQ19K~oz7O2va63xpoZUn0oLGVu35HtoYOLwoA~ymEyG0EoY0l5FGe93-CRczew__' }, price: '169.548đ', rating: 4.6, sold: '20K+ sold' },
];

// 
const suggestions = [
  "jackets for women",
  "coats for women",
  "fur coat for women",
  "womens clothes",
  "mens sweaters for men",
  "thermal jacket for men",
];

const browsingHistory = [
  {
    id: "1",
    image: { uri: 'https://s3-alpha-sig.figma.com/img/85e9/483f/0e6f0fd4ac1563d6e9756f6af1b43421?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Zj870PKSThT~lbAQXx-ezxwOF1IiRA2WGtuCv9pL5QuCX1RojQ53NiZ3Gi4LsXJESyh4rHRtPb4ZIjjc-xxWNcuJ3GIEn-p~yP3ztqP0fh99S6OTDGzDmdykS~f9AEdFS7oWv5kDtH3K2TJIXXb57NoHggTv~n8fjV0tsKdboJEv-RkbYV30PJdZ7jwZ2a7S6~RdCOhzWEvo2f4p6hCLFzjfGidps3T64DMy6rxtaXUMez~TOZsf9YnnlTFT8AwKKCwST6GVgrUoDJ9oSEzFxPtqte64C-8tHARsSWCkVBrRr-YuU8jJ03aIvk8GEW3Amxy88tWMTVeE1m7YOY9GGw__' },
    rating: 4.5,
    reviews: 588,
    price: "332.495đ",
    sold: "831 sold",
  },
  {
    id: "2",
    image: { uri: 'https://s3-alpha-sig.figma.com/img/85e9/483f/0e6f0fd4ac1563d6e9756f6af1b43421?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Zj870PKSThT~lbAQXx-ezxwOF1IiRA2WGtuCv9pL5QuCX1RojQ53NiZ3Gi4LsXJESyh4rHRtPb4ZIjjc-xxWNcuJ3GIEn-p~yP3ztqP0fh99S6OTDGzDmdykS~f9AEdFS7oWv5kDtH3K2TJIXXb57NoHggTv~n8fjV0tsKdboJEv-RkbYV30PJdZ7jwZ2a7S6~RdCOhzWEvo2f4p6hCLFzjfGidps3T64DMy6rxtaXUMez~TOZsf9YnnlTFT8AwKKCwST6GVgrUoDJ9oSEzFxPtqte64C-8tHARsSWCkVBrRr-YuU8jJ03aIvk8GEW3Amxy88tWMTVeE1m7YOY9GGw__' },
    rating: 4.7,
    reviews: 1914,
    price: "248.062đ",
    sold: "3,2K sold",
  },
  {
    id: "3",
    image: { uri: 'https://s3-alpha-sig.figma.com/img/85e9/483f/0e6f0fd4ac1563d6e9756f6af1b43421?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Zj870PKSThT~lbAQXx-ezxwOF1IiRA2WGtuCv9pL5QuCX1RojQ53NiZ3Gi4LsXJESyh4rHRtPb4ZIjjc-xxWNcuJ3GIEn-p~yP3ztqP0fh99S6OTDGzDmdykS~f9AEdFS7oWv5kDtH3K2TJIXXb57NoHggTv~n8fjV0tsKdboJEv-RkbYV30PJdZ7jwZ2a7S6~RdCOhzWEvo2f4p6hCLFzjfGidps3T64DMy6rxtaXUMez~TOZsf9YnnlTFT8AwKKCwST6GVgrUoDJ9oSEzFxPtqte64C-8tHARsSWCkVBrRr-YuU8jJ03aIvk8GEW3Amxy88tWMTVeE1m7YOY9GGw__' },
    rating: 4.2,
    reviews: 78,
    price: "152.882đ",
    sold: "1,1K sold",
  },
  {
    id: "4",
    image: { uri: 'https://s3-alpha-sig.figma.com/img/85e9/483f/0e6f0fd4ac1563d6e9756f6af1b43421?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Zj870PKSThT~lbAQXx-ezxwOF1IiRA2WGtuCv9pL5QuCX1RojQ53NiZ3Gi4LsXJESyh4rHRtPb4ZIjjc-xxWNcuJ3GIEn-p~yP3ztqP0fh99S6OTDGzDmdykS~f9AEdFS7oWv5kDtH3K2TJIXXb57NoHggTv~n8fjV0tsKdboJEv-RkbYV30PJdZ7jwZ2a7S6~RdCOhzWEvo2f4p6hCLFzjfGidps3T64DMy6rxtaXUMez~TOZsf9YnnlTFT8AwKKCwST6GVgrUoDJ9oSEzFxPtqte64C-8tHARsSWCkVBrRr-YuU8jJ03aIvk8GEW3Amxy88tWMTVeE1m7YOY9GGw__' },
    rating: 4.2,
    reviews: 78,
    price: "152.882đ",
    sold: "1,1K sold",
  },
];

const CategoryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={st.container}>
      {/* Ô tìm kiếm */}
      <View style={st.searchContainer}>
        <TextInput
          style={st.searchInput}
          placeholder="Searching something..."
          placeholderTextColor="#B0B0B0"
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity style={st.buttonSearch}>
          <Image source={require("../../assets/icons/ic_search.png")} style={st.iconSearch} />
        </TouchableOpacity>
      </View>
      {/* Khi bấm textInput */}
      {isFocused && (
        <View style={st.suggestionsContainer}>
          <Text style={st.sectionTitle}>Popular right now</Text>
          <FlatList
            data={suggestions}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={st.suggestionItem}>
                <Text style={st.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <Text style={st.sectionTitle}>Browsing history</Text>
          <FlatList
            data={browsingHistory}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={st.historyItem}>
                <Image source={item.image} style={st.imageProduct} />
                <View style={st.ratingContainer}>
                  <Image source={require('../../assets/icons/ic_star.png')} />
                  <Text style={st.ratingText}>{item.reviews.toString()}</Text>
                </View>
                <Text style={st.price}>{item.price}</Text>
                <Text style={st.sold}>{item.sold}</Text>
              </View>
            )}
          />
        </View>
      )}
      {/* Chia màn hình thành 2 cột */}
      {!isFocused && (
        <View style={st.containerItem}>
          {/* Cột 1: Danh sách nổi bật */}
          <View style={[st.featuredContainer, { width: FEATURED_WIDTH }]}>
            <Text style={{ color: '#1E1E1E', fontWeight: '800', fontSize: 16 }}>Featured</Text>
            <FlatList
              data={featured}
              numColumns={1} // Hiển thị theo cột dọc
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={st.featuredItem}>
                  <Text style={st.featuredText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              style={st.featuredList}
            />
          </View>
          {/* Cột 2: Danh mục chính */}
          <View style={[st.categoryContainer, { width: CATEGORY_WIDTH }]}>
            <Text style={{ color: '#1E1E1E', fontWeight: '600', marginLeft: 5 }}>Shop by Category</Text>
            <FlatList
              data={categories}
              numColumns={3}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={st.categoryItem}>
                  <Image source={item.image} style={st.categoryImage} />
                  <Text style={st.categoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListFooterComponent={
                <View>
                  <Text style={{ color: '#1E1E1E', fontWeight: '600', fontSize: 14, marginLeft: 5 }}>Trending items</Text>
                  {/* FlatList - Danh sách sản phẩm */}
                  <FlatList
                    data={products}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={st.itemContainer}>
                        <Image source={item.image} style={st.imageProduct} />
                        <View style={st.ratingContainer}>
                          <Image source={require('../../assets/icons/ic_star.png')} />
                          <Text style={st.ratingText}>{item.rating.toString()}</Text>
                        </View>
                        <Text style={st.price}>{item.price}</Text>
                        <Text style={st.sold}>{item.sold}</Text>
                      </View>
                    )}
                  />
                </View>
              }
              style={st.categoryList}
            />


          </View>
        </View>
      )}
    </View>
  );
};

export default CategoryScreen;

const st = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E1E1E",
    borderRadius: 25,
    paddingLeft: 10,
    paddingRight: 5,
    marginBottom: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#BBBBBB",
    fontWeight: '600'
  },
  buttonSearch: {
    width: 50,
    height: 34,
    borderRadius: 18,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  iconSearch: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  containerItem: {
    flex: 1,
    flexDirection: "row",
  },

  categoryList: {
    paddingRight: 10,
  },

  featuredList: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 10,
  },

  categoryItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },

  categoryImage: {
    width: 50,
    height: 50,
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
    marginBottom: 10,
  },

  featuredText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "left",
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
  sortText: {
    fontSize: 14,
    marginRight: 5
  },

  itemContainer: {
    width: ITEM_WIDTH,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    margin: 5,
    borderRadius: 8,
    position: 'relative',
  },

  imageProduct: {
    width: '100%',
    height: 150,
    borderRadius: 4
  },

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
  suggestionsContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color:'#1E1E1E'
  },
  suggestionItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    marginRight: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: "#000000",
    fontWeight:'600'
  },
  historyItem: {
    width: 120,
    marginRight: 10,
  },
  historyImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  rating: {
    fontSize: 12,
    color: "#555",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
  },
  sold: {
    fontSize: 12,
    color: "#777",
  },
});
