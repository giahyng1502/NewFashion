import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ImageDetailProduct from '../components/ImageDetailProduct'
import BannerAdsProduct from '../components/BannerAdsProduct'
import InfoProduct from '../components/InfoProduct'
import ProductSelection from '../components/ProductSelection'
import ShipDetail from './ShipDetail'
import ReviewDetail from '../components/ReviewDetail'
import ReviewFormUser from '../components/ReviewFormUser'
import AboutShop from '../components/AboutShop'
import DetailProduct from '../components/DetailProduct'
import SuggestProduct from '../components/SuggestProduct'

const DetailsScreen = () => {
    return (
        <View style={st.container}>
            <ScrollView>
                <View>
                    <ImageDetailProduct />
                </View>
                <View style={st.headerbar}>
                    <TouchableOpacity>
                        <Image source={require('../assets/icons/ic_getback.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 250 }}>
                        <Image source={require('../assets/icons/ic_seach.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Image source={require('../assets/icons/ic_share.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <BannerAdsProduct />
                </View>
                <View>
                    <InfoProduct />
                </View>
                <View>
                    <ProductSelection />
                </View>
                <View>
                    <ShipDetail/>
                </View>
                <View>
                    <ReviewDetail/>
                </View>
                <View>
                    <ReviewFormUser/>
                </View>
                <View>
                    <AboutShop/>
                </View>
                <View>
                    <DetailProduct/>
                </View>
                <SuggestProduct/>
            </ScrollView>
            <TouchableOpacity style={st.addToCartButton}>
                <Text style={st.addToCartText}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetailsScreen

const st = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    headerbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        elevation: 3,
        position: 'absolute'
    },

    addToCartButton: {
        backgroundColor: "#ff5722",
        padding: 15,
        margin: 10,
        borderRadius: 50,
        alignItems: "center",
    },
    addToCartText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})