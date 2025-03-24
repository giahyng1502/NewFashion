import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../components/SearchBar';
import { useFocusEffect } from '@react-navigation/native';

const SearchScreen = ({ navigation, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef(null);
  const [dataSearch, setDataSearch] = useState([]);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  const popularRightNow = [
    "jackets for women", "coats for women", "fur coat for women",
    "womens clothes", "mens sweaters for men", "thermal jacket"
  ];

  const allSuggestions = [
    "hoodies for men", "hoodies for women", "hoodie men", "hoodie nữ",
    "hoodie jacket for men", "hoodie zip up", "hoodie oversized",
    "hoodie y2k", "hoodie aesthetic", "hoodie boxy", "hoodie and sweatpants set",
    "hoodies for women winter", "hoodie from girlfriend", "hoodie baggy"
  ];

  const recentlySearched = [
    { id: '1', title: 'hoodie nữ', image: 'https://img-pg.oss-cn-hongkong.aliyuncs.com/news/2024/10/18/11432/Ao-hoodie-nu-co-khoa-keo.jpg' },
    { id: '2', title: 'váy nữ', image: 'https://germe.vn/wp-content/uploads/2024/05/5.png' },
    { id: '3', title: 'quần jean', image: 'https://caravnxk.com/admin/sanpham/jean-nu-xuat-du_1738_anh1.jpg' },
  ];

  const PopularRightRow = [
    { id: '1', title: 'Áo phông nam', image: 'https://img-pg.oss-cn-hongkong.aliyuncs.com/news/2024/10/18/11432/Ao-hoodie-nu-co-khoa-keo.jpg' },
    { id: '2', title: 'Áo công sở nữ', image: 'https://andora.com.vn/wp-content/uploads/2022/04/cach-phoi-mau-quan-ao-nu-cong-so-2.jpg' },
    { id: '3', title: 'Quần nữ', image: 'https://nhaphangchina.vn/pictures/images/3-quan-ao-nu-mua-he-dep.jpg' },
  ];


  const BrowsingHistory = [
    {
      id: "1",
      image: "https://pinggeen.vn/wp-content/uploads/2024/04/z5308645617871_cec29ad382e1cd0ba98eafb11ab1dfd6-655x655.jpg",
      rating: 5,
      reviews: 588,
      price: "332.495đ",
      sold: "831 sold",
    },
    {
      id: "2",
      image: "https://salt.tikicdn.com/ts/product/63/84/be/7cd5db5e87db87b062450ad605214293.jpg",
      rating: 5,
      reviews: 1914,
      price: "248.062đ",
      sold: "3,2K+ sold",
    },
    {
      id: "3",
      image: "https://dongphuchaianh.vn/wp-content/uploads/2022/05/quan-ao-nu-mua-he-dep-o-nha.jpg",
      rating: 5,
      reviews: 78,
      price: "152.882đ",
      sold: "1,1K+ sold",
    },
    {
      id: "4",
      image: "https://kinhboi.com/wp-content/themes/yootheme/cache/06/O1CN01CqNjlX1KPx47QTzTK_2212759541157-0-cib-060186cb.jpeg",
      rating: 5,
      reviews: 1200,
      price: "169.543đ",
      sold: "2,5K+ sold",
    },
  ];

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

  useEffect(() => {
    const handler = setTimeout(() => {
      // onSearch(debouncedSearchText);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchText, onSearch]);

  useFocusEffect(React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])
  )
  const Item = ({ title, image }) => (
    <View style={styles.item}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );

  const BrowsingHistoryRender = ({ image, rating, reviews, price, sold }) => (
    <View style={styles.BrowsingItem}>
      <Image source={{ uri: image }} style={styles.BrowsingImage} />
      <View style={styles.ratingContainer}>
        <Text style={styles.BrowsingStars}>{"⭐".repeat(rating)}</Text>
        <Text style={styles.BrowsingReviews}>{reviews}</Text>
      </View>
      <Text style={styles.BrowsingPrice}>{price}</Text>
      <Text style={styles.BrowsingSold}>{sold}</Text>
    </View>
  );

  const DataSearchRender = ({ title, image }) => (
    <View style={styles.itemSearchList}>
      <Image source={require('../assets/icons/ic_search_black_2x.png')} style={styles.imageSearchList} />
      <Text style={styles.text}> {title}</Text>
    </View>
  );

  // Hàm xử lý khi nhập dữ liệu
  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length > 0) {
      const filteredData = DataSearch.filter(item =>
        item.title && item.title.toLowerCase().includes(text.toLowerCase()) // Kiểm tra item.title tồn tại
      );
      setDataSearch(filteredData);
    } else {
      setDataSearch([]);
    }
  };

  return (
    <View>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons/ic_row_left_2x.png')} style={{ width: 20, height: 20 }} />
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
          <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
            <View style={[styles.sectionHeader, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 5 }]}>
              <Text style={styles.sectionTitle}>Recent searched</Text>
              <Image source={require('../assets/icons/ic_trash_2x.png')} style={styles.icon} />
            </View>
            <FlatList
              data={recentlySearched}
              renderItem={({ item }) => <Item title={item.title} image={item.image} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          </View>

          {/* Popular Right Now */}
          <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
            <Text style={styles.sectionTitle}>Popular right now</Text>
            <FlatList
              data={PopularRightRow}
              renderItem={({ item }) => <Item title={item.title} image={item.image} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          </View>

          {/* Browsing History */}
          <View style={{ paddingHorizontal: 16 }}>
            <View style={[styles.sectionHeader, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 5, paddingBottom: 5 }]}>
              <Text style={styles.sectionTitle}>Browsing history</Text>
              <Image source={require('../assets/icons/icon-right-2x.png')} style={{ width: 20, height: 20 }} />
            </View>
            <FlatList
              data={BrowsingHistory}
              renderItem={({ item }) => <BrowsingHistoryRender {...item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          </View>
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
    paddingHorizontal: 16, // Khoảng cách lề
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