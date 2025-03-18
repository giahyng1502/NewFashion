import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Animated, FlatList } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import { useSelector } from 'react-redux'
import BuyerDetail from './BuyerDetail'
import PaymentAnhCoupon from './PaymentAndCoupon'
import SubInfor from './SubInfor'
import SupportFunctions from '../../utils/SupportFunctions';
import BaseHeader from '../../components/BaseHeader'

const CheckoutScreen = ({ navigation }) => {
    const { carts } = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState(carts);

    const [isShowPriceBottomSheet, setIsShowPriceBottomSheet] = useState(false)
    const animatedValue = useRef(new Animated.Value(0)).current;
    const bottomSheetHeight = 500

    useEffect(() => {
        setCartItems(carts);
    }, []);

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

    const backdropOpacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5]
    });

    const sheetTranslateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [bottomSheetHeight, 0]
    });


    const getFinalPriceOfSelectedItems = () => {
        return cartItems
            .filter(item => item.isSelected)
            .reduce((total, item) => {
                const discountMultiplier = item.disCountSale > 0 ? (1 - item.disCountSale) : 1;
                const itemPrice = item.price * discountMultiplier * item.quantity;
                return total + itemPrice;
            }, 0);
    }

  return (
    <View style={styles.container}>
        {/* header */}
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={()=>navigation.replace('Cart')}>
                <Image source={require("../../assets/ic_arrowLeft.png")} style={styles.arrowButton} />
            </TouchableOpacity>
            <Text style={styles.totalPrice}>Checkout</Text>
            <Text />          
        </View>

        {/* body */}
        <ScrollView>
            <BuyerDetail products={cartItems}/>
            <PaymentAnhCoupon products={cartItems}/>
            <SubInfor />
        </ScrollView>

        {/* footer */}
        <View style={styles.footerContainer}>
            {/* Phần tổng tiền */}
            <View style={styles.priceContainer}>
                <View style={styles.realPriceContainer}>
                    <Text style={styles.totalPrice}>{SupportFunctions.convertPrice(getFinalPriceOfSelectedItems())}</Text>
                    <TouchableOpacity onPress={toggleBottomSheet}>
                        <Image source={require('../../assets/icons/ic_arrowUp.png')} resizeMode='cover' style={styles.arrowButton}/>
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
                                  data={cartItems.filter(item => item.isSelected)}
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