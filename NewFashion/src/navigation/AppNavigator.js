import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterWithEmailScreen from '../screens/RegisterWithEmailScreen'
import LoginWithEmailScreen from '../screens/LoginWithEmailScreen'
import MainScreen from '../screens/MainScreen'
import LoginWithPhoneNumber from '../screens/LoginWithPhoneNumber'
import DetailsScreen from '../screens/DetailsScreen'
import ChatScreen from "../screens/Chat/ChatScreen";
import ChatDetail from "../screens/Chatdetail/ChatDetail";
import CartScreen from '../screens/Cart/CartScreen'
import DetailPostScreen from "../screens/Post/DetailPostScreen";
import ImagePreview from '../screens/ImagePreview'
import OrderScreen from '../screens/Order/OrderScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Splash'}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal' }} />
          <Stack.Screen name="RegisterWithEmail" component={RegisterWithEmailScreen} />
          <Stack.Screen name="LoginWithEmail" component={LoginWithEmailScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="ProductDetail" component={DetailsScreen} />
          <Stack.Screen name="LoginWithPhoneNumber" component={LoginWithPhoneNumber} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="ChatDetail" component={ChatDetail} />
          <Stack.Screen name="PostDetail" component={DetailPostScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="ImagePreview" component={ImagePreview} options={{ presentation: 'modal' }} />
          <Stack.Screen name="Your orders" component={OrderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})