import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Ads = () => {
  return (
    <View style={st.container}>
        <View style={st.comp}>
            <Image style={st.image} source={require('../asset/ic_freeship.png')} resizeMode='cover'/>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Free shipping</Text>
            <Text>On all orders</Text>
        </View>

        <View style={st.comp}>
            <Image style={st.image} source={require('../asset/ic_freereturn.png')} resizeMode='cover'/>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Free returns</Text>
            <Text>Up to 90 days</Text>
        </View>
    </View>
  )
}

export default Ads

const st = StyleSheet.create({
    container:{
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-around",
        position:"absolute",
        width: "100%",
        marginLeft: 20
    },

    comp:{
        justifyContent: "center",
        alignItems: "center",
    },

    image:{
        width: 50,
        height: 50,
    }


})