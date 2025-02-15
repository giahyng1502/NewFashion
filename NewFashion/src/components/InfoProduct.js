import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const InfoProduct = () => {
    return (
        <View style={st.container}>
            
            <View style={st.cusinfo}>
                <Text style={{ width: 360 }}>
                    Embroidered wool jacket, trendy style,
                    built-in scarf style, eye-catching striking
                    white border pattern, extremely convenient,
                </Text>
                <TouchableOpacity>
                <Image style={st.cusiconmore} source={require('../assets/icons/ic_more.png')} resizeMode='cover' />
                </TouchableOpacity>
            </View>
            
            <View style={st.formdetail}>
                    <TouchableOpacity style={st.cusdetail}>
                    <Text> 831 sold | Sold by</Text>
                    <Image style={st.customavtshop} source={require('../assets/icons/ic_avatarshop2.png')} />
                    </TouchableOpacity>
                <View style={st.cusdetailrate}>
                    <Text style={{fontWeight: 'bold', marginRight: 5}}>4.6</Text>
                    <Image style={st.customrateview} source={require('../assets/icons/ic_star.png')} />
                </View>
            </View>

            <View style={st.formprice}>
                <Text style={{fontWeight:'bold', color:'#FE7018',fontSize: 20}}>ONLY 6 LEFT</Text>
                <Text style={{fontWeight:'bold', color:'#1D1D1D',fontSize: 20, marginLeft: 10}}>304.568đ</Text>
                <View style={{backgroundColor:'#FE7018', width: 60, height: 20, borderRadius: 5,marginLeft: 10}}>
                    <Text style={{fontWeight:'bold', textAlign:'center', color:'#FFFFFF'}}>1% OFF</Text>
                </View>
                <Text style={{color:'#737373',textDecorationLine:'line-through',marginLeft: 10}}>298.034đ</Text>
            </View>
        </View>
    )
}

export default InfoProduct

const st = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
    },

    cusinfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 5,
    },

    cusiconmore: {
        marginTop: 20,
    },

    formdetail:{
        flexDirection:'row',
        margin: 10,
    },

    cusdetail: {
        flexDirection: 'row',
    },

    customavtshop: {
        width: 20,
        height: 20,
        borderRadius: 100,
        marginLeft: 10,
    },

    cusdetailrate: {
        flexDirection: 'row',
        marginLeft: 120,
    },

    customrateview:{
        marginRight: 265,
        height: 16,
        width: 100,
        alignSelf: 'center'
    },

    formprice:{
        flexDirection:'row',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center'
    }
})