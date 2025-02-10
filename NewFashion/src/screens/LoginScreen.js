import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BenefitsInfoBox from '../components/BenefitsInfoBox';
import OutlinedButton from '../components/OutlinedButton';
import ScreenSize from '../contants/ScreenSize';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "820669094821-sn7aobosoluohktj0gglaa80t1uk6rvi.apps.googleusercontent.com",
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);

      console.log('Đăng nhập thành công!');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Đăng nhập bị hủy');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Đang đăng nhập');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services không có sẵn');
      } else {
        console.error(error);
      }
    }
  }

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
        <BenefitsInfoBox icon={require('../assets/ic_freeReturns.png')} title="Free returns" subtitle="Up to 90 days" />
        <BenefitsInfoBox icon={require('../assets/ic_freeShipping.png')} title="Free shipping" subtitle="On all orders" />
      </View>

      <OutlinedButton icon={require('../assets/bt_google.png')} title="Continue with Google" customStyle={{ width: ScreenSize.width - 40, marginTop: 40 }} onPress={onGoogleButtonPress}/>
      <OutlinedButton icon={require('../assets/bt_facebook.png')} title="Continue with Facebook" customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} />
      <OutlinedButton icon={require('../assets/bt_email.png')} title="Continue with Email" customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} />
      <OutlinedButton icon={require('../assets/bt_phone.png')} title="Continue with phone number" customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} />

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
  );
};

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
    marginTop: 30,
    fontSize: 14,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'semibold',
  },
});

export default LoginScreen;