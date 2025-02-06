import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomTabNavigator from './src/navigation/BottomTabNavigator'

const App = () => {
  return (
   <>
   <StatusBar barStyle="dark-content" />
   <BottomTabNavigator/>
   </>
  )
}

export default App

const styles = StyleSheet.create({})