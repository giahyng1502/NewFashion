import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ImageDetailProduct = () => {
  return (
    <View>
      <Image style={st.customsize} source={require('../assets/image/ig_product.png')}/>
    </View>
  )
}

export default ImageDetailProduct

const st = StyleSheet.create({
    customsize:{
        height: 450,
    }
})