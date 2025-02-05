import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FilledButton = ({title, customStyle}) => {
  return (
    <View style={[st.container, customStyle]}>
      <Text style={st.text}>{title}</Text>
    </View>
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