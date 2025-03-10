import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/actions/productActions'
import Swiper from 'react-native-swiper'
import ProductCard from '../components/ProductCard'
import StarRating from '../components/StarRating'
import SupportFunctions from '../utils/SupportFunctions'

const DetailsScreen = ({ navigation, route }) => {
    const { item } = route.params;
    const { products, loading, page, hasMore } = useSelector(state => state.product);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [selectedColor, setSelectedColor] = React.useState(null);
    const [selectedSize, setSelectedSize] = React.useState(null);
    const [quantity, setQuantity] = React.useState(1);
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(item.image)
        setSelectedColor(item.color[0])
        console.log(item.color[0]);

    }, [])


    return (
        <View style={st.container}>
            <View style={{ padding: 20, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', width: '100%', zIndex: 99 }}>
                <TouchableOpacity style={{ width: 35, height: 35 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/icons/ic_getback.png')} style={{ width: 35, height: 35 }} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: 35, height: 35, marginLeft: 10 }}>
                        <Image source={require('../assets/buttons/bt_cart.png')} style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 35, height: 35, marginLeft: 10 }}>
                        <Image source={require('../assets/icons/ic_share.png')} style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <ProductCard item={item} />}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!loading && hasMore) {
                        dispatch(fetchProducts(page));
                    }
                }}
                style={{ flex: 1 }}
                ListHeaderComponent={
                    <>
                        <View style={{ height: 490, width: '100%', backgroundColor: 'lightgray' }}>
                            <Swiper
                                style={{ height: 490 }}
                                loop={false}
                                dotColor='transparent'
                                activeDotColor='transparent'
                                onIndexChanged={(index) => setCurrentIndex(index)}
                            >
                                {item.image.map((image, index) => (


                                    <View key={index} style={{}}>
                                        <Image source={{ uri: image }} style={{}} />
                                    </View>
                                ))}
                            </Swiper>

                            <View style={{ width: 45, height: 20, borderRadius: 10, backgroundColor: '#1d1d1d50', position: 'absolute', bottom: 10, right: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'semibold' }}>{currentIndex + 1}/{item.image.length}</Text>
                            </View>
                        </View>

                        <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 16, fontWeight: 'medium' }} numberOfLines={2}>{item.name}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'medium' }}>{item.sold} sold</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'medium', marginRight: 5 }}>{item.rating}</Text>
                                <StarRating rating={item.rating} />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
                                {SupportFunctions.convertPrice(item.price)}
                            </Text>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 3, marginLeft: 8, backgroundColor: '#FE7018', borderRadius: 3 }}>
                                <Text style={{ fontSize: 12, fontWeight: 'medium', color: 'white' }}>1% OFF</Text>
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: 'medium', color: '#737373', marginLeft: 8, textDecorationLine: 'line-through' }}>600.000đ</Text>
                        </View>

                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Color: {selectedColor?.nameColor}</Text>
                            <View style={{ marginTop: 10 }}>
                                <FlatList
                                    data={item.color}
                                    horizontal
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => setSelectedColor(item)}
                                            style={{ marginRight: 10, width: 67, height: 67, paddingRight: 7, paddingTop: 7 }}
                                        >
                                            <View style={{ width: 60, height: 60, borderRadius: 5, borderWidth: item._id == selectedColor?._id ? 1.5 : 1, borderColor: item._id == selectedColor?._id ? '#000' : '#BBBBBB', overflow: 'hidden' }}>
                                                <Image source={{ uri: item.imageColor }} style={{ width: 60, height: 60 }} />
                                            </View>
                                            {item.stock < 10 &&
                                                <Image source={require('../assets/icons/ic_almostSoldOut.png')} style={{ width: 14, height: 14, position: 'absolute', top: 0, right: 0, borderRadius: 5 }} />
                                            }
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>

                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', flexShrink: 1 }}>Size: </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, gap: 5, borderRadius: 5, backgroundColor: '#F0F0F0' }}>
                                    <Image source={require('../assets/icons/ic_ruler.png')} style={{ width: 16, height: 16 }} />
                                    <Text style={{ fontSize: 10, fontWeight: 'semibold' }}>Size guide</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <FlatList
                                    data={item.size}
                                    horizontal
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => setSelectedSize(item)}
                                            style={{ marginRight: 10, borderWidth: item == selectedSize ? 1.5 : 1, borderColor: item == selectedSize ? '#000' : '#BBBBBB', borderRadius: 12.5 }}
                                        >
                                            <Text style={{ marginHorizontal: 10, marginVertical: 5, fontSize: 12, fontWeight: 'bold', color: '#000' }}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>

                        {/* Quantity */}
                        <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Qty: </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#73733760'}}>
                                <TouchableOpacity
                                    style={{backgroundColor: '#F0F0F0', width: 30, height: 30, opacity: quantity === 1 ? 0.5 : 1 , justifyContent: 'center'}}
                                    onPress={() => {
                                        if (quantity > 1) {
                                            setQuantity(quantity - 1);
                                        }
                                    }}
                                    disabled={quantity === 1}
                                >
                                    <Image
                                        source={require("../assets/icons/ic_minus.png")}
                                        style={{ width: '100%' }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <View style={{ height: '100%', paddingHorizontal: 10}}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                        {quantity}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{backgroundColor: '#F0F0F0', width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => setQuantity(quantity + 1)}
                                >
                                    <Image
                                        source={require("../assets/icons/ic_plus.png")}
                                        style={{ width: '100%' }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                }
            />
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