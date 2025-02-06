import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonContinue = ({title, opPress}) => {
  return (
    <TouchableOpacity style={st.customButton}>
        <Text style={st.font}>Continue</Text>
    </TouchableOpacity>
  )
}

export default ButtonContinue

const st = StyleSheet.create({
    customButton:{
        backgroundColor:"black",
        width:370,
        height: 40,
        marginTop: 20,
        alignSelf:'center',
        borderRadius: 10,
    },

    font:{
        color: "white",
        alignSelf: "center",
        fontWeight:"bold",
        marginTop: 10,
    }
})