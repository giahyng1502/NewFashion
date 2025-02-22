import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native';
import SortFilter from '../../components/SortFilter';
import { Provider as PaperProvider } from 'react-native-paper';


const { width } = Dimensions.get('window'); // Lấy độ rộng màn hình
const FEATURED_WIDTH = width / 4; // Chiều rộng của danh sách featured
const CATEGORY_WIDTH = width - FEATURED_WIDTH; // Chiều rộng của danh mục chính
const numColumns = 2; // Chia Trending Item ra 2 cột
const ITEM_WIDTH = CATEGORY_WIDTH / 2 - 16; // Chia 2 cột, trừ khoảng cách
const SUBCATEGORY_ITEM_WIDTH = (width * 0.7 - 40) / 3;

const TrendingProducts = [
  {
    id: "1",
    image: "https://s3-alpha-sig.figma.com/img/4e98/161c/44889ce383fe72daa63daf3046238fe5?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=R9jCeHrJ2AcBylbzaG1BxXuPzuEdQbbWluD6UitzRT~v1kfTr32BYX3x6d6Gx~fq~Vg7fqk9to1pm4CE1gxig72SwrxzLnJPlYiT4dvxS~01b8bSxlk3hXQtIJybWxAfwst7Y5qFAfO~blkA1rzR4mnAwVHOjj3uTGP4rQnXRdVwr0IdmZKbBjyBQW9LBxj1MXysIs3C2alVegyryv9vazr6rv3vs9GdWgDbOiB5ECOW7U5LgX4MwlzdNajULXj6S0t57DL7OcegGavYPBYAcKpYNQF9pKelmynb36zdpiJZ82cuy4G6wh~ZqmpOh1BjNT5aZNOesRRel0CoAUMMWw__",
    title: "Embroidered Wool-blend Scarf Jacket",
    price: "304.568đ",
    rating: 4.5,
    sold: "831 sold",
    almostSoldOut: true,
  },
  {
    id: "2",
    image: "https://s3-alpha-sig.figma.com/img/2cb2/2cb9/0b8b0b7e8d2c451d364a9cd9989daa2b?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MxUbCT~pKt~bzjJXTxOSdWg5~Id7~Axc0j1hwi00ShfmBMtCAMLSwb-V0EqGdDLX1VCwFzTwANx9bCqbYYyBx-aWdNfJo3YnTxaSJIuoY3hHdb4AsXKsSz6Uc3eRZCSwVC8etcVMrgehDfw3wyEYyRIQD9qbj9wpLe-RphjbRw13qD9xTIVvDJmaAj~9pxT~zegmA83tuF9oXpg~FDjjqEdLhfrnxTEWnGrWy8JieNcQP8Ieu9Vc0OXLgadNkXwxpFRE~JxNMgST8E6~NhvHrvRQjQ1JAf1IY9uZS7mlnTCI7p~RtBFtmb4K8A7hXRgqqGCSWARFJgDUhY7-TW6D-A__",
    title: "Unisex Herringbone Black Cat Sweater",
    price: "153.229đ",
    rating: 4.3,
    sold: "8,1k+ sold",
    almostSoldOut: true,
  },
  {
    id: "3",
    image: "https://s3-alpha-sig.figma.com/img/892a/3ca0/8ed46d4501c5e0d775fe4d013edb9085?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lmpaoUFuLh35eiboH7yOY-TlPT3wqCYfl2T-Sa51vxbnEUmfivu4LFdVcuVu95vm-ywDI37UAnSGe1zOAUPSEzZlt6UV2yRNFMpYJUn1vYHDX8QBEPI4sUXuJhrZunJwEJ48hwk0XgVmtqALgt~EpW~qavpKaEFyJp9vrOeIRw29sywv0OiIlYbLuIsTRiiLUl-TmTdKrw5GzeMNYVyQvY12sCEhup8nR2xcetDspcbQ7PqMuldlK5m4YpoYLVDnR2BlBID5W1zKsi8kXWFchEHhGYPfoBIjJzh7og1bRtSrJAnukxFK1hknAImgYeEEEdWoapQWhGk~zRfwgTi5mA__",
    title: "Women's High-waisted Skinny Jeans",
    price: "337.008đ",
    rating: 4.6,
    sold: "2,5k+ sold",
    almostSoldOut: true,
  },
  {
    id: "4",
    image: "https://s3-alpha-sig.figma.com/img/72f7/b8b0/e25fdd35257029d4b6cd268bc6f370b4?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TdnCG7V3T~d5Gt2ASm2-pOcy6a39bFWuujLOBlo~31UTwV7eycPmfbOJTLB1hXaOI6UOZUwMBFEE2GMn3QlP3zjuoWOjOxX3X5-xbXkHH3n5c0OWPTSZeS64JrWUe~C3Itper3Sw8TgR4ywN0KlASznAJbq9ncxT4I1zQOqYGN-bvihHXMqtPaBfHKh9nXXeGWNKuLG7bAkVOu46XtHmp3eUps0qvVYIGv-w1ScY0cNclNmEj-W2sw6BrhJ2gUWfP33fRyH8aJ7-r2UqMHA1E9IJ61XLJztxeRiecSlU~hdX5wHqKdSf~Gl75qN1GxHJM~dNln8FLmf2oWODjoAoYA__",
    title: "Women's Long Skirt With Butterfly Slit",
    price: "282.459đ",
    rating: 4.7,
    sold: "4,2k+ sold",
    almostSoldOut: true,
  },
  {
    id: "5",
    image: "https://s3-alpha-sig.figma.com/img/82ec/e82c/0efa1df3f41ce0bafa2cd02b7871d6b7?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pwIzqRZ2psvHLK-LXGZ5IrUcBsFrVxPEEBfWd-u~gYqUCvkKTQundeC9G15jR90KA7CICMbNEctyFx1oHWIB6i2uigPU0y5A0JSiJ985o3UQtSHr5h2cx6PGMvUeH64n-VJzQc3uyGDhnZukCq7cjLP4a1FUIjxbXlX-cjA5Ijkvc0uAQxwy6iSi7dXjbaN4eahZMHyFjaJo7bxv0KLylmNvm9FYoOda9WGPWvIjSqKUn~tn9CWWFLED43hTAIf8ZC9qda~M6AKj8WVwgfQtQ7VWMnIm-HWxc1qtDAv3HVg0QALC7AXlqe3u4kzoOAnEDfzqjpeU6eTJ9KdFLK1QUA__",
    title: "Women's Long Skirt With Butterfly Slit",
    price: "282.459đ",
    rating: 4.7,
    sold: "4,2k+ sold",
    almostSoldOut: true,
  },
  {
    id: "6",
    image: "https://s3-alpha-sig.figma.com/img/5409/bec0/1345f65ce96449305337b76b033dc4a8?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CLmcQfzKQQ4FzjV-VL7p0aSSOBKtVLO~M8JkuU46v~cliVtd0gUEfkOwTU5aqd0DZpcHwLbOOD2VVdCxtLO8zOmOlm4Y9Cb4cVAczq0X-p4OhzeeE9ZCCTs9nuCDUuznOdlkw35NbUwd670b2lztiBA0UZ6oY7AOghQe476-JcqLxz5dGbRgwTI5Vt7kQ9W5AyprHnFrorHs0DEZ6o4xAV0FD9cv~3WZ~k9mtORxCqLW30vBjT6NVjOPq0r1RBnTGUgYdsgxV0W4XZ6~WEPkYmcmZ8ML03faDnAFH6VcDMFp8siCDluNyIDvmKki7W5zCD0MDxiSKb6HTXRboSw45Q__",
    title: "Women's Long Skirt With Butterfly Slit",
    price: "282.459đ",
    rating: 4.7,
    sold: "4,2k+ sold",
    almostSoldOut: true,
  },
  {
    id: "7",
    image: "https://s3-alpha-sig.figma.com/img/72f7/b8b0/e25fdd35257029d4b6cd268bc6f370b4?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TdnCG7V3T~d5Gt2ASm2-pOcy6a39bFWuujLOBlo~31UTwV7eycPmfbOJTLB1hXaOI6UOZUwMBFEE2GMn3QlP3zjuoWOjOxX3X5-xbXkHH3n5c0OWPTSZeS64JrWUe~C3Itper3Sw8TgR4ywN0KlASznAJbq9ncxT4I1zQOqYGN-bvihHXMqtPaBfHKh9nXXeGWNKuLG7bAkVOu46XtHmp3eUps0qvVYIGv-w1ScY0cNclNmEj-W2sw6BrhJ2gUWfP33fRyH8aJ7-r2UqMHA1E9IJ61XLJztxeRiecSlU~hdX5wHqKdSf~Gl75qN1GxHJM~dNln8FLmf2oWODjoAoYA__",
    title: "Women's Long Skirt With Butterfly Slit",
    price: "282.459đ",
    rating: 4.7,
    sold: "4,2k+ sold",
    almostSoldOut: true,
  },
  {
    id: "8",
    image: "https://s3-alpha-sig.figma.com/img/72f7/b8b0/e25fdd35257029d4b6cd268bc6f370b4?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TdnCG7V3T~d5Gt2ASm2-pOcy6a39bFWuujLOBlo~31UTwV7eycPmfbOJTLB1hXaOI6UOZUwMBFEE2GMn3QlP3zjuoWOjOxX3X5-xbXkHH3n5c0OWPTSZeS64JrWUe~C3Itper3Sw8TgR4ywN0KlASznAJbq9ncxT4I1zQOqYGN-bvihHXMqtPaBfHKh9nXXeGWNKuLG7bAkVOu46XtHmp3eUps0qvVYIGv-w1ScY0cNclNmEj-W2sw6BrhJ2gUWfP33fRyH8aJ7-r2UqMHA1E9IJ61XLJztxeRiecSlU~hdX5wHqKdSf~Gl75qN1GxHJM~dNln8FLmf2oWODjoAoYA__",
    title: "Women's Long Skirt With Butterfly Slit",
    price: "282.459đ",
    rating: 4.7,
    sold: "4,2k+ sold",
    almostSoldOut: true,
  },
];


const CategoryScreen = () => {

  // filter 
  const [sortOption, setSortOption] = useState("Relevance");

  const handleSortChange = (option) => {
    console.log("Sort by:", option);
    setSortOption(option);
    // Thêm logic sắp xếp danh sách sản phẩm tại đây

    let sortedProducts = [...TrendingProducts]; // Copy danh sách sản phẩm

    switch (option) {
      case "Top sales":
        sortedProducts.sort((a, b) => b.sales - a.sales); // Bán chạy nhất
        break;
      case "Most recent":
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Mới nhất
        break;
      case "Price low to high":
        sortedProducts.sort((a, b) => a.price - b.price); // Giá thấp -> cao
        break;
      case "Price high to low":
        sortedProducts.sort((a, b) => b.price - a.price); // Giá cao -> thấp
        break;
      case "Relevance":
      default:
        // Không thay đổi thứ tự
        break;
    }

    setProducts(sortedProducts); // Cập nhật danh sách sản phẩm đã sắp xếp
  };

  // end filter 
  const categories = ['Featured', 'Women’s Clothing', 'Women’s Shoes', 'Women’s Lingerie & Lounge', 'Men’s Clothing', 'Men’s Shoes',
    'Men’s Underwear & Sleepwear', 'Kid’s Clothing', 'Kid’s Shoes', 'Sport Clothing', 'Office Clothing'];
  const subCategoriesData = {
    'Featured': [
      { name: 'Deals', image: '' },
      { name: 'Women’s Jackets & Coat', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Men’s Jackets & Coat', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Women’s Panties', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Women’s Bras & Bralettes', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Women’s Dresses', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Women’s T-Shirt', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Women’s Activewear', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Men’s Activewear', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Men’s Hats & Caps', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Men’s Hoodies & Sweatshirts', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Women’s Sweaters', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Men’s T-Shirt', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Men’s Sleepwear', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Women’s Sleepwear', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Women’s Pants', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Women’s Two-piece Outfits', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Men’s Sweaters', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' }
    ],


    'Women’s Clothing': [
      { name: 'Áo Thun', image: 'https://pos.nvncdn.com/2865a9-85186/ps/20240503_gxip9qQsvb.jpeg' },
      { name: 'Áo Polo', image: 'https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/a/p/apt231548._89_2.jpg' },
      { name: 'Áo Sơ Mi', image: 'https://pos.nvncdn.com/492284-9176/ps/20231030_NN91oPe5hc.jpeg' },
      { name: 'Áo Hoodie', image: 'https://360.com.vn/wp-content/uploads/2023/11/AHHTK403-APTTK403-QGNTK407-12-Custom.jpg' },
      { name: 'Áo Len', image: 'https://vitimex.com.vn/images/products/2023/08/02/original/Ao%20len%20nam_ALN9005-xam-2.jpg' }
    ],
    'Women’s Shoes': [
      { name: 'Áo Blouse', image: 'https://example.com/aoblouse.jpg' },
      { name: 'Áo Croptop', image: 'https://example.com/aocroptop.jpg' },
      { name: 'Áo Kiểu', image: 'https://example.com/aopolo.jpg' },
      { name: 'Áo Sơ Mi Nữ', image: 'https://example.com/aopolo.jpg' },
      { name: 'Áo Thun Nữ', image: 'https://example.com/aopolo.jpg' },
      { name: 'Áo Polo', image: 'https://example.com/aopolo.jpg' }
    ],
    'Women’s Lingerie & Lounge': ['Quần Jean', 'Quần Kaki', 'Quần Short', 'Quần Tây'],
    'Men’s Clothing': ['Quần Jean Nữ', 'Quần Short Nữ', 'Quần Ống Rộng', 'Quần Legging'],
    'Men’s Shoes': ['Giày Thể Thao', 'Giày Da', 'Sandal', 'Dép Lê'],
    'Men’s Underwear & Sleepwear': ['Khăn Quàng Cổ', 'Găng Tay', 'Thắt Lưng', 'Vớ/Tất'],
    'Kid’s Clothing': ['Bộ Đồ Gym', 'Áo Thể Thao', 'Quần Thể Thao'],
    'Kid’s Shoes': ['Áo Ngực', 'Quần Lót Nam', 'Quần Lót Nữ'],
    'Sport Clothing': ['Pijama', 'Đồ Bộ Mặc Nhà'],
    'Office Clothing': ['Áo Vest', 'Quần Âu', 'Chân Váy Công Sở'],
    'Áo Khoác': ['Áo Khoác Jeans', 'Áo Khoác Da', 'Áo Gió', 'Áo Khoác Len'],
    'Váy Đầm': ['Đầm Dạ Hội', 'Đầm Công Sở', 'Đầm Dạo Phố'],
    'Set Đồ': ['Bộ Quần Women’s Shoes', 'Bộ Quần Women’s Clothing'],
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
    { id: '3', name: 'Bộ Quần Women’s Clothing', image: { uri: 'https://dongphuchaianh.vn/wp-content/uploads/2022/04/dong-phuc-cong-so-nu-1.jpg' }, price: '152.882đ', rating: 4.2, sold: '1,1K+ sold' },
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

  const renderSubCategoryItem = ({ item }) => {
    let imageSource;

    // Kiểm tra nếu item.image tồn tại và là chuỗi trước khi gọi .startsWith()
    if (item.image && typeof item.image === 'string' && item.image.startsWith('http')) {
      imageSource = { uri: item.image }; // Ảnh từ URL
    } else {
      imageSource = item.image; // Ảnh từ thư mục nội bộ (import bằng require)
    }

    return (
      <View style={styles.subCategoryItem}>
        <Image source={imageSource} style={styles.subCategoryImage} />
        <Text style={styles.subCategoryText}>{item.name}</Text>
      </View>
    );
  };



  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  const ListHeaderComponent = () => (
    <View style={styles.rightListHeader}>
      <Text style={styles.subCategoryHeader}>Shop by category</Text>
      <FlatList
        data={subCategories}
        renderItem={renderSubCategoryItem}
        numColumns={3}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Trending items</Text>
        <PaperProvider>
          <SortFilter onSortChange={handleSortChange} />
        </PaperProvider>

      </View>

      <FlatList
        data={TrendingProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
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

  // trending items
  row: {
    justifyContent: "space-between",
  },
  item: {
    width: ITEM_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: ITEM_WIDTH,
    borderRadius: 0,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  price: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "bold",
    color: "#e63946",
  },
});
