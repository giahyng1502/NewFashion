import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const SplashScreen2 = () => {
  return (
      <View style={st.container}>
          <Image
              source={require('../assets/img_banner1.png')}
              style={st.image} />
      </View>
  )
}

export default SplashScreen2

const st = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})