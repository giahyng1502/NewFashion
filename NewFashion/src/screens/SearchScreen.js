import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../redux/actions/productActions';



const SearchScreen = ({ navigation, onSearch }) => {
  const [recentSearch, setRecentSearch] = useState([]);
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  /// lịch sử tìm kiếm
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
  // chi tiết sản phẩm
  const handleSelectedItem = (item) => {
    console.log('Selected item:', item);
    navigation.navigate("ProductDetail", { item });
  }

  const fetchProducts = async (query) => {
    setSearchQuery(query); 
    if (!query.trim()) {
      setProductList([]);
      return;
    }  
    dispatch(searchProduct(query))
      .then(async (kq) => {
        const results = kq.payload
        setProductList(results)
        if (results.length > 0) {
          const updatedRecentSearch = [...new Set([query, ...recentSearch])];
          setRecentSearch(updatedRecentSearch);
          await AsyncStorage.setItem('recentSearch', JSON.stringify(updatedRecentSearch));
        }
      }) 
      .catch((error) => {
        console.log('err ', error);
      });
  };

  return (
    <View>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/ic_back.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <SearchBar disable={true} onSearch={fetchProducts} />
      </View>

      {/* Hiển thị DataSearch khi có nội dung tìm kiếm */}
      {searchQuery.trim().length > 0 ? (
        <FlatList
          data={productList}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{ flex: 1 / 2}}>
              <ProductCard
                item={item}
                onSelected={() => { handleSelectedItem(item) }}
                style={{padding:5}}
              />
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <>
          {/* Recent Search */}
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
                  <Text style={{
                    padding: 10,
                    fontSize: 16,
                    color: '#000',
                    borderBottomColor: '#e0e0e0',
                    borderBottomWidth: 1,
                  }}>
                    {item}
                  </Text>
                )}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
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
                  <View style={{ width: 140,marginHorizontal:5}}>
                    <ProductCard
                      item={item}
                      onSelected={() => { handleSelectedItem(item) }}
                      style={{ width: 140 }}
                    />
                  </View>
                )}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20, 
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
    width: 18,
    height: 18,
    marginRight: 10,
  },
  itemSearchList: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#747474',
  },
})