import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import TestScreen from '../screens/TestScreen'
import SplashScreen1 from '../screens/SplashScreen1'
import SplashScreen2 from '../screens/SplashScreen2'
import LoginScreen from '../screens/LoginScreen'
import RegisterWithEmailScreen from '../screens/RegisterWithEmailScreen'
import LoginWithEmail from '../screens/LoginWithEmail'
import MainScreen from '../screens/MainScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Test" component={TestScreen} /> */}
        {/* <Stack.Screen name="Splash1" component={SplashScreen1} /> */}
        {/* <Stack.Screen name="Splash2" component={SplashScreen2} /> */}
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="RegisterWithEmail" component={RegisterWithEmailScreen} /> */}
        {/* <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} /> */}
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})