import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import BaseHeader from '../../components/BaseHeader';
import StarRating from '../../components/StarRating';
import { useSelector } from 'react-redux';
import SupportFunctions from '../../utils/SupportFunctions';

const LightningScreen = ({ navigation }) => {
    const { saleProducts } = useSelector(state => state.product);

    console.log('saleProducts', saleProducts);

    const getOriginalPrice = (item) => {
        return SupportFunctions.convertPrice(item.productId.price);
    }

    const getDiscountPrice = (item) => {
        return SupportFunctions.convertPrice(item.discount > 0 ? item.productId.price * (1 - item.discount / 100) : item.productId.price);
    }

    const handleSelectedItem = (item, discount, expire) => {
        console.log('Selected item:', item);
    
        navigation.navigate("ProductDetail", { item, discount, expire });
      }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <BaseHeader
                title='Ưu đãi chớp nhoáng'
                showLeftButton={true}
                onLeftButtonPress={() => navigation.goBack()}
            />

            <FlatList
                style={{ paddingHorizontal: 15 }}
                data={saleProducts}
                keyExtractor={(item, index) => `${item._id}${index} saleProduct in homeScreen`}
                renderItem={({ item }) => {
                    const sold = item.productId.sold;
                    const limit = item.limit || 100; // fallback nếu thiếu
                    const progress = Math.min(sold / limit, 1); // luôn <= 1

                    return (
                        <View style={{
                            flexDirection: "row",
                            paddingVertical: 10,
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#737373'
                        }}>
                            <Image
                                source={{ uri: item.productId.image[0] }}
                                style={{ width: 150, height: 150, borderRadius: 8 }}
                            />
                        
                            <View style={{
                                flex: 1,
                                marginLeft: 15,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}>
                                {/* Tên sản phẩm */}
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: '#000',
                                        marginBottom: 10
                                    }}
                                >
                                    {item.productId.name}
                                </Text>
                        
                                {/* Phần còn lại */}
                                <View style={{ justifyContent: 'flex-start' }}>
                                    {/* Giá đã giảm + phần trăm giảm */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                        <Text style={{
                                            color: '#737373',
                                            fontSize: 14,
                                            textDecorationLine: 'line-through',
                                            marginRight: 8
                                        }}>
                                            {getDiscountPrice(item)}
                                        </Text>
                                        <View style={{
                                            backgroundColor: '#FFF4C2',
                                            paddingHorizontal: 6,
                                            paddingVertical: 2,
                                            borderRadius: 4,
                                        }}>
                                            <Text style={{
                                                color: '#FA7806',
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>
                                                -{item.discount}%
                                            </Text>
                                        </View>
                                    </View>
                        
                                    {/* Giá gốc + Nút Mua ngay */}
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'flex-end',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{ flex: 1, marginRight: 10 }}>
                                            <Text style={{
                                                color: '#FA7806',
                                                fontSize: 18,
                                                fontWeight: 'bold',
                                                marginBottom: 8
                                            }}>
                                                {getOriginalPrice(item)}
                                            </Text>
                        
                                            {/* Thanh tiến trình + Còn lại */}
                                            <View style={{
                                                height: 16,
                                                backgroundColor: '#e0e0e0',
                                                borderRadius: 8,
                                                overflow: 'hidden',
                                                justifyContent: 'center',
                                                position: 'relative',
                                            }}>
                                                <View style={{
                                                    height: '100%',
                                                    width: `${progress * 100}%`,
                                                    backgroundColor: '#FA7806',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                }} />
                                                <Text style={{
                                                    color: '#fff',
                                                    fontSize: 12,
                                                    fontWeight: '500',
                                                    textAlign: 'center',
                                                    zIndex: 1,
                                                }}>
                                                    Còn lại {limit - sold} sản phẩm
                                                </Text>
                                            </View>
                                        </View>
                        
                                        <TouchableOpacity
                                            onPress={() => handleSelectedItem(item.productId, item.discount, item.expireAt)}
                                            style={{
                                                backgroundColor: '#FA7806',
                                                paddingHorizontal: 12,
                                                paddingVertical: 6,
                                                borderRadius: 6,
                                            }}
                                        >
                                            <Text style={{
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: 14
                                            }}>Mua ngay</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>                        
                    );
                }}
            />

        </View>
    )
}

export default LightningScreen