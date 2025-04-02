import { Image, Text, TouchableOpacity, View, FlatList, Animated, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import BaseHeader from '../../components/BaseHeader'
import SupportFunctions from '../../utils/SupportFunctions'


const OrderDetailScreen = ({navigation,route}) => {

    const orderStatus = [
        { id: 0, name: 'Processing' },
        { id: 1, name: 'Waiting to ship' },
        { id: 2, name: 'Shipping' },
        { id: 3, name: 'Delivered' },
        { id: 4, name: 'Canceled' }
      ];

    const {order}=route.params

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
    
    const [isShowStatusBottomSheet, setIsShowStatusBottomSheet] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const bottomSheetHeight = 500;


    //mở sheet chi tiết đơn hàng
        const toggleStatusBottomSheet = () => {
            if (!isShowStatusBottomSheet) {
                openStatusBottomSheet()
            } else {
                closeStatusBottomSheet()
            }
        }
    
        const openStatusBottomSheet = () => {
            setIsShowStatusBottomSheet(true);
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    
        const closeStatusBottomSheet = () => {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start(() => {
                setIsShowStatusBottomSheet(false);
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

    const handleReview = (status)=>{
        if(status<2){
          alert('You can only write a review after receiving the product.');
        }
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <BaseHeader
                title='Order Detail'
                showLeftButton={true}
                onLeftButtonPress={() => navigation.goBack()}
            />

            <FlatList
                data={order.item}
                keyExtractor={item => item._id}
                ListHeaderComponent={
                    <View>
                        <View style={{ padding: 15, borderTopWidth: 0.5, borderTopColor: '#BBBBBB',borderBottomWidth: 10, borderBottomColor: '#e7e7e7'}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>Order Code</Text>
                                <Text style={{ color: '#000', fontSize: 16 }}>{order.orderCode}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                                    <Image source={require('../../assets/icons/ic_truck.png')} style={{ width: 25, height: 25, marginEnd: 10 }} resizeMode='contain' />
                                    <View>
                                        <Text style={{ color: '#078809', fontSize: 16, fontWeight: 'bold' }}>{orderStatus[order.status].name}</Text>
                                        <Text style={{ color: '#000', fontSize: 14 }}>{formatDate(order.statusHistory[order.statusHistory.length - 1].timestamp)}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={toggleStatusBottomSheet}>
                                    <Image source={require('../../assets/ic_arrowRight.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Buyer Detail</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 15 }}>
                                <Image source={require('../../assets/icons/ic_Adress.png')} style={{ width: 25, height: 25, marginEnd: 10 }} resizeMode='contain' />
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontWeight: "bold", fontSize: 16 }}>{order.shippingAddress.name}</Text>
                                        <Text style={{ color: "#737373", fontSize: 14, marginLeft: 10 }}>+84 {order.shippingAddress.phoneNumber}</Text>
                                    </View>
                                    <Text style={{ color: '#737373', fontWeight: "bold", fontSize: 16, marginTop: 5 }} ellipsizeMode="tail">
                                        {order.shippingAddress.address}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18, marginTop: 15, marginLeft:20 ,marginBottom:5}}>All products</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Image source={{ uri: item.color.imageColor }} style={{ width: 100, height: 100, borderWidth: 1, borderColor: '#73737350', borderRadius: 10 }} resizeMode="cover" />

                            <View style={{ flex: 1, height: 100, justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }} numberOfLines={1}>
                                        {item.productName}
                                    </Text>
                                
                                    <Text style={{ fontSize: 12, color: '#737337' }}>
                                        {item.size}, {item.color.nameColor}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FA7806' }}>
                                        {item.price} x {item.quantity}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ height: 1, backgroundColor: '#73737360', marginTop: 10 }} />
                    </View>
                )}
                ListFooterComponent={
                    <View style={{padding: 20,paddingBottom:0}}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000' }}>Item(s) total:</Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold", textDecorationLine: 'line-through', color: '#737373' }}>
                                {SupportFunctions.convertPrice(order.totalPrice)}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000' }}>Item(s) discount:</Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000', color: '#D96923' }}>
                                {SupportFunctions.convertPrice(order.disCountSale)}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000' }}>Points:</Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000', color: '#D96923' }}>
                                {SupportFunctions.convertPrice(0)}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000' }}>Subtotal:</Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000' }}>
                                {SupportFunctions.convertPrice(order.totalPrice)}
                            </Text>
                        </View>

                        <View style={[{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }, { borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 15, borderColor: '#D7D7D7' }]}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000' }}>Shipping:</Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000', color: '#078809' }}>FREE</Text>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'column' }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000', fontSize: 20 }}>Order total:</Text>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000', fontSize: 20 }}>
                                {SupportFunctions.convertPrice(order.totalPrice)}
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: "row",justifyContent: "space-between",marginBottom: 10,borderTopWidth: 1, paddingVertical: 15, borderColor: '#D7D7D7' }}>
                            <Text style={{fontSize: 16,fontWeight: "bold",color: '#000'}}>Payment method:</Text>
                            <Text style={{fontSize: 16,fontWeight: "bold",color: '#737373' }}>Direct payment</Text>
                        </View>
                    </View>
                }
            />

            {isShowStatusBottomSheet && (
                    <View style={{ position: 'absolute', bottom: 80, left: 0, right: 0, top: 0, justifyContent: 'flex-end', overflow: 'hidden' }}>
                        {/* background */}
                        <TouchableOpacity style={{ ...StyleSheet.absoluteFillObject }} onPress={closeStatusBottomSheet} >
                            <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: backdropOpacity }} />
                        </TouchableOpacity>

                        {/* content */}
                        <Animated.View style={{ transform: [{ translateY: sheetTranslateY }], backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomWidth: 1, borderBottomColor: '#BBB' }}>
                            <BaseHeader
                                title="Order Status History"
                                showRightButton={true}
                                rightIcon={require('../../assets/bt_exit.png')}
                                onRightButtonPress={closeStatusBottomSheet}
                            />
                        <View>
                            <FlatList
                                data={order.statusHistory}
                                keyExtractor={item=>item._id}
                                renderItem={({item})=>(
                                    <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal: 15, borderBottomWidth: 1, marginBottom: 10, borderBottomColor:"#E7E7E7"}}>
                                        <View style={{flexDirection:"column",paddingBottom: 10}}>
                                        <Text style={{fontWeight:"bold",color:"#078809",paddingBottom: 10}}>{orderStatus[item.status].name}</Text>
                                        <Text style={{fontWeight:"bold"}}>Live Date: {formatDate(item.timestamp)}</Text>
                                        </View>
                                        <Text style={{fontWeight:"bold"}}>By: {item.updatedBy.name}</Text>
                                    </View>
                                )}
                            />
                        </View>


                            
                        </Animated.View>

                    </View>
                )}

            <View style={{ width: '100%', backgroundColor: '#fff', padding: 15, borderTopColor: '#BBBBBB', borderTopWidth: 0.5 }}>
                <TouchableOpacity style={{ backgroundColor: "#ff7f00", padding: 12, borderRadius: 40, alignItems: "center" }}
                    onPress={()=>handleReview(order.status)}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                        Write a review
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrderDetailScreen