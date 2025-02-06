import { StyleSheet, Text, TextInput, View } from 'react-native'
import React,{useState} from 'react'

const EmailType = () => {
    const [email, setEmail] = useState('')
    const CapNhat = (txt)=>{
        setEmail(txt);
    }
  return (
    <View style={st.container}>
        <TextInput placeholderTextColor="#BBBBBB" placeholder='Please enter your email address' onChangeText={CapNhat}/>
    </View>
  )
}

export default EmailType

const st = StyleSheet.create({
    container:{
        margin: 5,
        padding: 5,
        borderColor:"#BBBBBB",
        borderWidth: 1,
        borderRadius: 10,
    },
})