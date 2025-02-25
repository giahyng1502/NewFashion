import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import BuyerDetail from './BuyerDetail'
import PaymentAnhCoupon from './PaymentAndCoupon'
import SubInfor from './SubInfor'

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
        {/* header */}
        <View style={styles.headerContainer}>
            <TouchableOpacity>
                <Image source={require("../../assets/ic_arrowLeft.png")} style={styles.arrowButton} />
            </TouchableOpacity>
            <Text style={styles.totalPrice}>Checkout</Text>
            <Text />          
        </View>

        {/* body */}
        <ScrollView>
            <BuyerDetail />
            <PaymentAnhCoupon />
            <SubInfor />
        </ScrollView>

        {/* footer */}
        <View style={styles.footerContainer}>
            {/* Phần tổng tiền */}
            <View style={styles.priceContainer}>
                <View style={styles.realPriceContainer}>
                    <Text style={styles.totalPrice}>805.329đ</Text>
                    <TouchableOpacity>
                        <Image source={require('../../assets/icons/ic_arrowUp.png')} resizeMode='cover' style={styles.arrowButton}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.savedAmount}>Saved 202.329đ</Text>
            </View>
            {/* Nút Submit Order */}
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit order</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eee',
        position:'relative'
    },
    headerContainer: {
        width: "100%",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:20,
        backgroundColor:'#fff'
    },

    arrowButton:{
        width:20,
        height:20
    },
    footerContainer: {
        position:'static',
        width:"100%",
        bottom:0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 20,
    },
    priceContainer: {
        flexDirection: 'column',
    },
    realPriceContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    savedAmount: {
        fontSize: 16,
        color: '#D96923',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#ff6600',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})