import {  Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import BaseHeader from '../../components/BaseHeader';
import StarRating from '../../components/StarRating';
import { useSelector } from 'react-redux';

const LightningScreen = ({navigation}) => {
    const { saleProducts } = useSelector(state => state.product);
    
  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
        <BaseHeader
            title='Lightning deals'
            showLeftButton={true}
            onLeftButtonPress={() => navigation.goBack()}
        />

        <FlatList
            style={{paddingHorizontal:15}}
            data={saleProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={{flexDirection: "row",paddingVertical:10,borderBottomWidth:0.5,borderBottomColor:'#737373'}}>
                <Image source={item.image} style={{ width: 160, height: 160}}/>
                <View style={{ flex: 1, marginLeft: 15,flexDirection:'column',justifyContent:'space-between' }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold",color:'#000',marginBottom:5 }}>{item.id}</Text>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems:'flex-end'}}>
                        <View style={{flexDirection:'column'}}>
                            <StarRating rating={item.rating}/>
                            <Text style={{color:'#737373',fontSize:14,textDecorationLine:'line-through',marginTop:5}}>
                                999đ
                            </Text>
                            <Text style={{color:'#FA7806',fontSize:18,fontWeight:'bold',marginBottom:5}}>
                                {item.price}
                            </Text>
                            <View style={{paddingVertical:5,paddingHorizontal:12,backgroundColor:'#000',borderRadius:15,width:120}}>
                                <Text style={{color:'#fff',fontSize:12,fontWeight:'bold',textAlign:'center'}}>
                                    {item.label}
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'column',alignItems:'center'}}>
                            <TouchableOpacity style={{backgroundColor: "#FA7806", padding: 10,borderRadius: 5,marginBottom:5}}>
                                <Text style={{ color: "#fff", fontWeight: "bold",textAlign:'center' }}>Mua ngay</Text>
                            </TouchableOpacity>
                            <Text style={{color:'#737373',fontWeight:'bold',fontSize:12}}>
                                {item.sold}
                            </Text>
                        </View>
                    </View>
                </View>
            </View> )}
        />
    </View>
  )
}

export default LightningScreen