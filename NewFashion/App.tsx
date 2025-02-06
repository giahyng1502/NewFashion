import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginEmail from './screens/LoginEmail';

const StackNavigation = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation.Navigator>
        <StackNavigation.Screen name='LoginEmail' component={LoginEmail} options={{headerShown:false}}/>
      </StackNavigation.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})