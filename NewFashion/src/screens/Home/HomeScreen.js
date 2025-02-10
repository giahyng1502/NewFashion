import { StyleSheet, ScrollView, TouchableOpacity, FlatList, View, Image, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

const products = [
  {
    id: '1',
    image: require('../../assets/img_banner1.png'),
    label: 'Almost sold out',
    price: '506.136đ',
    sold: '180 sold',
    progress: 0.6,
  },
  {
    id: '2',
    image: require('../../assets/img_banner1.png'),
    label: 'Almost sold out',
    price: '368.764đ',
    sold: '165 sold',
    progress: 0.85,
  },
  {
    id: '3',
    image: require('../../assets/img_banner1.png'),
    label: 'Only 7 left',
    price: '236.446đ',
    sold: '833 sold',
    progress: 0.2,
  },
  {
    id: '4',
    image: require('../../assets/img_banner1.png'),
    label: 'Only 1 left',
    price: '126.920đ',
    sold: '444 sold',
    progress: 0.98,
  },
];



const HomeScreen = () => {
  const categories = ['All', 'Women', 'Men', 'Sports', 'Kids', 'Baby', 'Office', 'Sleepwear'];
  const [selectedCategory, setSelectedCategory] = useState('All')
  const flatListRef = useRef(null)
  const [searchText, setSearchText] = useState('')

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

  const renderItemLightningDeal = ({ item }) => (
    <View style={st.productItem}>
      <Image source={item.image} style={st.productImage} />
      <View style={st.labelContainer}>
        <Text style={st.labelText}>{item.label}</Text>
      </View>
      <Text style={st.priceText}>{item.price}</Text>
      <Text style={st.soldText}>{item.sold}</Text>

      {/* Thanh tiến trình nhỏ */}
      <View style={st.progressBarBackground}>
        <View style={[st.progressBarFill, { width: `${item.progress * 100}%` }]} />
      </View>
    </View>
  );

  const clearText = () => {
    setSearchText('');
  };

  return (
    <ScrollView style={st.container}>
      {/* Banner */}
      <View style={st.bannerContainer}>
        <Image source={require('../../assets/img_banner2.png')} style={st.bannerImage} />
      </View>
      {/* <LightningDeal /> */}

      {/* Search Bar */}
      <View style={st.searchContainer}>
        <TextInput value={searchText} style={st.searchInput} placeholder="Search something..." onChangeText={setSearchText}/>
        {searchText.length > 0 && (
          <TouchableOpacity style={st.clearButton} onPress={clearText}>
            <Image source={require('../../assets/bt_clearText.png')} style={st.icon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={st.searchButton}>
          <Image source={require('../../assets/icons/ic_search.png')} style={st.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        ref={flatListRef}
        horizontal
        keyExtractor={(item) => item}
        renderItem={renderItemCategory}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={st.listContainer}
      />

      {/* Discount */}
      <View style={st.discountContainer}>
        {/* Free Shipping */}
        <View style={st.infoItem}>
          <View style={st.textContainer}>
            <Image
              source={require('../../assets/icons/ic_greenReturn.png')}
              style={st.icon}
            />
            <Text style={[st.title, { color: 'green' }]}>Free shipping</Text>
          </View>
          <Text style={st.subtitle}>Limited-time offer</Text>
        </View>

        {/* Divider */}
        <View style={st.divider} />

        {/* Free Returns */}
        <View style={st.infoItem}>
          <View style={st.textContainer}>
            <Image
              source={require('../../assets/ic_freeReturns.png')}
              style={st.icon}
            />
            <Text style={st.title}>Free returns</Text>
          </View>
          <Text style={st.subtitle}>Up to 90 days*</Text>
        </View>

        {/* Divider */}
        <View style={st.divider} />

        {/* Price Adjustment */}
        <View style={st.infoItem}>
          <View style={st.textContainer}>
            <Image
              source={require('../../assets/icons/ic_freeAdjust.png')}
              style={st.icon}
            />
            <Text style={st.title}>Price adjustment</Text>
          </View>
          <Text style={st.subtitle}>Within 30 days</Text>
        </View>
      </View>

      <View style={st.lightningDealContainer}>

        {/* Tiêu đề */}
        <View style={st.header}>
          <View style={st.subHeader}>
            <Image source={require('../../assets/icons/ic_lightning.png')} style={st.headerImage} />
            <Text style={st.headerTitle}>Lightning deals</Text>
            <Image source={require('../../assets/icons/ic_arrow1.png')} style={st.headerImage} />
          </View>
          <Text style={st.headerOffer}>Limited time offer</Text>
        </View>

        {/* Danh sách sản phẩm */}
        <FlatList
          data={products}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderItemLightningDeal}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={st.listContainer}
        />
      </View>

    </ScrollView>
  )
}

export default HomeScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
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
  listContainer: {
    padding: 5,
  },
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
    marginVertical: 10,
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
    height: 20
  },
  headerOffer: {
    fontSize: 15,
    color: '#383838',
  },
  //item
  listContainer: {
    paddingVertical: 5,
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
  },
  soldText: {
    fontSize: 12,
    color: '#737373',
    marginTop: 3
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
})