import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../components/SearchBar';
import { useFocusEffect } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataSearch = [
  { id: '1', title: 'Áo thun nam cổ tròn' },
  { id: '2', title: 'Áo thun nữ form rộng' },
  { id: '3', title: 'Áo sơ mi caro nam' },
  { id: '4', title: 'Áo sơ mi trắng nữ' },
  { id: '5', title: 'Quần jeans nam rách gối' },
  { id: '6', title: 'Quần jeans nữ skinny' },
  { id: '7', title: 'Áo hoodie nam basic' },
  { id: '8', title: 'Áo hoodie nữ croptop' },
  { id: '9', title: 'Váy công sở tay dài' },
  { id: '10', title: 'Váy dạ hội sang trọng' },
  { id: '11', title: 'Quần short nam thể thao' },
  { id: '12', title: 'Quần short nữ lưng cao' },
  { id: '13', title: 'Bộ đồ thể thao nam adidas' },
  { id: '14', title: 'Bộ đồ thể thao nữ nike' },
  { id: '15', title: 'Áo khoác bomber nam' },
  { id: '16', title: 'Áo khoác jean nữ' },
  { id: '17', title: 'Đầm maxi đi biển' },
  { id: '18', title: 'Áo len nam cổ lọ' },
  { id: '19', title: 'Áo len nữ oversize' },
  { id: '20', title: 'Quần jogger nam streetwear' }
];

const SearchScreen = ({ navigation, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [recentSearch, setRecentSearch] = useState([]);
  const [browsingHistory, setBrowsingHistory] = useState([]);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const storedRecentSearch = await AsyncStorage.getItem('recentSearch');
        const storedBrowsingHistory = await AsyncStorage.getItem('browsingHistory');

        setRecentSearch(storedRecentSearch ? JSON.parse(storedRecentSearch) : []);
        setBrowsingHistory(storedBrowsingHistory ? JSON.parse(storedBrowsingHistory) : []);
      } catch (error) {
        console.error('Error fetching local data:', error);
      }
    };

    fetchLocalData();
  }, []);

  const Item = ({ title, image }) => (
    <View style={styles.item}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );

  const DataSearchRender = ({ title, image }) => (
    <View style={styles.itemSearchList}>
      <Image source={require('../assets/icons/ic_search_black_2x.png')} style={styles.imageSearchList} />
      <Text style={styles.text}> {title}</Text>
    </View>
  );

  // Hàm xử lý khi nhập dữ liệu
  const handleSearch = async (text) => {
    setSearchText(text);

    if (text.length > 0) {
      const filteredData = DataSearch.filter(item =>
        item.title && item.title.toLowerCase().includes(text.toLowerCase())
      );
      setDataSearch(filteredData);

      // Lưu text vào recentSearch trong local storage
      try {
        const updatedRecentSearch = [...new Set([text, ...recentSearch])]; // Loại bỏ trùng lặp
        setRecentSearch(updatedRecentSearch);
        await AsyncStorage.setItem('recentSearch', JSON.stringify(updatedRecentSearch));
      } catch (error) {
        console.error('Error saving recent search:', error);
      }
    } else {
      setDataSearch([]);
    }
  };

  return (
    <View>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/ic_back.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <SearchBar disable={true} onSearch={handleSearch} />

      </View>

      {/* Hiển thị DataSearch khi có nội dung tìm kiếm */}
      {searchText.length > 0 ? (
        <FlatList
          data={dataSearch}
          renderItem={({ item }) => <DataSearchRender title={item.title} image={item.image} />}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      ) : (
        <>
          {/* Recently Searched */}
          {recentSearch.length > 0 && (
            <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
              <View style={[styles.sectionHeader, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 5 }]}>
                <Text style={styles.sectionTitle}>Recent searched</Text>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await AsyncStorage.removeItem('recentSearch');
                      setRecentSearch([]);
                    } catch (error) {
                      console.error('Error clearing recent search:', error);
                    }
                  }}
                >
                  <Image source={require('../assets/icons/ic_trash_2x.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={recentSearch}
                renderItem={({ item }) => (
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 16,
                      color: '#000',
                      borderBottomColor: '#e0e0e0', // Màu đường viền
                      borderBottomWidth: 1, // Độ dày đường viền
                    }}
                  >
                    {item}
                  </Text>
                )}
                keyExtractor={(item, index) => index.toString()} // Sử dụng index làm key
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
              />
            </View>
          )}

          {/* Browsing History */}
          {browsingHistory.length > 0 && (
            <View style={{ paddingHorizontal: 16 }}>
              <View style={[styles.sectionHeader, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 5, paddingBottom: 5 }]}>
                <Text style={styles.sectionTitle}>Browsing history</Text>
              </View>
              <FlatList
                data={browsingHistory}
                renderItem={({ item }) => (
                  <ProductCard
                    item={item}
                    onSelected={() => { handleSelectedItem(item) }}
                  />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default SearchScreen

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 40
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
  },
  clearButton: {
    padding: 5,
  },
  searchButton: {
    backgroundColor: '#000',
    margin: 3,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 40
  },
  searchIcon: {
    width: 25,
    height: 25
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 7,
    resizeMode: 'contain',
  },
  list: {
    paddingLeft: 16, // Khoảng cách lề
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Màu nền giống hình
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10, // Khoảng cách giữa các item
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20, // Hình ảnh tròn
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },


  // Browsing
  BrowsingList: {
    paddingVertical: 10,
  },
  BrowsingItem: {
    width: 140, // Chiều rộng mỗi sản phẩm
    marginRight: 10,
  },
  BrowsingImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  BrowsingRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  BrowsingStars: {
    fontSize: 14,
    color: "#FFD700",
    marginRight: 5,
  },
  BrowsingReviews: {
    fontSize: 12,
    color: "#555",
  },
  BrowsingPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  BrowsingSold: {
    fontSize: 12,
    color: "#777",
  },
  // màn hình search

  imageSearchList: {
    width: 20,
    height: 20,
  },
  itemSearchList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10, // Khoảng cách giữa các item
    borderBottomWidth: 1, // Đường viền dưới
    borderBottomColor: '#747474',
  },

})