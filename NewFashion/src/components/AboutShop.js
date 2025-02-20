import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AboutShop = () => {
    return (

        <TouchableOpacity style={st.container}>
            <View>
                <Image source={require("../assets/icons/ic_avatarshop3.png")} />
            </View>
            <View style={st.infoshop}>
                <Text style={st.namebrand}>New Fashion Shop</Text>
                <View style={st.infoshop2}>
                <Text style={st.custext}>2,1k</Text>
                <Text style={st.custext2}>Followers</Text>
                <Text style={st.custext}>7,4k</Text>
                <Text style={st.custext2}>Sold</Text>
                <Text style={st.custext}>4,6</Text>
                <Image source={require('../assets/icons/ic_staralone.png')}/>
                </View>
            </View>
            <Image source={require('../assets/icons/ic_next.png')} style={{marginLeft: 110}}/>
        </TouchableOpacity>

    )
}

export default AboutShop

const st = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: "#EEEEEE",
        borderTopWidth: 5,
        borderBottomWidth: 5,
        height: 70,
        alignItems: "center",
        padding: 10,
        gap: 10,
    },

    infoshop: {
        flexDirection: "column",
    },
    
    infoshop2:{
        flexDirection: "row",
        gap: 7,
        alignItems:"center",
    },

    custext:{
        fontWeight: "bold",
    },

    custext2:{
        color:"#737373",
        fontWeight:"bold",
    },

    namebrand:{
        fontSize: 16,
        fontWeight: "bold",
    },
})