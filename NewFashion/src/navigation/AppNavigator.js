import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import TestScreen from '../screens/TestScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})