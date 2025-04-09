import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BannerAdsProduct = () => {
    return (
        <View style={st.container}>
            <View>
                <Image style={st.customig} source={require('../assets/image/ig_newyear.png')} />
            </View>
            <View >
                <Text style={st.customtext}> ✓ Miễn phí vận chuyển đặc biệt dành cho bạn.</Text>
            </View>
            <View>
                <Text style={st.customtext2}> Giới hạn thời gian </Text>
            </View>
        </View>
    )
}

export default BannerAdsProduct

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F91616',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    customtext: {
        color: 'white',
        fontWeight: 'bold',
    },

    customtext2: {
        color: 'white',
        fontSize: 12,
        marginRight : 20,
        fontWeight: 'bold'
    }
})