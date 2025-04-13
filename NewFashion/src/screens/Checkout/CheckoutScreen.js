import {
    StyleSheet,
    Alert,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    FlatList,
    ActivityIndicator,
    TextInput,
    Linking
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BuyerDetail from './BuyerDetail'
import PaymentAnhCoupon from './PaymentAndCoupon'
import SubInfor from './SubInfor'
import SupportFunctions from '../../utils/SupportFunctions';
import BaseHeader from '../../components/BaseHeader'
import { deleteInformation, updateDefaultInformation } from '../../redux/actions/infomationActions'
import { fetchCoupon } from '../../redux/actions/voucherAction'
import {cancelOrder, createOrder} from '../../redux/actions/orderActions'
import { fetchCart } from '../../redux/actions/cartActions'
import axios from "../../service/axios";
import {useSocket} from "../../context/socketContext";
import generatePaymentCode from "../../until/genaratePaymentCode";
import {createPayment} from "../../redux/actions/paymentAction";

const CheckoutScreen = ({ navigation }) => {
    const { carts } = useSelector(state => state.cart);
    const { personalInfo } = useSelector(state => state.personalInfo);
    const { coupons } = useSelector(state => state.coupons);
    const [addresses, setAddresses] = useState(null)

    const [isShowPriceBottomSheet, setIsShowPriceBottomSheet] = useState(false)
    const animatedValue = useRef(new Animated.Value(0)).current;
    const bottomSheetHeight = 500
    const [isShowAdressSheet, setIsShowAdressSheet] = useState(false)
    const [isShowCouponSheet, setIsShowCouponSheet] = useState(false)
    const dispatch = useDispatch()

    const [defaultAddress, setDefaultAddress] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingCoupon, setIsLoadingCoupon] = useState(true)
    const [isLoadingAddress, setIsLoadingAddress] = useState(true)
    const [isLoadingCart, setIsLoadingCart] = useState(true)
    const [isEnabled, setIsEnabled] = useState(false);
    const [payment, setOnPayment] = useState('direct');
    const socket = useSocket();
    const [newCart, setNewCart] = useState({
        finalTotal : carts.total,
        maxDiscount : 0,
        total : carts.total,
    });
    const momoReturn = useRef(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    useEffect(() => {
        console.log(carts)
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(fetchCoupon()).unwrap().finally(() => setIsLoadingCoupon(false)),
                    dispatch(fetchCart()).unwrap().finally(() => setIsLoadingCart(false))
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    useEffect(() => {
        if (socket) {
            socket.on('payment', (resultCode) => {
                console.log(resultCode)
            })
        }
    }, []);
    useEffect(() => {
        // console.log('personalInfo:', personalInfo);

        if (personalInfo && personalInfo.information) {
            setDefaultAddress(getDefaultInformation());
            setSelectedAddress(getDefaultInformation());
            setIsLoadingAddress(false);
            setAddresses(personalInfo.information)
        } else {
            console.log('No personalInfo data or empty information array');
        }
    }, [personalInfo]);

    useEffect(() => {
        if (!isLoadingCoupon && !isLoadingCart && !isLoadingAddress) {
            setIsLoading(false);
        }
    }, [isLoadingCoupon, isLoadingCart, isLoadingAddress]);

    function formatDate(isoString) {
        const date = new Date(isoString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0 nên +1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const handleMoMoPayment = async (orderData) => {
        try {
            const response = await createPayment({
                priceProduct: orderData.totalPrice,
                rawOrderId: generatePaymentCode(),
                idOrder: orderData._id,
            });

            if (response && response.resultCode === 0) {
                momoReturn.current = response;
                Linking.openURL(momoReturn.current.payUrl);
            } else {
                Alert.alert('Thông báo', 'Không thể thanh toán bằng hình thức momo lúc này');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi tạo thanh toán MoMo');
        }
    };
    
    useEffect(() => {
        console.log("🟢 isProcessingPayment:", isProcessingPayment);
    }, [isProcessingPayment]);
    const createAnOrder = async () => {
        try {
            setIsLoading(true);
            const [response] = await Promise.all([dispatch(createOrder({
                name: selectedAddress.name,
                phoneNumber: selectedAddress.phoneNumber,
                address: selectedAddress.address,
                voucherId: selectedCoupon ? selectedCoupon._id : null,
                momo: payment,
                point: isEnabled ? personalInfo.point : 0
            }))]);

            const isSuccess = response && response.meta?.requestStatus === "fulfilled";
            const orderData = response?.payload;

            if (isSuccess && orderData) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Cart' }],
                })
                if (payment === "direct") {
                    navigation.replace('OrderDone');
                } else if (payment === "momo") {
                    setIsProcessingPayment(true);
                    await handleMoMoPayment(orderData);
                }
            } else {
                Alert.alert('Thông báo', response?.payload?.message || 'Tạo đơn hàng thất bại');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi tạo đơn hàng');
        } finally {
            setIsLoading(false);
        }
    };




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

    //mở sheet coupon
    const toggleCouponSheet = () => {
        if (!isShowCouponSheet) {
            openCouponSheet()
        } else {
            closeCouponSheet()
        }
    }

    const openCouponSheet = () => {
        setIsShowCouponSheet(true);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    const closeCouponSheet = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            setIsShowCouponSheet(false);
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

    const getDefaultInformation = () => {
        const defaultInformation = personalInfo.information.filter(infor => infor.isDefault);

        if (defaultInformation.length === 0) {
            return personalInfo.information[0];
        } else {
            return defaultInformation[0];
        }
    }

    const handleDeleteItem = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this address?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        const updateAddress = addresses.filter(item => item._id != id);
                        setAddresses(updateAddress);

                        // Gửi yêu cầu xóa lên server với các sản phẩm được chọn
                        dispatch(deleteInformation(id))
                            .then((result) => {
                                console.log(result);
                            })
                            .catch((error) => {
                                console.error("Error deleting address:", error);
                            });
                    },
                },
            ],
            { cancelable: true }
        );
    };
    const handleCancel = () => {
        if (!momoReturn.current.orderId) {
            Alert.alert('Thông báo','Không tìm thấy đơn hàng',[
                {
                    text: "Trở về",
                    style: "destructive",
                    onPress: () => {
                        navigation.replace('Main')
                    }
                }
            ])
        }
        Alert.alert(
            "Xác nhận hủy đơn hàng",
            "Bạn có chắc chắn muốn hủy đơn hàng này không",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Đồng ý",
                    style: "destructive",
                    onPress: () => {


                        // Gửi yêu cầu xóa lên server với các sản phẩm được chọn
                        dispatch(cancelOrder(momoReturn.current.orderId))
                            .then((result) => {
                                navigation.replace('Main')
                            })
                            .catch((error) => {
                                console.error("Error cancel order:", error);
                            });
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleDefaultAddress = (item) => {
        setDefaultAddress(item)

        dispatch(updateDefaultInformation(item._id))
    }

    const handleSelectedCoupon = (item) => {
        if (selectedCoupon === item) {
            setSelectedCoupon(null);
            handleSelectVoucher(null); // Bỏ chọn
          } else {
            setSelectedCoupon(item);
            handleSelectVoucher(item); // Dùng item trực tiếp, không dùng selectedCoupon
          }
    };

    const applyVoucherToCart = (voucher) => {
        if (!voucher || !carts || !carts.total) return;

        const discountPercent = voucher.discount || 0;
        const maxDiscountPrice = voucher.maxDiscountPrice || 0;

        const discount = (carts.total * discountPercent) / 100;
        const maxDiscount = Math.min(discount, maxDiscountPrice);

        const finalTotal = Math.max(0, carts.total - maxDiscount); // Không cho âm

        setNewCart(prevCart => ({
            ...prevCart,
            finalTotal,
            maxDiscount
        }));
    };


    const handleSelectVoucher = (voucher) => {
        if (voucher) {
            applyVoucherToCart(voucher); // tự setNewCart bên trong hàm này
            setSelectedCoupon(voucher);
          } else {
            setNewCart(carts); // reset lại nếu không có voucher
            setSelectedCoupon(null);
          }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FA7806" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* header */}
            <BaseHeader title="Checkout" showLeftButton={true} onLeftButtonPress={() => { navigation.goBack() }} />

            {/* body */}
            <ScrollView>
                <BuyerDetail products={carts.products} onClickShowPopup={[toggleAdressSheet, toggleBottomSheet]} information={selectedAddress} />
                <PaymentAnhCoupon onPayment={setOnPayment} newCart={newCart} personalInfo={personalInfo} onSwitch={setIsEnabled} onClickShowPopup={toggleCouponSheet} />
                <SubInfor />
            </ScrollView>

            {/* footer */}
            <View style={styles.footerContainer}>
                {/* Phần tổng tiền */}
                {isProcessingPayment ? (
                    <View style={{flexDirection : 'row',gap : 10,justifyContent:'space-between'}}>
                        <TouchableOpacity style={[styles.submitButton,{backgroundColor : 'gray',flex : 1}]} onPress={()=>{
                            handleCancel()
                        }}>
                            <Text style={styles.buttonText}>Hủy đơn hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.submitButton,{backgroundColor : '#ff6600',flex : 1}]} onPress={() => {
                            Linking.openURL(momoReturn.current.payUrl)
                        }}>
                            <Text style={styles.buttonText}>Thanh toán</Text>
                        </TouchableOpacity>

                    </View>
                ):(
                <>
                    <View style={styles.priceContainer}>
                        <View style={styles.realPriceContainer}>
                            <Text style={styles.totalPrice}>{SupportFunctions.convertPrice((
                                (isEnabled ? newCart.finalTotal - personalInfo.point : newCart.finalTotal)
                            ))}</Text>
                            <TouchableOpacity onPress={toggleBottomSheet}>
                                <Image source={require('../../assets/icons/ic_arrowUp.png')} resizeMode='cover' style={styles.arrowButton} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.savedAmount}>Saved {SupportFunctions.convertPrice(newCart.maxDiscount + (isEnabled ? personalInfo.point : 0))}</Text>
                    </View>
                    {/* Nút Submit Order */}
                    <TouchableOpacity style={[styles.submitButton,{backgroundColor : '#ff6600',}]} onPress={() => createAnOrder()}>
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
                                        data={carts.products.filter(item => item.isSelected)}
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
                                            {SupportFunctions.convertPrice(newCart.total)}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                            Item (s) discount:
                                        </Text>

                                        <Text style={{ fontSize: 12, fontWeight: 'bold', textDecorationLine: 'line-through', color: '#FA7806' }}>
                                            {/* price of cart item selected */}
                                            {SupportFunctions.convertPrice(newCart.maxDiscount)}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                            Points:
                                        </Text>

                                        <Text style={{ fontSize: 12, fontWeight: 'bold', textDecorationLine: 'line-through', color: '#FA7806' }}>
                                            {/* price of cart item selected */}
                                            {SupportFunctions.convertPrice(isEnabled ? personalInfo.point : 0)}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                            Subtotal:
                                        </Text>

                                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FA7806' }}>
                                            {/* price of cart item selected */}
                                            {SupportFunctions.convertPrice(Math.max(0,newCart.finalTotal - personalInfo.point))}
                                        </Text>
                                    </View>

                                    <View style={{ height: 1, backgroundColor: '#BBB', marginTop: 5 }} />

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                            Total:
                                        </Text>

                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                            {/* price of cart item selected */}
                                            {SupportFunctions.convertPrice(newCart.finalTotal)}
                                        </Text>
                                    </View>

                                </View>
                            </Animated.View>

                        </View>
                    )}
                </>
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
                                            <Text style={{ color: "#737373", fontWeight: "bold", fontSize: 14, marginLeft: 10 }}>0{item.phoneNumber}</Text>
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
                                                    onPress={() => handleDefaultAddress(item)}
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
                                                {item._id === defaultAddress._id ? (
                                                    <View></View>
                                                ) : (
                                                    <TouchableOpacity onPress={() => handleDeleteItem(item._id)}>
                                                        <Text style={{ marginRight: 5, color: "#737373", fontWeight: 'bold' }}>Delete</Text>
                                                    </TouchableOpacity>
                                                )}
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

            {isShowCouponSheet && (
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, justifyContent: 'flex-end', overflow: 'hidden' }}>
                    {/* background */}
                    <TouchableOpacity style={{ ...StyleSheet.absoluteFillObject }} onPress={closeCouponSheet} >
                        <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: backdropOpacity }} />
                    </TouchableOpacity>

                    {/* content */}
                    <Animated.View style={{ transform: [{ translateY: sheetTranslateY }], backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomWidth: 1, borderBottomColor: '#BBB' }}>
                        <BaseHeader
                            title="Apply coupon"
                            showRightButton={true}
                            rightIcon={require('../../assets/bt_exit.png')}
                            onRightButtonPress={()=>{

                                    closeCouponSheet()

                                }
                            }
                        />

                        <View style={{ backgroundColor: "#FFF", maxHeight: 500, borderTopColor: '#BBBBBB', borderTopWidth: 0.5 }}>

                            {/* Ghi chú */}
                            <Text style={{ fontSize: 14, marginVertical: 10, marginHorizontal: 15, color: '#000', fontWeight: 'bold' }}>
                                Limit 1 coupon per purchase. Coupon cannot be applied to shipping fees.
                            </Text>

                            <View style={{ height: 400 }}>
                                {coupons.length === 0 ? (
                                    <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, justifyContent: 'center', marginBottom: 20, height: "100%" }}>
                                        <Image source={require("../../assets/icons/ic_nonvoucher.png")} style={{ width: 120, height: 120 }} />
                                        <Text style={{ fontWeight: "800", fontSize: 18, color: '#000' }}>It's empty</Text>
                                        <Text style={{ fontSize: 14, marginTop: 5, color: '#737373', fontWeight: 'bold' }}>There is no coupons here</Text>
                                    </View>
                                ) : (
                                    <FlatList
                                        data={coupons}
                                        keyExtractor={(item) => item._id}
                                        style={{ marginBottom: 5 }}
                                        renderItem={({ item }) => (
                                            <View style={{ borderTopWidth: 3, marginVertical: 10, marginHorizontal: 12, borderTopColor: '#FA7806', borderRadius: 2, backgroundColor: "#F0FFEB", height: 150, gap: 5 }}>
                                                <View style={{ backgroundColor: '#FA7806', width: 30, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }}>
                                                    <Text style={{ fontWeight: "bold", color: "#fff", textAlign: "center", fontSize: 10 }}>NEW</Text>
                                                </View>
                                                <View style={{ paddingHorizontal: 15 }}>
                                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                        <View style={{ width: 250 }}>
                                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.voucherName}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 12 }}>{item.voucherDetail}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 12, marginTop: 30 }}>
                                                                {formatDate(item.startDate)} - {formatDate(item.endDate)}
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            onPress={() => handleSelectedCoupon(item)}
                                                            style={{
                                                                backgroundColor: selectedCoupon === item ? '#aaa' : '#FA7806',
                                                                height: 25,
                                                                width: 54,
                                                                borderRadius: 15,
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
                                                                {selectedCoupon === item ? 'Cancel' : 'Use'}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                                        <Text style={{ color: "#737373", fontWeight: "bold", fontSize: 12 }}>For all items</Text>
                                                        <Text style={{ fontWeight: "bold" }}><Text style={{ color: "#737373", fontSize: 12 }}>Code: </Text>{item._id}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                    />
                                )}
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
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})