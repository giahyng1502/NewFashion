import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Animated, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import BuyerDetail from './BuyerDetail'
import PaymentAnhCoupon from './PaymentAndCoupon'
import SubInfor from './SubInfor'
import SupportFunctions from '../../utils/SupportFunctions';
import BaseHeader from '../../components/BaseHeader'

const CheckoutScreen = ({ navigation }) => {
    const { carts } = useSelector(state => state.cart);
    const { personalInfo } = useSelector(state => state.personalInfo);

    const [isShowPriceBottomSheet, setIsShowPriceBottomSheet] = useState(false)
    const animatedValue = useRef(new Animated.Value(0)).current;
    const bottomSheetHeight = 500
    const [isShowAdressSheet, setIsShowAdressSheet] = useState(false)

    const [defaultAddress, setDefaultAddress] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log('personalInfo:', personalInfo);

        if (personalInfo && personalInfo.information) {
            console.log('default', getDefaultInformation());
            setDefaultAddress(getDefaultInformation());
            setSelectedAddress(getDefaultInformation());
            setIsLoading(false);
        } else {
            console.log('No personalInfo data or empty information array');
        }
    }, [personalInfo]);


    //mở sheet chi tiết đơn hàng
    const toggleBottomSheet = () => {
        if (!isShowPriceBottomSheet) {
            openPriceBottomSheet()
        } else {
            closePriceBottomSheet()
        }
    }

    const openPriceBottomSheet = () => {
        setIsShowPriceBottomSheet(true);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    const closePriceBottomSheet = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            setIsShowPriceBottomSheet(false);
        });
    }

    //mở sheet địa chỉ
    const toggleAdressSheet = () => {
        if (!isShowAdressSheet) {
            openAdressSheet()
        } else {
            closeAdressSheet()
        }
    }

    const openAdressSheet = () => {
        setIsShowAdressSheet(true);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    const closeAdressSheet = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            setIsShowAdressSheet(false);
        });
    }

    const backdropOpacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5]
    });

    const sheetTranslateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [bottomSheetHeight, 0]
    });

    const getFinalPriceOfSelectedItems = () => {
        return carts
            .filter(item => item.isSelected)
            .reduce((total, item) => {
                const discountMultiplier = item.disCountSale > 0 ? (1 - item.disCountSale) : 1;
                const itemPrice = item.price * discountMultiplier * item.quantity;
                return total + itemPrice;
            }, 0);
    }

    const getDefaultInformation = () => {
        const defaultInformation = personalInfo.information.filter(infor => infor.isDefault);

        if (defaultInformation.length === 0) {
            return personalInfo.information[0];
        } else {
            return defaultInformation[0];
        }
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading personal info...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* header */}
            <BaseHeader title="Checkout" showLeftButton={true} onLeftButtonPress={() => { navigation.goBack() }} />

            {/* body */}
            <ScrollView>
                <BuyerDetail products={carts} onClickShowPopup={[toggleAdressSheet, toggleBottomSheet]} information={selectedAddress} />
                <PaymentAnhCoupon products={carts} />
                <SubInfor />
            </ScrollView>

            {/* footer */}
            <View style={styles.footerContainer}>
                {/* Phần tổng tiền */}
                <View style={styles.priceContainer}>
                    <View style={styles.realPriceContainer}>
                        <Text style={styles.totalPrice}>{SupportFunctions.convertPrice(getFinalPriceOfSelectedItems())}</Text>
                        <TouchableOpacity onPress={toggleBottomSheet}>
                            <Image source={require('../../assets/icons/ic_arrowUp.png')} resizeMode='cover' style={styles.arrowButton} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.savedAmount}>Saved 0đ</Text>
                </View>
                {/* Nút Submit Order */}
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.buttonText}>Submit order</Text>
                </TouchableOpacity>

                {isShowPriceBottomSheet && (
                    <View style={{ position: 'absolute', bottom: 80, left: 0, right: 0, top: 0, justifyContent: 'flex-end', overflow: 'hidden' }}>
                        {/* background */}
                        <TouchableOpacity style={{ ...StyleSheet.absoluteFillObject }} onPress={closePriceBottomSheet} >
                            <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: backdropOpacity }} />
                        </TouchableOpacity>

                        {/* content */}
                        <Animated.View style={{ transform: [{ translateY: sheetTranslateY }], backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomWidth: 1, borderBottomColor: '#BBB' }}>
                            <BaseHeader
                                title="Price Detail"
                                showRightButton={true}
                                rightIcon={require('../../assets/bt_exit.png')}
                                onRightButtonPress={closePriceBottomSheet}
                            />

                            <View style={{ height: 1, backgroundColor: '#BBB' }} />

                            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                    Cart
                                </Text>

                                <FlatList
                                    data={carts.filter(item => item.isSelected)}
                                    keyExtractor={item => item._id}
                                    horizontal
                                    style={{ marginTop: 5 }}
                                    renderItem={({ item }) => (
                                        <View style={{ alignItems: 'center', marginRight: 5 }}>
                                            <Image source={{ uri: item.color.imageColor }} style={{ width: 60, height: 60 }} resizeMode="cover" />

                                            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#737337' }}>
                                                {SupportFunctions.convertPrice(item.price)} {' '}
                                                <Text style={{ color: '#FA7806', fontSize: 8, fontWeight: 'bold' }}>
                                                    x{item.quantity}
                                                </Text>
                                            </Text>
                                        </View>
                                    )}
                                />

                                <View style={{ height: 1, backgroundColor: '#BBB', marginTop: 5 }} />

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                        Item (s) total:
                                    </Text>

                                    <Text style={{ fontSize: 12, fontWeight: 'bold', textDecorationLine: 'line-through', color: '#737373' }}>
                                        {/* price of cart item selected */}
                                        {SupportFunctions.convertPrice(getFinalPriceOfSelectedItems())}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                        Item (s) discount:
                                    </Text>

                                    <Text style={{ fontSize: 12, fontWeight: 'bold', textDecorationLine: 'line-through', color: '#FA7806' }}>
                                        {/* price of cart item selected */}
                                        0đ
                                    </Text>
                                </View>

                                <View style={{ height: 1, backgroundColor: '#BBB', marginTop: 5 }} />

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                        Total:
                                    </Text>

                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                        {/* price of cart item selected */}
                                        {SupportFunctions.convertPrice(getFinalPriceOfSelectedItems())}
                                    </Text>
                                </View>

                            </View>
                        </Animated.View>

                    </View>
                )}
            </View>

            {isShowAdressSheet && (
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, justifyContent: 'flex-end', overflow: 'hidden' }}>
                    {/* background */}
                    <TouchableOpacity style={{ ...StyleSheet.absoluteFillObject }} onPress={closeAdressSheet} >
                        <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: backdropOpacity }} />
                    </TouchableOpacity>

                    {/* content */}
                    <Animated.View style={{ transform: [{ translateY: sheetTranslateY }], backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomWidth: 1, borderBottomColor: '#BBB' }}>
                        <BaseHeader
                            title="Addresses"
                            showRightButton={true}
                            rightIcon={require('../../assets/bt_exit.png')}
                            onRightButtonPress={closeAdressSheet}
                        />

                        <View style={{ backgroundColor: "#F5F5F5", maxHeight: 500, borderTopColor: '#BBBBBB', borderTopWidth: 0.5 }}>
                            <FlatList
                                data={personalInfo.information}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <View style={{ backgroundColor: "#fff", padding: 15, marginBottom: 15 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Text style={{ color: '#000', fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
                                            <Text style={{ color: "#737373", fontWeight: "bold", fontSize: 14, marginLeft: 10 }}>{item.phone}</Text>
                                        </View>

                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <View style={{ flex: 1, marginRight: 10 }}>
                                                <Text
                                                    style={{ color: '#000', fontWeight: 'bold', fontSize: 13, marginTop: 5 }}
                                                    ellipsizeMode="tail"  // Hiển thị dấu ba chấm nếu text bị cắt
                                                >
                                                    {item.address}
                                                </Text>
                                            </View>
                                            <View>
                                                {item._id === selectedAddress._id ? (
                                                    <Image style={{ width: 25, height: 25 }} source={require('../../assets/icons/ic_orangeCheck.png')} resizeMode="cover" />
                                                ) : (
                                                    <TouchableOpacity
                                                        onPress={() => setSelectedAddress(item)}
                                                        style={{ backgroundColor: "#ff7f00", paddingVertical: 8, paddingHorizontal: 18, alignItems: "center", borderRadius: 30 }}
                                                    >
                                                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>
                                                            Use
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        </View>



                                        <View style={{ marginTop: 15, borderTopColor: '#BBBBBB', borderTopWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            {item._id === defaultAddress._id ? (
                                                <TouchableOpacity style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                                                    <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: "#000", alignItems: "center", justifyContent: "center" }}>
                                                        <View
                                                            style={{
                                                                width: 9,
                                                                height: 9,
                                                                borderRadius: 5,
                                                                backgroundColor: "#000",
                                                            }}
                                                        />
                                                    </View>
                                                    <Text style={{ marginLeft: 8, color: "#737373", fontWeight: 'bold' }}>Default</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity
                                                    style={{
                                                        marginTop: 10,
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                    }}
                                                    onPress={() => setDefaultAddress(item)}
                                                >
                                                    <View
                                                        style={{
                                                            width: 18,
                                                            height: 18,
                                                            borderRadius: 9,
                                                            borderWidth: 2,
                                                            borderColor: "#000",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    />
                                                    <Text style={{ marginLeft: 8, color: "#737373", fontWeight: 'bold' }}>Set as default</Text>
                                                </TouchableOpacity>
                                            )}

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    marginTop: 12,
                                                }}
                                            >
                                                <TouchableOpacity>
                                                    <Text style={{ marginRight: 5, color: "#737373", fontWeight: 'bold' }}>Delete</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => navigation.navigate('AddAddress', { isFromCheckout: true, info: item })}>
                                                    <Text style={{ marginLeft: 5, color: "#737373", fontWeight: 'bold' }}>Edit</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />

                            <View style={{ width: '100%', backgroundColor: '#fff', padding: 15, borderTopColor: '#BBBBBB', borderTopWidth: 0.5 }}>
                                <TouchableOpacity style={{ backgroundColor: "#ff7f00", padding: 12, borderRadius: 40, alignItems: "center" }} onPress={() => navigation.navigate('AddAddress', { isFromCheckout: true })}>
                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                                        Add a new address
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Animated.View>
                </View>
            )}
        </View>
    )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative'
    },
    headerContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },

    arrowButton: {
        width: 20,
        height: 20
    },
    footerContainer: {
        position: 'static',
        width: "100%",
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 20,
    },
    priceContainer: {
        flexDirection: 'column',
    },
    realPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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