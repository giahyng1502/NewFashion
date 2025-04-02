import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BaseHeader from '../../components/BaseHeader'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import ProductCard from '../../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

const ProductFCateScreen = () => {
    const [title, setTitle] = useState("Category");
    const { products, loading, page, hasMore } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const loadMoreProducts = () => {
        if (!loading && hasMore) {
          dispatch(fetchProducts(page));
        }
      };

    const renderFooter = () => {
        if (!loading) return null;
        return (
          <View style={{ padding: 10 }}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        )
      }


    return (
        <View style={st.container}>
            <BaseHeader
                title={title}
                showLeftButton={true}
                onLeftButtonPress={() => navigation.goBack()}
            />

            <FlatList
            ListHeaderComponent={
                <>
                </>
            }
                data={products} // Danh sách sản phẩm chính
                keyExtractor={(item) => item._id}
                numColumns={2}
                renderItem={({ item }) => <ProductCard item={item} onSelected={() => { handleSelectedItem(item) }} />}
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                contentContainerStyle={{ paddingHorizontal: 3, backgroundColor: '#fff' }}
            />
        </View>
    )
}

export default ProductFCateScreen

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})