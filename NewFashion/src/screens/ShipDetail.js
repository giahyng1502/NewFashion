import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ShipDetail = () => {
  return (
    <View style={st.container}>
        <TouchableOpacity>
        <View style={st.cusfont}>
            <Image source={require('../assets/icons/ic_ship.png')}/>
            <Text style={{fontWeight:'700',color:'#007637',marginLeft: 10, textAlign:'center'}}>Free shipping on all orders</Text>
            <Image style={{marginLeft: 165}} source={require('../assets/icons/ic_next.png')}/>
        </View>
        <View>
            <Text style={{fontWeight:'700'}}><Text style={{fontWeight:'700',color:'#737373'}}>Delivery:</Text> Jan 25 - Feb 5</Text>
        </View>
        <View>
            <Text style={{fontWeight:'700',color:'#737373'}}>Get a 25.000đ credit for late delivery</Text>
        </View>
        <View style={{alignItems:'center',flex:1,flexDirection:'row'}}>
            <Text style={{fontWeight:'700',color:'#737373'}}>Courier company: </Text>
            <Image source={require('../assets/icons/ic_j&t.png')}/>
            <Text style={{fontWeight:'700'}}>BEST EXPRESS</Text>
        </View>
        </TouchableOpacity>
    </View>
  )
}

export default ShipDetail

const st = StyleSheet.create({
    container:{
        flex:1,
        padding: 15,
        marginLeft: 2,
        borderTopColor:'#EEEEEE',
        borderBottomColor: '#EEEEEE',
        borderRightColor:'white',
        borderLeftColor:'white',
        borderWidth: 5,
    },

    cusfont:{
        flexDirection: 'row',
        alignItems: 'center',
    }
})