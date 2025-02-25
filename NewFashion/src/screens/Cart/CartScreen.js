import { FlatList, Image, Pressable, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BaseHeader from '../../components/BaseHeader'
import { products } from '../Home/HomeScreen'
import FilledButton from '../../components/FilledButton'
import ScreenSize from '../../contants/ScreenSize'
import OutlinedButton from '../../components/OutlinedButton'
import ProductCard from '../../components/ProductCard';

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
  const [isShowBottomSheet, setIsShowBottomSheet] = React.useState(false)

  React.useEffect(() => {
    setSelectedCategory(categories[0]);
  }, []);

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
      return updatedCart;
    });
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

                          <TouchableOpacity onPress={() => setIsShowBottomSheet(true)} style={{ backgroundColor: '#eee', padding: 5, borderRadius: 5, alignSelf: 'flex-start', marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
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
        <TouchableOpacity>
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

        {/* check out button */}
        <FilledButton title={checkOutTitleButton} onPress={() => navigation.navigate('CheckOut')} customStyle={{ backgroundColor: '#FA7806', width: ScreenSize.width / 3 }} />
      </View>

      {/* )} */}
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