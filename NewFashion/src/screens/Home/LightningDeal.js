import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React from 'react'

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

const LightningDeal = () => {
    const renderItem = ({ item }) => (
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
    
  return (
    <View style={st.container}>
      
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
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={st.listContainer}
      />
    </View>
  )
}

export default LightningDeal

const st = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginVertical:10,
        padding: 10,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
        alignItems: 'center',
      },
      subHeader:{
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerTitle: {
        fontSize: 16,
        marginHorizontal:5,
        fontWeight: 'bold',
      },
      headerImage:{
        width:20,
        height:20
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
        position:'relative',
        width: '100%',
        height: 100,
      },
      labelContainer: {
        position: 'absolute',
        alignSelf:'center',
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 25,
        top:70
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