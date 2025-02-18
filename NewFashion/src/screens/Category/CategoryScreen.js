import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native';

const { width } = Dimensions.get('window'); // Lấy độ rộng màn hình
const FEATURED_WIDTH = width / 4; // Chiều rộng của danh sách featured
const CATEGORY_WIDTH = width - FEATURED_WIDTH; // Chiều rộng của danh mục chính
const ITEM_WIDTH = CATEGORY_WIDTH / 2 - 15; // Chia 2 cột, trừ khoảng cách
const SUBCATEGORY_ITEM_WIDTH = (width * 0.7 - 40) / 3; 




const CategoryScreen = () => {
  const categories = ['Áo Nam', 'Áo Nữ', 'Quần Nam', 'Quần Nữ', 'Giày Dép',
    'Phụ Kiện', 'Đồ Thể Thao', 'Đồ Lót', 'Đồ Ngủ', 'Đồ Công Sở',
    'Áo Khoác', 'Váy Đầm', 'Set Đồ', 'Đồ Unisex', 'Túi Xách',
    'Mũ & Nón', 'Kính Mắt', 'Trang Sức', 'Đồng Hồ', 'Hàng Mới Về'];
  const subCategoriesData = {
    'Áo Nam': [
    { name: 'Áo Thun', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
    { name: 'Áo Polo', image: 'https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/a/p/apt231548._89_2.jpg' },
    { name: 'Áo Sơ Mi', image: 'https://pos.nvncdn.com/492284-9176/ps/20231030_NN91oPe5hc.jpeg' },
    { name: 'Áo Hoodie', image: 'https://360.com.vn/wp-content/uploads/2023/11/AHHTK403-APTTK403-QGNTK407-12-Custom.jpg' },
    { name: 'Áo Len', image: 'https://vitimex.com.vn/images/products/2023/08/02/original/Ao%20len%20nam_ALN9005-xam-2.jpg' }
  ],
  'Áo Nữ': [
    { name: 'Áo Blouse', image: 'https://example.com/aoblouse.jpg' },
    { name: 'Áo Croptop', image: 'https://example.com/aocroptop.jpg' },
    { name: 'Áo Kiểu', image: 'https://example.com/aopolo.jpg' },
    { name: 'Áo Sơ Mi Nữ', image: 'https://example.com/aopolo.jpg' },
    { name: 'Áo Thun Nữ', image: 'https://example.com/aopolo.jpg' },
    { name: 'Áo Polo', image: 'https://example.com/aopolo.jpg' }
  ],
    'Quần Nam': ['Quần Jean', 'Quần Kaki', 'Quần Short', 'Quần Tây'],
    'Quần Nữ': ['Quần Jean Nữ', 'Quần Short Nữ', 'Quần Ống Rộng', 'Quần Legging'],
    'Giày Dép': ['Giày Thể Thao', 'Giày Da', 'Sandal', 'Dép Lê'],
    'Phụ Kiện': ['Khăn Quàng Cổ', 'Găng Tay', 'Thắt Lưng', 'Vớ/Tất'],
    'Đồ Thể Thao': ['Bộ Đồ Gym', 'Áo Thể Thao', 'Quần Thể Thao'],
    'Đồ Lót': ['Áo Ngực', 'Quần Lót Nam', 'Quần Lót Nữ'],
    'Đồ Ngủ': ['Pijama', 'Đồ Bộ Mặc Nhà'],
    'Đồ Công Sở': ['Áo Vest', 'Quần Âu', 'Chân Váy Công Sở'],
    'Áo Khoác': ['Áo Khoác Jeans', 'Áo Khoác Da', 'Áo Gió', 'Áo Khoác Len'],
    'Váy Đầm': ['Đầm Dạ Hội', 'Đầm Công Sở', 'Đầm Dạo Phố'],
    'Set Đồ': ['Bộ Quần Áo Nữ', 'Bộ Quần Áo Nam'],
    'Đồ Unisex': ['Áo Unisex', 'Quần Unisex'],
    'Túi Xách': ['Túi Đeo Chéo', 'Balo', 'Túi Tote'],
    'Mũ & Nón': ['Nón Lưỡi Trai', 'Nón Bucket'],
    'Kính Mắt': ['Kính Mát', 'Kính Cận Thời Trang'],
    'Trang Sức': ['Dây Chuyền', 'Nhẫn', 'Vòng Tay'],
    'Đồng Hồ': ['Đồng Hồ Nam', 'Đồng Hồ Nữ']
  };

  const randomProducts = [
    { id: '1', name: 'Nón Lưỡi Trai', image: { uri: 'https://dongphuchaianh.vn/wp-content/uploads/2022/04/dong-phuc-cong-so-nu-1.jpg' }, price: '332.495đ', rating: 4.5, sold: '831 sold' },
    { id: '2', name: 'Áo Khoác Da', image: { uri: 'https://dongphuchaianh.vn/wp-content/uploads/2022/04/dong-phuc-cong-so-nu-1.jpg' }, price: '248.062đ', rating: 4.8, sold: '3,2K+ sold' },
    { id: '3', name: 'Bộ Quần Áo Nam', image: { uri: 'https://dongphuchaianh.vn/wp-content/uploads/2022/04/dong-phuc-cong-so-nu-1.jpg' }, price: '152.882đ', rating: 4.2, sold: '1,1K+ sold' },
    { id: '4', name: 'Đồ Bộ Mặc Nhà', image: { uri: 'https://dongphuchaianh.vn/wp-content/uploads/2022/04/dong-phuc-cong-so-nu-1.jpg' }, price: '169.548đ', rating: 4.6, sold: '20K+ sold' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const subCategories = subCategoriesData[selectedCategory];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedCategory(item)}>
      <View style={[styles.categoryItem, selectedCategory === item && styles.selectedCategory]}>
        <Text style={styles.categoryText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSubCategoryItem = ({ item }) => (
    <View style={styles.subCategoryItem}>
      <Image source={{ uri: item.image }} style={styles.subCategoryImage} />
      <Text style={styles.subCategoryText}>{item.name}</Text>
    </View>

  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  const ListHeaderComponent = () => (
    <View style={styles.rightListHeader}>
      <Text style={styles.subCategoryHeader}>Sub Categories</Text>
      <FlatList
        data={subCategories}
        renderItem={renderSubCategoryItem}
        numColumns={3}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.productHeader}>Random Products</Text>
      <FlatList
        data={randomProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContainer}>
        {/* Danh sách Category bên trái */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          style={styles.categoryList}
        />

        {/* FlatList lớn bên phải chứa cả subcategory và random products */}
        <FlatList
          data={[]}
          ListHeaderComponent={ListHeaderComponent}
          showsVerticalScrollIndicator={false}
          style={styles.rightList}
        />
      </View>
    </SafeAreaView>
   
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  categoryList: {
    width: '30%', // Category chiếm 30% màn hình
    backgroundColor: '#f0f0f0',
  },
  categoryItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  categoryText: {
    fontSize: 16,
  },
  selectedCategory: {
    backgroundColor: '#d0d0d0',
  },
  rightList: {
    width: '70%', // Sub-category và random products chiếm 70% màn hình
  },
  rightListHeader: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  subCategoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subCategoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  subCategoryText: {
    fontSize: 16,
  },
  productHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  subCategoryItem: {
    width: SUBCATEGORY_ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: 20,
  },
  subCategoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  subCategoryText: {
    fontSize: 14,
    textAlign: 'center',
  },

});
