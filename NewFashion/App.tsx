import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { Provider } from 'react-redux'
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </Provider>
  )
}

export default App

