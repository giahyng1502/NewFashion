import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect  } from 'react'
import ProductCard from '../../components/ProductCard';
import CartHeader from './CartHeader';
import CartFooter from './CartFooter';

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

const CartScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Khi màn hình load, hiển thị modal ngay lập tức
    setModalVisible(true);
  }, []);

  const categories = ['Recommended', 'Women’s Clothing', 'Men’s Clothing', 'Sports', 'Kids', 'Baby', 'Office', 'Sleepwear'];
  const flatListRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  return (
    <View style={st.container}>
      <CartHeader onLeftButtonPress={() => {navigation.goBack()}} />
      {/* Gợi ý sản phẩm */}
      <View style={st.footContainer}>
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
        <FlatList
          data={products} // Danh sách sản phẩm chính
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => <ProductCard item={item} />}
          contentContainerStyle={st.list}
        />
      </View>
      {/* Modal hiển thị dưới cùng nhưng không chặn bấm */}
      <CartFooter
        visible={modalVisible}
        originalPrice="335.886"
        discountedPrice="268.443"
        itemCount="1"
      />
    </View>
  )
}

export default CartScreen

const st = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex:1
  },

  //gợi ý sản phẩm
  footContainer: {
    marginTop: 10,
    backgroundColor: '#fff'
  },
  listContainer: {
    padding: 5,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 15,
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
  list: {
    paddingHorizontal: 3,
    backgroundColor: '#fff',
  },
})