import { StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import HomeHeader from './HomeHeader'
import LightningDeal from './LightningDeal'

const HomeScreen = () => {
  return (
    <ScrollView style={st.container}>
      <HomeHeader />
      <LightningDeal />
    </ScrollView>    
  )
}

export default HomeScreen

const st = StyleSheet.create({
  container:{
    backgroundColor:'#eee'
  }
})