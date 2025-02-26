import { Animated, FlatList, Image, Pressable, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BaseHeader from '../../components/BaseHeader'
import { products } from '../Home/HomeScreen'
import FilledButton from '../../components/FilledButton'
import ScreenSize from '../../contants/ScreenSize'
import OutlinedButton from '../../components/OutlinedButton'
import ProductCard from '../../components/ProductCard';
import AppManager from '../../utils/AppManager';

const DATA = [
  {
    id: '1',
    image: require("../../assets/image/ig_product1.png"),
    price: '268.443đ',
    quantity: 3,
    status: 'Almost sold out',
    size: 'M',
    color: 'Black',
    name: 'Embroidered Wool-blend Scarf Jacket',
    isSeleted: false
  },
  {
    id: '2',
    image: require("../../assets/image/ig_product1.png"),
    price: '199.999đ',
    quantity: 1,
    status: 'Limited stock',
    size: 'M',
    color: 'Black',
    name: 'Embroidered Wool-blend Scarf Jacket',
    isSeleted: false
  },
  {
    id: '3',
    image: require("../../assets/image/ig_product1.png"),
    price: '320.000đ',
    quantity: 2,
    status: 'Selling fast',
    size: 'M',
    color: 'Black',
    name: 'Embroidered Wool-blend Scarf Jacket',
    isSeleted: false
  }
];

const color = [{ color: 'Black', image: require('../../assets/image/ig_product1.png') }, { color: 'White', image: require('../../assets/image/ig_product1.png') }, { color: 'Red', image: require('../../assets/image/ig_product1.png') }, { color: 'Blue', image: require('../../assets/image/ig_product1.png') }, { color: 'Green', image: require('../../assets/image/ig_product1.png') }, { color: 'Yellow', image: require('../../assets/image/ig_product1.png') }]
const size = ['S', 'M', 'L', 'XL', 'XXL']

const CartScreen = ({ navigation }) => {
  const [title, setTitle] = React.useState('Cart')
  const [showDeleteButton, setShowDeleteButton] = React.useState(false)
  const [isLogin, setIsLogin] = React.useState(true)
  const [cartItems, setCartItems] = React.useState(DATA)
  const categories = useSelector(state => state.category.categories);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const categoryFlatlistRef = useRef(null)
  const [isSelectedAll, setIsSelectedAll] = React.useState(false)
  const [checkOutTitleButton, setCheckOutTitleButton] = React.useState('Checkout')
  const [selectedCartItem, setSelectedCartItem] = React.useState(null)

  const [isShowPriceBottomSheet, setIsShowPriceBottomSheet] = React.useState(false)
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const bottomSheetHeight = 500

  const [isShowPickColorAndSizeBottomSheet, setIsShowPickColorAndSizeBottomSheet] = React.useState(false)
  const pickColorAndSizeBottomSheetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const pickColorAndSizeBottomSheetHeight = 1000

  React.useEffect(() => {
    setSelectedCategory(categories[0]);
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

  const openPickUpColorAndSizeBottomSheet = (item) => {
    setIsShowPickColorAndSizeBottomSheet(true);
    setSelectedCartItem(item);
    Animated.timing(pickColorAndSizeBottomSheetAnimatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  const closePickUpColorAndSizeBottomSheet = () => {
    Animated.timing(pickColorAndSizeBottomSheetAnimatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setIsShowPickColorAndSizeBottomSheet(false);
      setSelectedCartItem(null);
    });
  }

  const backdropOpacityOfPickColorAndSizeBottomSheet = pickColorAndSizeBottomSheetAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5]
  });

  const pickColorAndSizeBottomSheetTranslateY = pickColorAndSizeBottomSheetAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [pickColorAndSizeBottomSheetHeight, 0]
  });

  const toggleSelectItem = (id) => {
    setCartItems((prevCart) => {
      const index = prevCart.findIndex(item => item.id === id);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[index] = { ...updatedCart[index], isSeleted: !updatedCart[index].isSeleted };

        const selectedCartItems = updatedCart.filter(item => item.isSeleted);
        setTitle(selectedCartItems.length > 0 ? `Cart (${selectedCartItems.length})` : 'Cart');
        setCheckOutTitleButton(selectedCartItems.length > 0 ? `Checkout (${selectedCartItems.length})` : 'Checkout');
        setShowDeleteButton(selectedCartItems.length > 0);
        setIsSelectedAll(selectedCartItems.length === updatedCart.length);

        return updatedCart;
      }
      return prevCart;
    });
  };

  const handleDeleteItem = () => {
    setCartItems(cartItems.filter(item => !item.isSeleted));
    setTitle('Cart');
    setCheckOutTitleButton('Checkout');
    setShowDeleteButton(false);
  }

  const increaseQuantity = (id) => {
    setCartItems((prevCart) => {
      const index = prevCart.findIndex(item => item.id === id);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[index] = { ...updatedCart[index], quantity: updatedCart[index].quantity + 1 };
        return updatedCart;
      }
      return prevCart;
    });
  }

  const decreaseQuantity = (id) => {
    setCartItems((prevCart) => {
      const index = prevCart.findIndex(item => item.id === id);
      if (index !== -1) {
        const updatedCart = [...prevCart];

        if (updatedCart[index].quantity === 1) {
          updatedCart.splice(index, 1);
        } else {
          updatedCart[index] = { ...updatedCart[index], quantity: updatedCart[index].quantity - 1 };
        }

        const selectedCartItems = updatedCart.filter(item => item.isSeleted);
        setTitle(selectedCartItems.length > 0 ? `Cart (${selectedCartItems.length})` : 'Cart');
        setShowDeleteButton(selectedCartItems.length > 0);

        return updatedCart;
      }
      return prevCart;
    });
  };

  const selectedAll = () => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.map(item => ({ ...item, isSeleted: !isSelectedAll }));
      setTitle(isSelectedAll ? 'Cart' : `Cart (${updatedCart.length})`);
      setCheckOutTitleButton(isSelectedAll ? 'Checkout' : `Checkout (${updatedCart.length})`);
      setShowDeleteButton(!isSelectedAll);
      setIsSelectedAll(!isSelectedAll);
      setIsShowPriceBottomSheet(false);
      return updatedCart;
    });
  }

  const handleCheckOut = () => {
    if (AppManager.isUserLoggedIn()) {
      navigation.navigate('CheckOut');
    } else {
      navigation.navigate('Login');
    }
  }

  return (
    <View style={st.container}>
      {/* Header */}
      <BaseHeader
        title={title}
        showLeftButton={true}
        onLeftButtonPress={() => navigation.goBack()}
        showRightButton={showDeleteButton}
        rightIcon={require("../../assets/bt_delete.png")}
        onRightButtonPress={handleDeleteItem}
      />

      {/* benefit */}
      <View style={{ borderWidth: 1, borderColor: '#737337', borderRadius: 5, marginHorizontal: 20, marginTop: 10, flexDirection: 'row', padding: 10, alignItems: 'center', gap: 10 }}>
        <Image
          source={isLogin ? require("../../assets/icons/ic_greenCheckSolid.png") : require("../../assets/icons/ic_truck.png")}
          style={{ width: 20, aspectRatio: 1 }}
          resizeMode="contain"
        />

        <Text style={{ fontSize: 12, fontWeight: 'bold', color: isLogin ? '#078809' : 'black', flex: 1 }} >
          FREE SHIPPING and free returns
        </Text>

        {isLogin && (
          <Text style={{ fontSize: 10, fontWeight: 'semibold', color: '555' }} >
            Exclusive offer
          </Text>
        )}
      </View>

      {/* Flat list với header chứa flat list cart items, data là phần sản phẩm của cửa hàng */}
      <FlatList
        ListHeaderComponent={() => (
          <>
            {/* empty view */}
            {(!isLogin || cartItems.length === 0) && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, paddingVertical: 20 }}>
                <Image
                  source={require("../../assets/icons/ic_emptyCart.png")}
                  style={{ width: 50, aspectRatio: 1 }}
                  resizeMode="contain"
                />

                <View>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                    Your shopping cart is empty
                  </Text>

                  <Text style={{ fontSize: 12, color: '#737337' }}>
                    Add your favorite items in it.
                  </Text>
                </View>
              </View>
            )}

            {/* cart items */}
            {isLogin && cartItems.length > 0 && (
              <FlatList
                data={cartItems}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                      <Pressable style={{ width: 30 }} onPress={() => { toggleSelectItem(item.id) }}>
                        <Image
                          source={item.isSeleted ? require("../../assets/icons/ic_blackCheckedSolid.png") : require("../../assets/icons/ic_unchecked.png")}
                          style={{ width: '100%' }}
                          resizeMode="contain"
                        />
                      </Pressable>

                      <Image source={item.image} style={{ width: 100, height: 100, borderWidth: 1, borderColor: '#73737350', borderRadius: 10 }} resizeMode="contain" />

                      <View style={{ flex: 1, height: 100, justifyContent: 'space-between' }}>
                        <View>
                          <Text style={{ fontSize: 14, fontWeight: 'bold' }} numberOfLines={1}>
                            {item.name}
                          </Text>

                          <TouchableOpacity onPress={() => { openPickUpColorAndSizeBottomSheet(item) }} style={{ backgroundColor: '#eee', padding: 5, borderRadius: 5, alignSelf: 'flex-start', marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: '#737337' }}>
                              {item.size}, {item.color}
                            </Text>

                            <Image source={require("../../assets/icons/ic_arrowUp.png")} style={{ width: 15, height: 15, transform: [{ rotate: '180deg' }] }} resizeMode="contain" />
                          </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FA7806' }}>
                            {item.price} {' '}
                            <Text style={{ marginLeft: 5, fontSize: 10, fontWeight: 'medium', color: '#737373', textDecorationLine: 'line-through' }}>
                              300.444đ
                            </Text>
                          </Text>

                          <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#73733760', paddingHorizontal: 5 }}>
                            <TouchableOpacity style={{ width: 10 }} onPress={() => decreaseQuantity(item.id)}>
                              <Image
                                source={require("../../assets/icons/ic_minus.png")}
                                style={{ width: '100%' }}
                                resizeMode="contain"
                              />
                            </TouchableOpacity>
                            <View style={{ height: '100%', borderColor: '#73733760', borderLeftWidth: 1, borderRightWidth: 1, paddingHorizontal: 10, marginHorizontal: 5 }}>
                              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                {item.quantity}
                              </Text>
                            </View>
                            <TouchableOpacity style={{ width: 10 }} onPress={() => increaseQuantity(item.id)}>
                              <Image
                                source={require("../../assets/icons/ic_plus.png")}
                                style={{ width: '100%' }}
                                resizeMode="contain"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>

                    <Text style={{ marginLeft: 150, fontSize: 10, color: '#FA7806', marginTop: 5, fontStyle: 'italic', fontWeight: 'bold' }}>
                      Big sale {' '}
                      <Text style={{ fontStyle: 'normal' }}>|</Text>
                      {' '} Limited time
                    </Text>

                    <View style={{ height: 1, backgroundColor: '#73737360', marginTop: 10 }} />
                  </View>
                )}
              />
            )}

            {/* button sign in/register */}
            {!isLogin && (
              <>
                <FilledButton title={'Sign in / Register'} onPress={() => navigation.navigate('Login')} customStyle={{ backgroundColor: '#FA7806', width: ScreenSize.width - 100, alignSelf: 'center' }} />
                <OutlinedButton title={'Start shopping'} onPress={() => navigation.goBack()} customStyle={{ width: ScreenSize.width - 100, alignSelf: 'center', marginTop: 10 }} />
              </>
            )}

            {/* devide */}
            <View style={{ height: 6, backgroundColor: '#eee', width: '100%', marginTop: 20 }} />

            {/* category */}
            <FlatList
              data={categories}
              horizontal
              ref={categoryFlatlistRef}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 10, alignItems: 'center' }}
                  onPress={() => {
                    setSelectedCategory(item)
                    categoryFlatlistRef.current.scrollToIndex({ index: categories.indexOf(item), animated: true })
                  }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: selectedCategory === item ? 'black' : '#737337' }}>
                    {item.categoryName}
                  </Text>
                  {selectedCategory === item && <View style={{ width: '30%', height: 5, backgroundColor: 'black', marginTop: 5, borderRadius: 2.5 }} />}
                </TouchableOpacity>
              )}
            />
          </>
        )}
        data={products}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        style={{ marginTop: 5 }}
      />

      {/* check out container */}
      {/* {(isLogin || cartItems.length > 0) && ( */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
        {/* select all button */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ width: 30 }} onPress={() => selectedAll()}>
            <Image
              source={isSelectedAll ? require("../../assets/icons/ic_blackCheckedSolid.png") : require("../../assets/icons/ic_unchecked.png")}
              style={{ width: '100%' }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 5 }}>
            All
          </Text>
        </View>

        {/* total price and original price */}
        {cartItems.filter(item => item.isSeleted).length > 0 && (
          <TouchableOpacity onPress={toggleBottomSheet}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                266.444đ
              </Text>
              <Image source={require("../../assets/icons/ic_arrowUp.png")} style={{ width: 18, height: 18, marginLeft: 5 }} resizeMode="contain" />
            </View>
            <Text style={{ fontSize: 12, color: '#737337', textDecorationLine: 'line-through' }}>
              300.444đ
            </Text>
          </TouchableOpacity>
        )}

        {/* check out button */}
        <FilledButton title={checkOutTitleButton} onPress={() => handleCheckOut()} customStyle={{ backgroundColor: '#FA7806', width: ScreenSize.width / 3 }} />
      </View>

      {/* )} */}

      {/* price bottom sheet */}
      {isShowPriceBottomSheet && (
        <View style={{ position: 'absolute', bottom: 60, left: 0, right: 0, top: 0, justifyContent: 'flex-end', overflow: 'hidden' }}>
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
                {title}
              </Text>

              <FlatList
                data={cartItems.filter(item => item.isSeleted)}
                keyExtractor={item => item.id}
                horizontal
                style={{ marginTop: 5 }}
                renderItem={({ item }) => (
                  <View style={{ alignItems: 'center', marginRight: 5 }}>
                    <Image source={item.image} style={{ width: 60, height: 60 }} resizeMode="contain" />

                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#737337' }}>
                      {item.price} {' '}
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
                  333.333đ
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  Item (s) discount:
                </Text>

                <Text style={{ fontSize: 12, fontWeight: 'bold', textDecorationLine: 'line-through', color: '#FA7806' }}>
                  {/* price of cart item selected */}
                  -333.333đ
                </Text>
              </View>

              <View style={{ height: 1, backgroundColor: '#BBB', marginTop: 5 }} />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  Total:
                </Text>

                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                  {/* price of cart item selected */}
                  333.333đ
                </Text>
              </View>

            </View>
          </Animated.View>

        </View>
      )}

      {/* pick color and size bottom sheet */}
      {(isShowPickColorAndSizeBottomSheet && selectedCartItem) && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, justifyContent: 'flex-end' }}>
          {/* background */}
          <TouchableOpacity style={{ ...StyleSheet.absoluteFillObject }} onPress={closePickUpColorAndSizeBottomSheet} >
            <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: backdropOpacityOfPickColorAndSizeBottomSheet }} />
          </TouchableOpacity>

          {/* content */}
          <Animated.View style={{ transform: [{ translateY: pickColorAndSizeBottomSheetTranslateY }], backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <View style={{ flexDirection: 'row', padding: 20 }}>
              <TouchableOpacity style={{ width: 150 }} onPress={() => navigation.navigate('ImagePreview', {images: selectedCartItem.image})}>
                <Image source={selectedCartItem.image} style={{ width: 150, height: 150 }} resizeMode="contain" />

                <Image source={require('../../assets/icons/ic_zoom.png')} style={{ width: 20, height: 20, position: 'absolute', top: 5, right: 5 }} />
              </TouchableOpacity>

              <View style={{ flex: 1, marginLeft: 20, justifyContent: 'flex-end' }}>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FA7806' }}>
                    {selectedCartItem.price} {' '}
                    <Text style={{ marginLeft: 5, fontSize: 10, fontWeight: 'medium', color: '#737373', textDecorationLine: 'line-through' }}>
                      300.444đ
                    </Text>
                  </Text>

                  <Text style={{ fontSize: 14, color: '#737373' }}>
                    Quantity: {selectedCartItem.quantity}
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={closePickUpColorAndSizeBottomSheet}>
              <Image source={require('../../assets/bt_exit.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <View style={{ height: 1, backgroundColor: '#73737350', marginTop: 10 }} />

            <ScrollView>
              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 14 }}>
                  Color
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                  {color.map((item) => (
                    <TouchableOpacity style={{ padding: 5, backgroundColor: '#eee', flexDirection: 'row', alignItems: 'center', gap: 5, marginRight: 10, marginBottom: 10 }}>
                      <Image source={item.image} style={{ width: 30, height: 30 }} resizeMode="contain" />
                      <Text style={{ fontSize: 12, color: '#737337' }}>
                        {item.color}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={{ height: 1, backgroundColor: '#73737350', marginTop: 10 }} />

              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 14 }}>
                  Size
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                  {size.map((size) => (
                    <TouchableOpacity style={{ padding: 5, backgroundColor: '#eee', flexDirection: 'row', alignItems: 'center', gap: 5, marginRight: 10, marginBottom: 10 }}>
                      <Text style={{ fontSize: 12, color: '#737337' }}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={{ height: 1, backgroundColor: '#73737350', marginTop: 10 }} />

              <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14 }}>
                  Quantity
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#73733760', paddingHorizontal: 5 }}>
                  <TouchableOpacity style={{ width: 20 }} onPress={() => decreaseQuantity(item.id)}>
                    <Image
                      source={require("../../assets/icons/ic_minus.png")}
                      style={{ width: '100%' }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View style={{ height: '100%', borderColor: '#73733760', borderLeftWidth: 1, borderRightWidth: 1, padding: 10, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                      {selectedCartItem.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity style={{ width: 20 }} onPress={() => increaseQuantity(item.id)}>
                    <Image
                      source={require("../../assets/icons/ic_plus.png")}
                      style={{ width: '100%' }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>

              </View>

            </ScrollView>

            <FilledButton title={'Confirm'} customStyle={{width: ScreenSize.width - 40, backgroundColor: '#FA7806', alignSelf: 'center', marginBottom: 20}} />

          </Animated.View>

        </View>
      )}
    </View>
  )
}

export default CartScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})