import {  Text, View,ActivityIndicator,Image,TouchableOpacity,FlatList } from 'react-native'
import React from 'react'
import BaseHeader from '../../components/BaseHeader'
import { fetchProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard';

const OrderDoneScreen = ({navigation}) => {
    const { products, loading, page, hasMore } = useSelector(state => state.product);
    const dispatch = useDispatch();

    const loadMoreProducts = () => {
        if (!loading && hasMore) {
            dispatch(fetchProducts(page));
        }
    };

    const handleSelectedItem = (item) => {
        navigation.navigate("ProductDetail", { item });
    }

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={{ padding: 10 }}>
                <ActivityIndicator size="small" color="#FA7806" />
            </View>
        )
    }

  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
        <BaseHeader
            title=''
            showLeftButton={true}
            onLeftButtonPress={() => navigation.replace('Main')}
            showRightButton={true}
        />

        <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={() => (
                <>
                    <View style={{width:'100%',backgroundColor:'#fff',padding:20,alignItems:'center',borderTopColor: '#BBBBBB', borderTopWidth: 0.5}}>
                        <Image source={require('../../assets/icons/ic_greenCheck3.png')} style={{width:80,height:80,marginTop:20}}/>
                        <Text style={{color:'#000',fontSize:20,fontWeight:'bold',marginTop:20}}>Thank you for ordering!</Text>
                        <Text style={{color:'#737373',fontSize:14,marginTop:20,marginBottom:10}}>You will receive updates of the product in the mailbox to notification.</Text>
                        <TouchableOpacity style={{ backgroundColor: "#ff7f00", padding: 12, borderRadius: 40, alignItems: "center",width:'100%',margin:10 }}
                            onPress={()=>navigation.navigate('Your orders')}>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                                View order
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginVertical: 10 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#BBBBBB' }} />
                        <Text style={{ marginHorizontal: 10, fontWeight: 'semibold', fontSize: 14, color: '#000' }}>Maybe you will also like</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#BBBBBB' }} />
                    </View>
                </>
            )}
            renderItem={({ item }) => (
                <View style={{ flex: 1 / 2, padding: 5 }}>
                    <ProductCard
                        item={item}
                        onSelected={() => { handleSelectedItem(item) }}
                    />
                </View>
            )}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreProducts}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            style={{ marginTop: 5 }}
        />
    </View>
  )
}

export default OrderDoneScreen