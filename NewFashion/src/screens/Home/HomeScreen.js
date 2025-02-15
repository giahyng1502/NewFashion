import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import {io} from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {setSocketConnection} from "../../redux/reducer/userReducer";
import HomeHeader from "./HomeHeader";

const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const {userId} = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
        <HomeHeader onPress={()=> navigation.navigate('Chat')}/>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding : 15
    }
})