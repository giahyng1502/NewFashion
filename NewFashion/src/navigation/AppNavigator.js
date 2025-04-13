import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterWithEmailScreen from '../screens/RegisterWithEmailScreen';
import LoginWithEmailScreen from '../screens/LoginWithEmailScreen';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ChatDetail from '../screens/Chatdetail/ChatDetail';
import CartScreen from '../screens/Cart/CartScreen';
import CommentScreen from '../screens/Post/CommentScreen';
import ImagePreview from '../screens/ImagePreview';
import SearchScreen from '../screens/SearchScreen';
import OrderScreen from '../screens/Order/OrderScreen';
import CheckoutScreen from '../screens/Checkout/CheckoutScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import CouponScreen from '../screens/Coupon/CouponScreen';
import SubCategoryDetail from '../screens/Category/SubCategoryDetail';
import SettingsScreen from '../screens/You/Settings/SettingsScreen';
import NotificationScreen from '../screens/Notification/notification-screen';
import LightningScreen from '../screens/Lightning/LightningScreen';
import AddressesScreen from '../screens/Adresses/AdressesScreen';
import OrderDoneScreen from '../screens/Order/OrderDoneScreen';
import OrderDetailScreen from '../screens/Order/OrderDetailScreen';
import MyReviews from '../screens/Review/MyReviews';
import WriteReviews from '../screens/Review/WriteReviews';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CircularCropScreen from '../screens/Profile/CircularCropScreen';

const Stack = createStackNavigator();
const linking = {
  prefixes: ['newfashion--android://'],
  config: {
    screens: {
      Home: '',
      OrderDone: 'orderdone',
    },
  },
};

const screenTransition = {
  headerShown: false,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1.1, 1],
            }),
          },
        ],
      },
    };
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={screenTransition}
        initialRouteName={'Splash'}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen
          name="RegisterWithEmail"
          component={RegisterWithEmailScreen}
        />
        <Stack.Screen name="LoginWithEmail" component={LoginWithEmailScreen} />
        <Stack.Screen name="ProductDetail" component={DetailsScreen} />
        <Stack.Screen name="Messages" component={ChatScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetail} />
        <Stack.Screen name="PostDetail" component={CommentScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen
          name="ImagePreview"
          component={ImagePreview}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen name="Your orders" component={OrderScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="CheckOut" component={CheckoutScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="Coupon" component={CouponScreen} />
        <Stack.Screen name="SubCateDetail" component={SubCategoryDetail} />
        <Stack.Screen name="Setting" component={SettingsScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Coupons & offers" component={CouponScreen} />
        <Stack.Screen name="Lightning" component={LightningScreen} />
        <Stack.Screen name="Addresses" component={AddressesScreen} />
        <Stack.Screen name="OrderDone" component={OrderDoneScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="WriteReview" component={WriteReviews} />
        <Stack.Screen name="MyReview" component={MyReviews} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="CircularCropScreen"
          component={CircularCropScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
