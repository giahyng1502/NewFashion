import { StyleSheet, ScrollView, TouchableOpacity, FlatList, View, Image, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import ProductCard from '../../components/ProductCard';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocketConnection } from "../../redux/reducer/userReducer";

const saleProducts = [
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


const products = [
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

const HomeScreen = ({ navigation }) => {
  const categories = ['All', 'Women', 'Men', 'Sports', 'Kids', 'Baby', 'Office', 'Sleepwear'];
  const flatListRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

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
      <View style={st.progressBarBackground}>
        <View style={[st.progressBarFill, { width: `${item.progress * 100}%` }]} />
      </View>
    </View>
  );

  const clearText = () => {
    setSearchText('');
  };

  return (
    <FlatList
      data={products} // Danh sách sản phẩm chính
      keyExtractor={(item) => item.id}
      numColumns={2}
      ListHeaderComponent={() => (
        <View>
          {/* Banner */}
          <View style={st.bannerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
              <Image style={st.chatIcon} source={require('../../assets/icons/ic_chat.png')} />
            </TouchableOpacity>
            <Image source={require('../../assets/img_banner2.png')} style={st.bannerImage} />
          </View>

          {/* Search Bar */}
          <View style={st.searchContainer}>
            <TextInput value={searchText} style={st.searchInput} placeholder="Search something..." onChangeText={setSearchText} />
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
                <Image source={require('../../assets/icons/ic_greenReturn.png')} style={st.icon} />
                <Text style={[st.title, { color: 'green' }]}>Free shipping</Text>
              </View>
              <Text style={st.subtitle}>Limited-time offer</Text>
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

          <View style={{height: 6, backgroundColor: '#eee', width: '100%'}} />

          {/* Lightning Deals */}
          <View style={st.lightningDealContainer}>
            <View style={st.header}>
              <View style={st.subHeader}>
                <Image source={require('../../assets/icons/ic_lightning.png')} style={st.headerImage} />
                <Text style={st.headerTitle}>Lightning deals</Text>
                <Image source={require('../../assets/icons/ic_arrow1.png')} style={st.headerImage} />
              </View>
              <Text style={st.headerOffer}>Limited time offer</Text>
            </View>

            <FlatList
              data={saleProducts}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={renderItemLightningDeal}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={st.listContainer}
            />
          </View>

          <View style={{height: 6, backgroundColor: '#eee', width: '100%'}} />
        </View>
      )}
      renderItem={({ item }) => <ProductCard item={item} />}
      contentContainerStyle={st.list}
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

  chatIcon: {
    width: 30,
    height: 30,
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

  //productContainer
  productsContainer: {
    marginVertical: 10,
  },
  list: {
    paddingHorizontal: 3,
    backgroundColor: '#fff',
  },
})

export default HomeScreen;
