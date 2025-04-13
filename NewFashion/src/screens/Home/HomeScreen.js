import { StyleSheet, TouchableOpacity, FlatList, View, Image, Text, ActivityIndicator } from 'react-native'
import React, { useEffect} from 'react'
import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from "react-redux";
import AppManager from '../../utils/AppManager';
import SearchBar from '../../components/SearchBar';
import { fetchProducts } from '../../redux/actions/productActions';
import { fetchCart } from '../../redux/actions/cartActions';
import LightningDealItem from '../../components/LightningDealItem';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, saleProducts, loading, page, hasMore } = useSelector(state => state.product);
  const { carts } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch]);

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      console.log('Loading more products');
      dispatch(fetchProducts(page));
    }
  };

  const renderFooter = () => {
    console.log('Loading:', loading);

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

  return (
    <FlatList
      data={products} // Danh sách sản phẩm chính
      keyExtractor={(item,index) => `${item._id}${item.name} ${index} product in home`}
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
              {(AppManager.shared.isUserLoggedIn() && carts?.products?.length > 0) && (
                <View style={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'red', width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#fff' }}>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{carts.products.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>
            <SearchBar disable={false} onSearch={() => { }} />
          </TouchableOpacity>

          {/* Discount */}
          <View style={st.discountContainer}>
            {/* Free Shipping */}
            <View style={st.infoItem}>
              <View style={st.textContainer}>
                <Image source={require('../../assets/icons/ic_greenReturn.png')} style={st.icon} />
                <Text style={[st.title, { color: 'green' }]}>Miễn phí giao hàng</Text>
              </View>
              <Text style={{ color: '#383838', fontSize: 12, fontWeight: 'semibold' }}>Giới hạn thời gian</Text>
            </View>

            {/* Divider */}
            <View style={st.divider} />


            {/* Free Returns */}
            <View style={st.infoItem}>
              <View style={st.textContainer}>
                <Image source={require('../../assets/icons/ic_freeReturns.png')} style={st.icon} />
                <Text style={st.title}>Miễn phí trả hàng</Text>
              </View>
              <Text style={st.subtitle}>Lên đến 90 ngày</Text>
            </View>

            {/* Divider */}
            <View style={st.divider} />

            {/* Price Adjustment */}
            <View style={st.infoItem}>
              <View style={st.textContainer}>
                <Image source={require('../../assets/icons/ic_freeAdjust.png')} style={st.icon} />
                <Text style={st.title}>Hoàn tiền</Text>
              </View>
              <Text style={st.subtitle}>Trong vòng 30 ngày</Text>
            </View>
          </View>

          <View style={{ height: 6, backgroundColor: '#eee', width: '100%' }} />

          {/* Lightning Deals */}
          {saleProducts.length > 0 && (
            <TouchableOpacity style={st.lightningDealContainer} onPress={() => navigation.navigate('Lightning')}>
              <View style={st.header}>
                <View style={st.subHeader}>
                  <Image source={require('../../assets/icons/ic_lightning.png')} style={st.headerImage} />
                  <Text style={st.headerTitle}>Ưu đãi chớp nhoáng</Text>
                  <Image source={require('../../assets/icons/ic_arrow1.png')} style={st.headerImage} />
                </View>
                <Text style={st.headerOffer}>Ưu đãi có thời hạn</Text>
              </View>
              {/*  */}

              <FlatList
                data={saleProducts}
                horizontal
                keyExtractor={(item,index) =>`${item._id}${index} saleProduct in homeScreen`}
                renderItem={({ item }) => <LightningDealItem item={item} onPress={() => { handleSelectedItem(item.productId, item.discount, item.expireAt) }} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={st.listContainer}
              />
            </TouchableOpacity>
          )}

          <View style={{ height: 6, backgroundColor: '#eee', width: '100%' }} />
        </View>
      )}
      renderItem={({ item }) => (
        <View style={{ flex: 1 / 2, padding: 5 }}>
          <ProductCard
            item={item}
            onSelected={() => { handleSelectedItem(item) }}
          />
        </View>
      )}
      onEndReached={loadMoreProducts}
      onEndReachedThreshold={0.2}
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
