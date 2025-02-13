import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OutlinedButton = ({icon, title, customStyle, onPress}) => {
  return (
    <Pressable style={[st.container, customStyle]} onPress={onPress}>
      {icon && <Image source={icon} style={st.icon} resizeMode='contain' />}
      <Text style={st.text}>{title}</Text>
    </Pressable>
  )
}

export default OutlinedButton

const st = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 20,
        borderWidth: 1, 
        borderColor: '#BBBBBB' 
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 8,
    },
    text: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    }
})