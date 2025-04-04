import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BaseHeader from '../../components/BaseHeader'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductBySubCategory } from '../../redux/actions/subCateActions';
import ProductCard from '../../components/ProductCard';

const SubCategoryDetail = ({ navigation, route }) => {
    const { subCategory } = route.params;
    const dispatch = useDispatch();
    const productsBySubCategory = useSelector(state => state.subCategory.productsBySubCategory);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductsBySubCate(subCategory._id);
    }, [])

    const fetchProductsBySubCate = (subCateId) => {
        if (productsBySubCategory[subCateId]) {
            const { products } = productsBySubCategory[subCateId];
            setProducts(products);
            setLoading(false);
        } else {
            setLoading(true);
            dispatch(fetchProductBySubCategory(subCateId))
                .then((result) => {
                    const { products } = result.payload;
                    setProducts(products);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Fetch products error: ', error);
                });
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FA7806" />
            </View>
        );
    }

    const handleSelectedItem = (item) => {
        navigation.navigate("ProductDetail", { item });
    }

    return (
        <View style={styles.container}>
            <BaseHeader
                title={subCategory.subCateName}
                showLeftButton={true}
                onLeftButtonPress={() => navigation.goBack()}
            />

            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 / 2, padding: 5 }}>
                        <ProductCard
                            item={item}
                            onSelected={() => { handleSelectedItem(item) }}
                        />
                    </View>
                )}
                numColumns={2}
                keyExtractor={(item,index) =>`${item._id}${index} product in subcategoryDetai`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 3, backgroundColor: '#fff' }}
            />
        </View>

    )
}

export default SubCategoryDetail

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})