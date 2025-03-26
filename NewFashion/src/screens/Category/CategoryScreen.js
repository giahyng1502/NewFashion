import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, Animated, ActivityIndicator, Image, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategories } from '../../redux/actions/subCateActions';
import ScreenSize from '../../contants/ScreenSize';
import StarRating from '../../components/StarRating';
import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/ProductCard';

const CategoryScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const categories = useSelector(state => state.category.categories);
  const subCategoriesByCategory = useSelector(state => state.subCategory.subCategoriesByCategory);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const translateAnim = useRef(new Animated.Value(0)).current;

  const subCateColNum = 3
  const subCateColumnWidth = (ScreenSize.width * (3 / 4) / subCateColNum);
  const productColNum = 2
  const productColumnWidth = (ScreenSize.width * (3 / 4) / productColNum);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
      fetchSubCateByCategoryID(categories[0]._id);
    }
  }, [categories]);

  const fetchSubCateByCategoryID = (categoryId) => {
    if (subCategoriesByCategory[categoryId]) {
      const { products } = subCategoriesByCategory[categoryId];
      setProducts(products);
      setLoading(false);
    } else { 
      setLoading(true);
      dispatch(fetchSubCategories(categoryId))
        .then((result) => {
          const { products } = result.payload;
          console.log('Fetch subCategories success: ', products);
          
          setProducts(products);          
          setLoading(false);
        })
        .catch((error) => {
          console.log('Fetch subCategories error: ', error);
        });
    }
  };

  const handleCategoryPress = useCallback((category, index) => {
    const currentIndex = categories.indexOf(selectedCategory);
    const searchBarHeight = 60
    const height = ScreenSize.height - searchBarHeight;
    const slideDirection = index > currentIndex ? -height : height;

    Animated.timing(translateAnim, {
      toValue: slideDirection,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedCategory(category);
      fetchSubCateByCategoryID(category._id);
      translateAnim.setValue(0);
    });
  }, [selectedCategory, categories]);

  const renderCategoryItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        { width: '100%', padding: 10, paddingLeft: 0, backgroundColor: '#F0F0F0', flexDirection: 'row' },
        selectedCategory === item && { backgroundColor: '#fff' }]}
      onPress={() => handleCategoryPress(item, index)}>
      <View style={{ backgroundColor: selectedCategory === item ? 'black' : 'transparent', width: 5 }} />
      <Text
        style={[{ fontSize: 14, fontWeight: 'medium', marginLeft: 5 }, selectedCategory === item && { fontWeight: 'bold' }]}>
        {item.categoryName}
      </Text>
    </TouchableOpacity>
  );

  const renderSubCategoryItem = ({ item }) => (
    <TouchableOpacity style={{ alignItems: 'center', width: subCateColumnWidth, padding: 10 }} onPress={() => handleSelectedSubCategory(item)}>
      <Image source={{ uri: item.subImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />
      <Text style={{ fontSize: 12, textAlign: 'center' }}>{item.subCateName}</Text>
    </TouchableOpacity>
  );

  const handleSelectedItem = (item) => {
    navigation.navigate("ProductDetail", { item });
  }

  const handleSelectedSubCategory = (subCategory) => {
    navigation.navigate("SubCateDetail", { subCategory });
  }

  const ListHeaderComponent = () => {
    if (!selectedCategory) {
      return null;
    }

    const { subCategories } = subCategoriesByCategory[selectedCategory._id] || { subCategories: [] };

    return (
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <FlatList
              data={subCategories}
              renderItem={renderSubCategoryItem}
              numColumns={3}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Related products</Text>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.searchContainer}>
          <TextInput
            value={searchText}
            style={styles.searchInput}
            placeholder="Search something..."
            editable={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity style={styles.clearButton}
            // onPress={handleClearText}
            >
              <Image source={require('../../assets/bt_clearText.png')} style={styles.icon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.searchButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Image source={require('../../assets/icons/ic_search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#FFF', overflow: 'hidden' }}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />

        {selectedCategory && (
          <Animated.View style={{ flex: 3, transform: [{ translateY: translateAnim }] }}>
            <FlatList
              data={products}
              ListHeaderComponent={ListHeaderComponent}
              renderItem={({ item }) => <ProductCard item={item} onSelected={() => { handleSelectedItem(item) }} />}
              numColumns={2}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 40
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
  },
  clearButton: {
    padding: 5,
  },
  searchButton: {
    backgroundColor: '#000',
    margin: 3,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 40
  },
  searchIcon: {
    width: 25,
    height: 25
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 7,
    resizeMode: 'contain',
  }
})
