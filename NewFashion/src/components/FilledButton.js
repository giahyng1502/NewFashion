import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'

const FilledButton = ({title, customStyle,onclick}) => {
  return (
    <TouchableOpacity
        onPress={onclick}
        style={[st.container, customStyle]}>
      <Text style={st.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default FilledButton

const st = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 20
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    }
})