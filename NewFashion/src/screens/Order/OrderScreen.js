import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import ProductCard from '../../components/ProductCard';

const tabs = ['All orders', 'Processing', 'Shipped', 'Delivered', 'Returns'];
const orders = [
  // {
  //   id: '1',
  //   status: 'Shipped',
  //   deliveryDate: 'Mar 17-30',
  //   totalItems: 1,
  //   totalPrice: '805.329đ',
  //   product: {
  //     name: 'Embroidered Wool-blend Scarf Jacket',
  //     color: 'Green',
  //     size: 'XL',
  //     image: require('../../assets/image/ig_product2.png'),
  //     price: '268.443d x 3',
  //   },
  // },
]

export const products = [
  {
    id: "1",
    image: "https://s3-alpha-sig.figma.com/img/4e98/161c/44889ce383fe72daa63daf3046238fe5?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=R9jCeHrJ2AcBylbzaG1BxXuPzuEdQbbWluD6UitzRT~v1kfTr32BYX3x6d6Gx~fq~Vg7fqk9to1pm4CE1gxig72SwrxzLnJPlYiT4dvxS~01b8bSxlk3hXQtIJybWxAfwst7Y5qFAfO~blkA1rzR4mnAwVHOjj3uTGP4rQnXRdVwr0IdmZKbBjyBQW9LBxj1MXysIs3C2alVegyryv9vazr6rv3vs9GdWgDbOiB5ECOW7U5LgX4MwlzdNajULXj6S0t57DL7OcegGavYPBYAcKpYNQF9pKelmynb36zdpiJZ82cuy4G6wh~ZqmpOh1BjNT5aZNOesRRel0CoAUMMWw__",
    title: "Embroidered Wool-blend Scarf Jacket",
    price: "304.568đ",
    rating: 4.5,
    ratingCount: 5,
    sold: "831 sold",
    almostSoldOut: true,
  },
  {
    id: "2",
    image: "https://s3-alpha-sig.figma.com/img/2cb2/2cb9/0b8b0b7e8d2c451d364a9cd9989daa2b?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MxUbCT~pKt~bzjJXTxOSdWg5~Id7~Axc0j1hwi00ShfmBMtCAMLSwb-V0EqGdDLX1VCwFzTwANx9bCqbYYyBx-aWdNfJo3YnTxaSJIuoY3hHdb4AsXKsSz6Uc3eRZCSwVC8etcVMrgehDfw3wyEYyRIQD9qbj9wpLe-RphjbRw13qD9xTIVvDJmaAj~9pxT~zegmA83tuF9oXpg~FDjjqEdLhfrnxTEWnGrWy8JieNcQP8Ieu9Vc0OXLgadNkXwxpFRE~JxNMgST8E6~NhvHrvRQjQ1JAf1IY9uZS7mlnTCI7p~RtBFtmb4K8A7hXRgqqGCSWARFJgDUhY7-TW6D-A__",
    title: "Unisex Herringbone Black Cat Sweater",
    price: "153.229đ",
    rating: 4.3,
    ratingCount: 3,
    sold: "8,1k+ sold",
    almostSoldOut: true,
  },
  {
    id: "3",
    image: "https://s3-alpha-sig.figma.com/img/892a/3ca0/8ed46d4501c5e0d775fe4d013edb9085?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lmpaoUFuLh35eiboH7yOY-TlPT3wqCYfl2T-Sa51vxbnEUmfivu4LFdVcuVu95vm-ywDI37UAnSGe1zOAUPSEzZlt6UV2yRNFMpYJUn1vYHDX8QBEPI4sUXuJhrZunJwEJ48hwk0XgVmtqALgt~EpW~qavpKaEFyJp9vrOeIRw29sywv0OiIlYbLuIsTRiiLUl-TmTdKrw5GzeMNYVyQvY12sCEhup8nR2xcetDspcbQ7PqMuldlK5m4YpoYLVDnR2BlBID5W1zKsi8kXWFchEHhGYPfoBIjJzh7og1bRtSrJAnukxFK1hknAImgYeEEEdWoapQWhGk~zRfwgTi5mA__",
    title: "Women's High-waisted Skinny Jeans",
    price: "337.008đ",
    rating: 4.6,
    ratingCount: 7,
    sold: "2,5k+ sold",
    almostSoldOut: true,
  },
  {
    id: "4",
    image: "https://s3-alpha-sig.figma.com/img/72f7/b8b0/e25fdd35257029d4b6cd268bc6f370b4?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TdnCG7V3T~d5Gt2ASm2-pOcy6a39bFWuujLOBlo~31UTwV7eycPmfbOJTLB1hXaOI6UOZUwMBFEE2GMn3QlP3zjuoWOjOxX3X5-xbXkHH3n5c0OWPTSZeS64JrWUe~C3Itper3Sw8TgR4ywN0KlASznAJbq9ncxT4I1zQOqYGN-bvihHXMqtPaBfHKh9nXXeGWNKuLG7bAkVOu46XtHmp3eUps0qvVYIGv-w1ScY0cNclNmEj-W2sw6BrhJ2gUWfP33fRyH8aJ7-r2UqMHA1E9IJ61XLJztxeRiecSlU~hdX5wHqKdSf~Gl75qN1GxHJM~dNln8FLmf2oWODjoAoYA__",
    title: "Women's Long Skirt With Butterfly Slit",
    price: "282.459đ",
    rating: 4.7,
    ratingCount: 4,
    sold: "4,2k+ sold",
    almostSoldOut: true,
  },
  {
    id: "5",
    image: "https://s3-alpha-sig.figma.com/img/82ec/e82c/0efa1df3f41ce0bafa2cd02b7871d6b7?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pwIzqRZ2psvHLK-LXGZ5IrUcBsFrVxPEEBfWd-u~gYqUCvkKTQundeC9G15jR90KA7CICMbNEctyFx1oHWIB6i2uigPU0y5A0JSiJ985o3UQtSHr5h2cx6PGMvUeH64n-VJzQc3uyGDhnZukCq7cjLP4a1FUIjxbXlX-cjA5Ijkvc0uAQxwy6iSi7dXjbaN4eahZMHyFjaJo7bxv0KLylmNvm9FYoOda9WGPWvIjSqKUn~tn9CWWFLED43hTAIf8ZC9qda~M6AKj8WVwgfQtQ7VWMnIm-HWxc1qtDAv3HVg0QALC7AXlqe3u4kzoOAnEDfzqjpeU6eTJ9KdFLK1QUA__",
    title: "Women's Long Skirt With Butterfly Slit",
    price: "282.459đ",
    rating: 4.7,
    ratingCount: 4,
    sold: "4,2k+ sold",
    almostSoldOut: true,
  },
  {
    id: "6",
    image: "https://s3-alpha-sig.figma.com/img/5409/bec0/1345f65ce96449305337b76b033dc4a8?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CLmcQfzKQQ4FzjV-VL7p0aSSOBKtVLO~M8JkuU46v~cliVtd0gUEfkOwTU5aqd0DZpcHwLbOOD2VVdCxtLO8zOmOlm4Y9Cb4cVAczq0X-p4OhzeeE9ZCCTs9nuCDUuznOdlkw35NbUwd670b2lztiBA0UZ6oY7AOghQe476-JcqLxz5dGbRgwTI5Vt7kQ9W5AyprHnFrorHs0DEZ6o4xAV0FD9cv~3WZ~k9mtORxCqLW30vBjT6NVjOPq0r1RBnTGUgYdsgxV0W4XZ6~WEPkYmcmZ8ML03faDnAFH6VcDMFp8siCDluNyIDvmKki7W5zCD0MDxiSKb6HTXRboSw45Q__",
    title: "Women's Long Skirt With Butterfly Slit",
    price: "282.459đ",
    rating: 4.7,
    ratingCount: 4,
    sold: "4,2k+ sold",
    almostSoldOut: true,
  },
  {
    id: "7",
    image: "https://s3-alpha-sig.figma.com/img/72f7/b8b0/e25fdd35257029d4b6cd268bc6f370b4?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TdnCG7V3T~d5Gt2ASm2-pOcy6a39bFWuujLOBlo~31UTwV7eycPmfbOJTLB1hXaOI6UOZUwMBFEE2GMn3QlP3zjuoWOjOxX3X5-xbXkHH3n5c0OWPTSZeS64JrWUe~C3Itper3Sw8TgR4ywN0KlASznAJbq9ncxT4I1zQOqYGN-bvihHXMqtPaBfHKh9nXXeGWNKuLG7bAkVOu46XtHmp3eUps0qvVYIGv-w1ScY0cNclNmEj-W2sw6BrhJ2gUWfP33fRyH8aJ7-r2UqMHA1E9IJ61XLJztxeRiecSlU~hdX5wHqKdSf~Gl75qN1GxHJM~dNln8FLmf2oWODjoAoYA__",
    title: "Women's Long Skirt With Butterfly Slit",
    price: "282.459đ",
    rating: 4.7,
    ratingCount: 54,
    sold: "4,2k+ sold",
    almostSoldOut: true,
  },
  {
    id: "8",
    image: "https://s3-alpha-sig.figma.com/img/72f7/b8b0/e25fdd35257029d4b6cd268bc6f370b4?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TdnCG7V3T~d5Gt2ASm2-pOcy6a39bFWuujLOBlo~31UTwV7eycPmfbOJTLB1hXaOI6UOZUwMBFEE2GMn3QlP3zjuoWOjOxX3X5-xbXkHH3n5c0OWPTSZeS64JrWUe~C3Itper3Sw8TgR4ywN0KlASznAJbq9ncxT4I1zQOqYGN-bvihHXMqtPaBfHKh9nXXeGWNKuLG7bAkVOu46XtHmp3eUps0qvVYIGv-w1ScY0cNclNmEj-W2sw6BrhJ2gUWfP33fRyH8aJ7-r2UqMHA1E9IJ61XLJztxeRiecSlU~hdX5wHqKdSf~Gl75qN1GxHJM~dNln8FLmf2oWODjoAoYA__",
    title: "Women's Long Skirt With Butterfly Slit",
    price: "282.459đ",
    rating: 4.7,
    ratingCount: 60,
    sold: "4,2k+ sold",
    almostSoldOut: true,
  },
];

const OrderItem = ({ order }) => (
  <View style={styles.orderContainer}>
    <View style={styles.breaker}/>

    <View style={[styles.header,{padding:10}]}>
      <Text style={[styles.textHeader,{fontSize:16}]}>{order.status}</Text>
      <Text style={[styles.textHeader,{fontSize:14,color:'#737373'}]}>
        {order.totalItems} items: <Text style={[styles.textHeader,{fontSize:14}]}>{order.totalPrice}</Text>
      </Text>
    </View>

    <Text style={[styles.textHeader,{fontSize:16,color:'#FA7806',padding:10}]}>Delivery: {order.deliveryDate}</Text>

    <View style={styles.productContainer}>
      <Image source={order.product.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <View>
          <Text style={styles.productName}>{order.product.name}</Text>
          <Text style={[styles.productName,{color:'#BBBBBB'}]}>{order.product.color}, {order.product.size}</Text>
        </View>

        <Text style={[styles.textHeader,{fontSize:14,color:'#FA7806'}]}>{order.product.price}</Text>
      </View>
    </View>

    <TouchableOpacity style={styles.buyAgainButton}>
      <Text style={[styles.textHeader,{fontSize:16}]}>Buy this again</Text>
    </TouchableOpacity>
    <View style={styles.breaker}/>
  </View>
);

const OrderScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ScrollView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../../assets/icons/ic_back.png')} style={styles.icon}/>
        </TouchableOpacity>
        <Text style={[styles.textHeader,{fontSize:20}]}>Your orders</Text>
        <TouchableOpacity>
          <Image source={require('../../assets/buttons/bt_cart2.png')} style={styles.icon}/>
        </TouchableOpacity>
      </View>

      {/* menu */}
      <FlatList
        data={tabs}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelectedTab(index)} style={styles.tab}>
            <Text style={[styles.tabText, selectedTab === index && styles.activeText]}>{item}</Text>
            {selectedTab === index && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* order */}
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={require('../../assets/icons/ic_emptyOrder.png')} style={{width:60,height:60}} />
          <Text style={[styles.textHeader,{fontSize:16,marginLeft:10}]}>You don’t have any processing orders</Text>
        </View>
      ):(
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      )}

      {/* maybe like */}
      <Text style={[styles.textHeader,{fontSize:16,padding:10}]}>Maybe you will be also like</Text>

      <FlatList
        data={products} // Danh sách sản phẩm chính
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={styles.list}
      />
    </ScrollView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    flex:1
  },
  header:{
    padding:15,
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomWidth:1,
    borderColor:'#BBBBBB',
    alignItems:'center'
  },
  icon:{
    width:25,
    height:25
  },
  textHeader:{
    color:'#000',
    fontWeight:'bold'
  },
  tab: { 
    alignItems: 'center',
    padding: 12 
  },
  tabText: { 
    fontSize: 18, 
    color: 'gray',
    color:"#737373",
    fontWeight:'bold'
  },
  activeText: { 
    color: 'black', 
    fontWeight: 'bold' 
  },
  activeIndicator: { 
    width: 20, 
    height: 4, 
    backgroundColor: 'black', 
    marginTop: 4 
  },
  emptyContainer:{
    width:'100%',
    backgroundColor:'#FAFAFA',
    padding:50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },

  orderContainer: { 
    backgroundColor: '#fff'
  },
  breaker:{
    width:'100%',
    backgroundColor:'#FAFAFA',
    height:5
  },
  orderHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 5 
  },
  productContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal:10
  },
  productImage: { 
    width: 100, 
    height: 100, 
    marginRight: 10 },
  productDetails: { 
    height:100,
    flexDirection:'column',
    justifyContent:'space-between' 
  },
  productName: { 
    fontSize: 14,
    color:'#000',
    fontWeight:'semibold'
  },
  buyAgainButton: { 
    margin: 10, 
    paddingVertical: 5, 
    paddingHorizontal:12,
    borderWidth: 1, 
    borderColor: 'black', 
    borderRadius: 18, 
    alignSelf: 'flex-end' 
  },  
  list: {
    paddingHorizontal: 3,
    backgroundColor: '#fff',
  }
})