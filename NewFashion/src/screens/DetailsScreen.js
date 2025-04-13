import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageDetailProduct from '../components/ImageDetailProduct'
import BannerAdsProduct from '../components/BannerAdsProduct'
import InfoProduct from '../components/InfoProduct'
import ProductSelection from '../components/ProductSelection'
import ShipDetail from './ShipDetail'
import ReviewDetail, { Ratingbar } from '../components/ReviewDetail'
import ReviewFormUser, { ReviewItem } from '../components/ReviewFormUser'
import AboutShop from '../components/AboutShop'
import DetailProduct from '../components/DetailProduct'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, fetchProductById } from '../redux/actions/productActions'
import Swiper from 'react-native-swiper'
import ProductCard from '../components/ProductCard'
import StarRating from '../components/StarRating'
import SupportFunctions from '../utils/SupportFunctions'
import AppManager from '../utils/AppManager'
import { addToCart } from '../redux/actions/cartActions'
import CountdownTimer from '../components/CountdownTimer'
import AsyncStorage from '@react-native-async-storage/async-storage';
const DetailsScreen = ({ navigation, route }) => {
    const { item, discount, expire } = route.params;
    const { products, loading, page, hasMore } = useSelector(state => state.product);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [selectedColor, setSelectedColor] = React.useState(null);
    const [selectedSize, setSelectedSize] = React.useState(null);
    const [quantity, setQuantity] = React.useState(1);
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.cart);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        dispatch(fetchProductById(item._id))
            .unwrap()
            .then((review) => {
                console.log("Review: ", review);
                setReviews(review);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }, []);

    function formatDate(isoString) {
        const date = new Date(isoString);

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    }

    useEffect(() => {
        console.log(item);
        console.log(reviews);

        const saveItemToLocal = async () => {
            try {
                // Lấy danh sách các item đã lưu từ local storage
                const storedItems = await AsyncStorage.getItem('browsingHistory');
                const itemsArray = storedItems ? JSON.parse(storedItems) : [];

                // Kiểm tra xem item đã tồn tại trong danh sách chưa
                const isItemExists = itemsArray.some(savedItem => savedItem._id === item._id);

                if (!isItemExists) {
                    // Nếu item chưa tồn tại, thêm vào danh sách và lưu lại
                    const updatedItems = [...itemsArray, item];
                    await AsyncStorage.setItem('browsingHistory', JSON.stringify(updatedItems));
                    console.log('Item saved to local storage:', item);
                } else {
                    console.log('Item already exists in local storage');
                }
            } catch (error) {
                console.error('Error saving item to local storage:', error);
            }
        };

        setSelectedColor(item.color[0]);
        saveItemToLocal();
    }, []);

    const addToCartHandle = () => {
        if (!AppManager.shared.isUserLoggedIn()) {
            navigation.navigate('Login');
            return
        }

        if (!selectedColor || !selectedSize) {
            alert('Please select color and size');
            return;
        }

        const cartItem = {
            productId: item._id,
            quantity: quantity,
            color: selectedColor,
            size: selectedSize,
        }

        dispatch(addToCart(cartItem))
            .then(() => {
                alert('Add to cart successfully');
            })
            .catch((error) => {
                alert('Add to cart failed');
            })
    }

    const handleSelectCartButton = () => {
        navigation.navigate('Cart');
    }

    const getOriginalPrice = (item) => {
        return SupportFunctions.convertPrice(item.price);
    }

    const getDiscountPrice = (item) => {
        if (discount) {
            return SupportFunctions.convertPrice(discount > 0 ? item.price * (1 - discount / 100) : item.price);
        }
        return SupportFunctions.convertPrice(item.price);
    }

    const onExpire = () => {
        console.log('Flash sale has ended');

        // Hiển thị thông báo
        Alert.alert(
            "Flash Sale Ended",
            "The flash sale has ended.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        // Quay lại màn hình trước đó
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    const handleSelectedItem = (item) => {
        console.log('Selected item:', item);

        navigation.navigate("ProductDetail", { item });
    }

    return (
        <View style={st.container}>
            <View style={{ padding: 20, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', width: '100%', zIndex: 99 }}>
                <TouchableOpacity style={{ width: 35, height: 35 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/icons/ic_getback.png')} style={{ width: 35, height: 35 }} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleSelectCartButton} style={{ marginRight: 10 }}>
                        <Image source={require('../assets/buttons/bt_cart.png')} style={{ width: 35, height: 35 }} />
                        {(AppManager.shared.isUserLoggedIn() && carts.length > 0) && (
                            <View style={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'red', width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#fff' }}>
                                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{carts.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 35, height: 35 }}>
                        <Image source={require('../assets/icons/ic_share.png')} style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={products}
                numColumns={2}
                keyExtractor={(item,index) =>`${item._id}${index} product in product detail`}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 / 2, padding: 5 }}>
                        <ProductCard
                            item={item}
                            onSelected={() => { handleSelectedItem(item) }}
                        />
                    </View>
                )}
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
                                    <View key={index} style={{ flex: 1 }}>
                                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                                    </View>
                                ))}
                            </Swiper>

                            <View style={{ width: 45, height: 20, borderRadius: 10, backgroundColor: '#1d1d1d50', position: 'absolute', bottom: 10, right: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'semibold' }}>{currentIndex + 1}/{item.image.length}</Text>
                            </View>
                        </View>

                        {/* Hiển thị thời gian đếm ngược */}
                        {expire &&
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#ff5722", paddingHorizontal: 10, paddingVertical: 5 }}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                    Flash sale
                                </Text>

                                <CountdownTimer expire={expire} onExpire={onExpire} />

                            </View>
                        }

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
                                {getDiscountPrice(item)}
                            </Text>
                            {discount &&
                                <>
                                    <View style={{ paddingHorizontal: 10, paddingVertical: 3, marginLeft: 8, backgroundColor: '#FE7018', borderRadius: 3 }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'medium', color: 'white' }}>{discount}% OFF</Text>
                                    </View>

                                    <Text style={{ fontSize: 14, fontWeight: 'medium', color: '#737373', marginLeft: 8, textDecorationLine: 'line-through' }}>{getOriginalPrice(item)}</Text>
                                </>
                            }

                        </View>

                        {/* color */}
                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Color: {selectedColor?.nameColor}</Text>
                            <View style={{ marginTop: 10 }}>
                                <FlatList
                                    data={item.color}
                                    horizontal
                                    keyExtractor={(item,index) =>`${item._id}${index} color in product detail`}
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

                        {/* size */}
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
                                    keyExtractor={(item,index) => `${item._id}${index} size in productDetail`}
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
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#73733760' }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: '#F0F0F0', width: 30, height: 30, opacity: quantity === 1 ? 0.5 : 1, justifyContent: 'center' }}
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
                                <View style={{ height: '100%', paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                        {quantity}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{ backgroundColor: '#F0F0F0', width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => setQuantity(quantity < 20 ? quantity + 1 : 20)}
                                >
                                    <Image
                                        source={require("../assets/icons/ic_plus.png")}
                                        style={{ width: '100%' }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 6, backgroundColor: '#EEEEEE', marginTop: 20 }} />

                        {/* Shipping */}
                        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../assets/icons/ic_ship.png')} style={{ width: 18, height: 18 }} />
                                    <Text style={{ fontWeight: '700', color: '#007637', marginLeft: 10, textAlign: 'center' }}>Free shipping on all orders</Text>
                                </View>
                                <Image style={{ marginLeft: 165 }} source={require('../assets/icons/ic_next.png')} />
                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#000', marginTop: 10 }}>
                                <Text style={{ color: '#737373' }}>Delivery:</Text>
                                Jan 25 - Feb 5
                            </Text>

                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#737373', marginTop: 10 }}>
                                Get a 25.000đ credit for late delivery
                            </Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#000' }}>
                                    <Text style={{ color: '#737373' }}>Courier company: </Text>
                                </Text>
                                <Image source={require('../assets/icons/ic_j&t.png')} style={{ width: 15, height: 15, marginLeft: 5 }} resizeMode='contain' />
                                <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#000', marginLeft: 5 }}>BEST EXPRESS</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 6, backgroundColor: '#EEEEEE', marginTop: 20 }} />

                        {/* Review */}
                        <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>
                                {item.rating}
                            </Text>

                            <StarRating rating={item.rating} />

                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#000' }}>
                                ({item.rateCount})
                            </Text>
                        </View>

                        <View style={{ width: '100%', height: 1, backgroundColor: '#BBBBBB', marginTop: 10 }} />

                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>Item reviews</Text>
                                <TouchableOpacity>
                                    <Text style={{ fontWeight: 'medium', fontSize: 12, color: '#000' }}>See all</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ width: '100%', height: 1, backgroundColor: '#BBBBBB', marginTop: 10 }} />

                            <FlatList
                                data={reviews}
                                keyExtractor={(item,index) =>`${item._id}${index} review in product detail`}
                                renderItem={({ item }) => (
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#BBBBBB", paddingBottom: 15, paddingTop: 10 }}>
                                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                            <Image source={{ uri: item.userId.avatar }} style={{ width: 28, height: 28 }} />
                                            <Text style={{ fontWeight: "700", fontSize: 12 }}>{item.userId.name}</Text>
                                            <Text style={{ color: "#737373", fontSize: 10, fontWeight: "500" }}>on {formatDate(item.reviewDate)}</Text>
                                        </View>
                                        <StarRating rating={item.rate} />
                                        <Text style={{ color: "#737373", fontWeight: "500", fontSize: 10 }}>{item.purchased}</Text>
                                        <Text style={{ fontWeight: "bold", fontSize: 13 }}>{item.content}</Text>
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 18 }}>
                                            {item.images.map((uri, index) => (
                                                <Image key={index} source={{ uri }} style={{ width: 60, height: 60, marginRight: 10, borderRadius: 5 }} />
                                            ))}
                                        </View>
                                    </View>
                                )}
                            />
                        </View>

                        <View style={{ width: '100%', height: 6, backgroundColor: '#EEEEEE', marginTop: 20 }} />

                        {/* About product */}
                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>Product details</Text>
                        </View>

                        <View style={{ width: '100%', height: 1, backgroundColor: '#BBBBBB', marginTop: 10 }} />

                        <DetailProduct item={item} />

                        <View style={{ width: '100%', height: 6, backgroundColor: '#EEEEEE' }} />

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginVertical: 10 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#BBBBBB' }} />
                            <Text style={{ marginHorizontal: 10, fontWeight: 'semibold', fontSize: 14, color: '#000' }}>Maybe you will also like</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#BBBBBB' }} />
                        </View>
                    </>
                }
            />
            <TouchableOpacity style={st.addToCartButton} onPress={addToCartHandle}>
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