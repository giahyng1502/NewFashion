import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ProductItem = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            {/* Hình ảnh sản phẩm */}
            <Image source={{ uri: item.color.imageColor }} style={styles.productImage} />

            {/* Label "Almost Sold Out" */}
            <View style={styles.badge}>
                <Text style={styles.badgeText}>ALMOST SOLD OUT</Text>
            </View>

            {/* Giá tiền và số lượng */}
            <Text style={styles.priceText}>{item.price} x{item.quantity}</Text>
        </View>
    );
};

const BuyerDetail = ({products,onClickShowPopup,information}) => {
    return (
        <View style={styles.container}>
            {/* Thông tin thanh toán */}
            <View style={styles.buyerContainer}>
                <TouchableOpacity onPress={onClickShowPopup[0]}>
                    {/* Địa chỉ giao hàng */}
                    <View style={styles.addressContainer}>
                        <View style={[styles.nameAndPhone, { margin: 0 }]}>
                            <Image source={require('../../assets/icons/ic_location.png')} style={[styles.icon, { alignSelf: 'flex-start', marginRight: 10 }]} />
                            <View>
                                <View style={styles.nameAndPhone}>
                                    <Text style={[styles.addressText, { marginRight: 10, fontSize: 18 }]}>{information.name}</Text>
                                    <Text style={styles.addressText}>{information.phoneNumber}</Text>
                                </View>
                                <Text style={[styles.addressText, { color: '#D96923', marginVertical: 5 }]}>{information.address}</Text>
                                <Text style={styles.addressText}>{information.address}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Image source={require('../../assets/ic_arrowRight.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>

                    {/* Dải phân cách dạng đường kẻ */}
                    <Image source={require('../../assets/ig_line.png')} resizeMode='cover' style={styles.line} />
                </TouchableOpacity>
            </View>

            {/* Thông tin sản phẩm */}
            <View style={styles.productContainer}>
                {/* Tiêu đề */}
                <View style={[styles.addressContainer,{paddingHorizontal:0,marginBottom:0,justifyContent:'space-between'}]}>
                    <Text style={[styles.addressText,{fontSize:16}]}>
                        Ships from New Fashion ({products.length})
                    </Text>
                    <TouchableOpacity onPress={onClickShowPopup[1]}>
                        <Image source={require('../../assets/ic_arrowRight.png')} style={styles.icon}/>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={products}
                    renderItem={({ item }) => <ProductItem item={item} />}
                    keyExtractor={(item) => item._id}
                    horizontal // Vuốt theo chiều ngang
                    showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
                    contentContainerStyle={styles.listContainer}
                />

                {/* Chân */}
                <View style={[styles.nameAndPhone,{marginBottom:0}]}>
                    <Text style={[styles.addressText,{fontSize:16,color:'#078809'}]}>
                        Standard shipping: FREE,
                    </Text>
                    <Text style={[styles.addressText,{marginHorizontal:5}]}>
                        delivery: 4-9 business days
                    </Text>
                    <TouchableOpacity>
                        <Image source={require('../../assets/ic_arrowRight.png')} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'column'
    },
    //địa chỉ người mua  
    buyerContainer: {
        backgroundColor: '#fafafa',
        paddingVertical: 20,
        width:'100%'
    },
    line:{
        width:'100%',
        height:5
    },
    addressContainer: {
        marginBottom: 20,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20
    },
    nameAndPhone:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5
    },
    addressText:{
        color:'#000',
        fontSize:14,
        fontWeight:'bold'
    },
    icon:{
        width:20,
        height:20
    },
    //thông tin sản phẩm
    productContainer:{
        padding:20,
        backgroundColor:'#fff'
    },
    listContainer: {
        marginVertical: 15,
    },
    itemContainer: {
        marginRight: 15,
        alignItems: 'center',
        position: 'relative'
    },
    productImage: {
        width: 100,
        height: 100,
    },
    badge: {
        position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 10,
        padding:5,
        alignSelf:'center',
        bottom:30,
        borderWidth:0.5,
        borderColor:'#fff'
    },
    badgeText: {
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 14,
        color: '#ff6600',
        fontWeight: 'bold',
        marginTop: 5,
        alignSelf:'flex-start'
    },
});

export default BuyerDetail;