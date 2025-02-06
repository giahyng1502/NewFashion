import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmailType from '../components/EmailType'
import Ads from '../components/Ads'
import ButtonContinue from '../components/ButtonContinue'

const LoginEmail = () => {
  return (
    <SafeAreaView style={st.container}>

      <View style={st.header}>
      <TouchableOpacity style={st.icback}>
        <Image source={require('../asset/ic_back.png')} resizeMode='cover'/>
      </TouchableOpacity>

      <Image style={st.iclogo} source={require('../asset/ic_logo.png')} resizeMode='cover'/>
      </View>

      <View style={st.ads}>
      <Ads/>
      </View>

      <View style={st.emailtype}>
      <EmailType style={st.emailtype}/>
      </View>

      <View>
        <ButtonContinue/>
      </View>

      <TouchableOpacity>
        <Text style={{marginTop:10, textAlign:"center", color:"#737373"}}>Trouble signing in?</Text>
      </TouchableOpacity>

      <Text style={st.footer}>
          By continuing, you agree to our <Text style={{textDecorationLine: 'underline', color:"#004D96"}}>Terms of Use</Text> and <Text style={{textDecorationLine: 'underline', color:"#004D96"}}>Privacy Policy.</Text>
      </Text>

    </SafeAreaView>
  )
}

export default LoginEmail

const st = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    padding: 16,
    flexDirection: 'column',
  },

  header:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    position: "absolute",
    top: 16,
    width: "100%",
  },

  icback:{
    justifyContent: "center",
    alignItems: "center",
  },

  iclogo:{
    alignSelf: "center",
    marginRight: 120,
    marginTop: 20,
    width: 70,
    height: 70,
  },

  emailtype:{
    marginTop:150,
  },

  ads:{
    marginTop: 150,
    marginRight: 40,
  },

  footer:{
    textAlign:"center",
    alignSelf:"flex-end",
    color:"#000000",
    marginTop: 300,
    fontWeight: "bold",
    marginRight: 5,
  }
})