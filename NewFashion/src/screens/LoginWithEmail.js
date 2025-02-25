import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BenefitsInfoBox from '../components/BenefitsInfoBox';
import TextField from '../components/TextField';
import ScreenSize from '../contants/ScreenSize';
import FilledButton from '../components/FilledButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../service/userService";
import {jwtDecode} from "jwt-decode";

const LoginWithEmail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const handleLoginWithEmail = async () => {
    const res = await login({email,password});
    if (res.token) {
      await AsyncStorage.setItem("token", res.token);
      const user = jwtDecode(res.token);
      dispatch(setUser(user));
      navigation.navigate('Home');
    }
  };

  return (
    <View style={st.container}>
      <View style={st.header}>
        <TouchableOpacity style={st.iconContainer}>
          <Image
            source={require('../assets/bt_exit.png')}
            style={st.closeIcon}
          />
        </TouchableOpacity>

        <Image
          source={require('../assets/img_logo.png')}
          style={st.logo}
        />
      </View>

      <View style={st.infoContainer}>
        <BenefitsInfoBox icon={require('../assets/icons/ic_freeReturns.png')} title="Free returns" subtitle="Up to 90 days" />
        <BenefitsInfoBox icon={require('../assets/icons/ic_freeShipping.png')} title="Free shipping" subtitle="On all orders" />
      </View>
      
      <TextField placeholder="Please enter your email address"
                 onChangeText={setEmail}
                 customStyle={{ width: ScreenSize.width - 40, marginTop: 40 }} />

      <TextField placeholder="Please enter your email address"
                 onChangeText={setPassWord}
                 isPassword
                 customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} />
      <FilledButton onPress={handleLoginWithEmail} title="Continue" customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }} />

      <TouchableOpacity style={st.troubleContainer}>
        <Text style={st.troubleText}>Trouble signing in?</Text>
      </TouchableOpacity>

      <Text style={st.termsText}>
        By continuing, you agree to our{' '}
        <Text style={st.linkText} onPress={() => { }}>
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text style={st.linkText} onPress={() => { }}>
          Privacy Policy
        </Text>.
      </Text>
    </View>
  )
}

export default LoginWithEmail

const st = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
    paddingLeft: 0,
    position: 'absolute',
    top: 0,
    left: 0
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 10
  },
  // Info
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  // Text
  troubleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  troubleText: {
    fontWeight: 'semibold',
    fontSize: 14,
    color: 'gray',
  },
  termsText: {
    textAlign: 'center',
    fontWeight: 'semibold',
    color: '#000',
    marginTop: 50,
    fontSize: 14,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'semibold',
  },
})