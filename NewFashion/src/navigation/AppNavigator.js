import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import TestScreen from '../screens/TestScreen'
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterWithEmailScreen from '../screens/RegisterWithEmailScreen'
import LoginWithEmail from '../screens/LoginWithEmail'
import MainScreen from '../screens/MainScreen'
import LoginWithPhoneNumber from '../screens/LoginWithPhoneNumber'
import DetailsScreen from '../screens/DetailsScreen'
import ChatScreen from "../screens/Chat/ChatScreen";
import ChatDetail from "../screens/Chatdetail/ChatDetail";
import CartScreen from '../screens/Cart/CartScreen'
import homeScreen from "../screens/Home/HomeScreen";
import DetailPostScreen from "../screens/Post/DetailPostScreen";

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Main'}>
         <Stack.Screen name="Test" component={TestScreen} />
         <Stack.Screen name="Splash" component={SplashScreen} />
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="RegisterWithEmail" component={RegisterWithEmailScreen} />
         <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
         <Stack.Screen name="Main" component={MainScreen} />
         <Stack.Screen name="Detail" component={DetailsScreen} />
         <Stack.Screen name="LoginWithPhoneNumber" component={LoginWithPhoneNumber} />
         <Stack.Screen name="Chat" component={ChatScreen} />
         <Stack.Screen name="ChatDetail" component={ChatDetail} />
         <Stack.Screen name="PostDetail" component={DetailPostScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})