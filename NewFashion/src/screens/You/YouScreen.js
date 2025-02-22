import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const YouScreen = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <Image style={st.chatIcon} source={require('../../assets/icons/ic_chat.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default YouScreen

const st = StyleSheet.create({


  chatIcon: {
    width: 30,
    height: 30,
  },
})