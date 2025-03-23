import { StyleSheet, Animated, ScrollView, TouchableOpacity, FlatList, View, Image, Text, LayoutAnimation, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import ProductCard from '../../components/ProductCard';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocketConnection } from "../../redux/reducer/userReducer";
import ScreenSize from '../../contants/ScreenSize';
import AppManager from '../../utils/AppManager';
import SearchBar from '../../components/SearchBar';
import { fetchProducts } from '../../redux/actions/productActions';
import { jwtDecode } from "jwt-decode";
import { fetchCart } from '../../redux/actions/cartActions';
import SupportFunctions from '../../utils/SupportFunctions';
import LightningDealItem from '../../components/LightningDealItem';

const titleCategories = [
  { id: "1", name: "All", image: null },
  { id: "2", name: "DEALS", image: require("../../assets/icons/ic_deals.png"), highlight: true },
  { id: "3", name: "Best Sellers", image: require("../../assets/icons/ic_bestSell.png") },
  { id: "4", name: "5-Star Rated", image: require("../../assets/icons/ic_fiveStar.png") },
  { id: "5", name: "New Arrivals", image: require("../../assets/icons/ic_newArrvals.png") },
];

const HomeScreen = ({ navigation }) => {
  const titleCategoryFlatlistRef = useRef(null)
  const [selectedTitleCategory, setSelectedTitleCategory] = useState(null);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const { products, saleProducts, loading, page, hasMore } = useSelector(state => state.product);
  const { carts } = useSelector(state => state.cart);

  useEffect(() => {
    setSelectedTitleCategory(titleCategories[0]);
    dispatch(fetchCart())

  }, []);

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      dispatch(fetchProducts(page));
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="small" color="#FA7806" />
      </View>
    )
  }

  const handleSelectCartButton = () => {
    navigation.navigate('Cart');
  }

  const handleSelectedItem = (item, discount, expire) => {
    console.log('Selected item:', item);

    navigation.navigate("ProductDetail", { item, discount, expire });
  }

  const renderItemTitleCategory = ({ index, item }) => {
    const isSelected = item === selectedTitleCategory;
    return (
      <TouchableOpacity onPress={() => {
        setSelectedTitleCategory(item);
        titleCategoryFlatlistRef.current.scrollToIndex({ index, animated: true });
      }}>
        <View style={[st.categoryItem, { justifyContent: 'center' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            {item.image && <Image source={item.image} style={{ width: 14, height: 14 }} resizeMode='contain' />}
            <Text style={[st.categoryText, isSelected && st.selectedText, item.highlight && { color: '#F91616' }]}>
              {item.name}
            </Text>
          </View>
          {isSelected && <View style={[st.underline, item.highlight && { backgroundColor: '#F91616' }]} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products} // Danh sách sản phẩm chính
      keyExtractor={(item) => item._id}
      numColumns={2}
      ListHeaderComponent={() => (
        <View>
          {/* Banner */}
          <View style={st.bannerContainer}>
            {/* Banner */}
            <Image source={require('../../assets/img_banner2.png')} style={st.bannerImage} />
            {/* Cart Button */}
            <TouchableOpacity onPress={handleSelectCartButton} style={{ position: 'absolute', top: 50, right: 20 }}>
              <Image source={require('../../assets/buttons/bt_cart.png')} style={{ width: 35, height: 35 }} />
              {(AppManager.shared.isUserLoggedIn() && carts.length > 0) && (
                <View style={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'red', width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#fff' }}>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{carts.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{paddingLeft: 10}} onPress={() => {navigation.navigate('Search')}}>
            <SearchBar disable={false} onSearch={() => {  }} />
          </TouchableOpacity>


          {/* Discount */}
          <View style={st.discountContainer}>
            {/* Free Shipping */}
            <View style={st.infoItem}>
              <View style={st.textContainer}>
                <Image source={require('../../assets/icons/ic_greenReturn.png')} style={st.icon} />
                <Text style={[st.title, { color: 'green' }]}>Free shipping</Text>
              </View>
              <Text style={{ color: '#383838', fontSize: 12, fontWeight: 'semibold' }}>Limited-time offer</Text>
            </View>

            {/* Divider */}
            <View style={st.divider} />


            {/* Free Returns */}
            <View style={st.infoItem}>
              <View style={st.textContainer}>
                <Image source={require('../../assets/icons/ic_freeReturns.png')} style={st.icon} />
                <Text style={st.title}>Free returns</Text>
              </View>
              <Text style={st.subtitle}>Up to 90 days*</Text>
            </View>

            {/* Divider */}
            <View style={st.divider} />

            {/* Price Adjustment */}
            <View style={st.infoItem}>
              <View style={st.textContainer}>
                <Image source={require('../../assets/icons/ic_freeAdjust.png')} style={st.icon} />
                <Text style={st.title}>Price adjustment</Text>
              </View>
              <Text style={st.subtitle}>Within 30 days</Text>
            </View>
          </View>

          <View style={{ height: 6, backgroundColor: '#eee', width: '100%' }} />

          {/* Lightning Deals */}
          {saleProducts.length > 0 && (
            <TouchableOpacity style={st.lightningDealContainer} onPress={()=>navigation.navigate('Lightning')}>
              <View style={st.header}>
                <View style={st.subHeader}>
                  <Image source={require('../../assets/icons/ic_lightning.png')} style={st.headerImage} />
                  <Text style={st.headerTitle}>Lightning deals</Text>
                  <Image source={require('../../assets/icons/ic_arrow1.png')} style={st.headerImage} />
                </View>
                <Text style={st.headerOffer}>Limited time offer</Text>
              </View>
              {/*  */}

              <FlatList
                data={saleProducts}
                horizontal
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <LightningDealItem item={item} onPress={() => { handleSelectedItem(item.productId, item.discount, item.expireAt) }} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={st.listContainer}
              />
            </TouchableOpacity>
          )}

          <View style={{ height: 6, backgroundColor: '#eee', width: '100%' }} />

          {/* <View>
            <FlatList
              data={titleCategories}
              ref={titleCategoryFlatlistRef}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={renderItemTitleCategory}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={st.listContainer}
            />
          </View> */}
        </View>
      )}
      renderItem={({ item }) => <ProductCard item={item} onSelected={() => { handleSelectedItem(item) }} />}
      onEndReached={loadMoreProducts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{ paddingHorizontal: 3, backgroundColor: '#fff' }}
      showsVerticalScrollIndicator={false}
    />
  );
};


const st = StyleSheet.create({
  container: {
    backgroundColor: '#eee'
  },

  bannerContainer: {
    width: '100%',
    height: 200,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  //search
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

  //categories
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryText: {
    fontSize: 14,
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

  //discount
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginTop: 5
  },
  infoItem: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 7,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#383838',
  },
  divider: {
    width: 1.5,
    height: 30,
    backgroundColor: '#737373',
    marginHorizontal: 5,
  },
  lightningDealContainer: {
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
    alignItems: 'center',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  headerImage: {
    width: 20,
    height: 20,
  },
  headerOffer: {
    fontSize: 15,
    color: '#383838',
  },
  //item
  listContainer: {
    paddingVertical: 5,
    overflow: 'visible'
  },
  productItem: {
    width: 100,
    marginRight: 15
  },
  productImage: {
    position: 'relative',
    width: '100%',
    height: 100,
  },
  labelContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 25,
    top: 70,
    opacity: 0.8,
  },
  labelText: {
    fontSize: 10,
    color: '#fff',
  },
  priceText: {
    fontSize: 14,
    color: '#FE7018',
    fontWeight: 'bold',
    marginTop: 8,
    width: '100%',
    textAlign: 'center',
  },
  soldText: {
    fontSize: 12,
    color: '#737373',
    marginTop: 3,
    width: '100%',
    textAlign: 'center',
  },
  progressBarBackground: {
    height: 5,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginTop: 8,
  },
  progressBarFill: {
    height: 5,
    backgroundColor: '#000',
    borderRadius: 3,
  },

  //productContainer
  productsContainer: {
    marginVertical: 10,
  },
  list: {
    paddingHorizontal: 3,
    backgroundColor: '#fff',
  },
  itemCategories: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  activeCategories: {
    borderBottomWidth: 3,
    borderBottomColor: "#000000",
  },
  iconCategories: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  textCategories: {
    color: "#737373",
    fontSize: 15,
    fontWeight: '700'
  },
  highlight: {
    color: "red",
    fontWeight: "bold",
  },
})

export default HomeScreen;
