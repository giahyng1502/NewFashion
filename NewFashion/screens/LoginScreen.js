import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';

{/* Header để riêng cho đỡ rối */}
const Header = () => (
  <View style={st.headerContainer}>
    <TouchableOpacity style={st.iconContainer}>
      <Image 
        source={require('../src/button/bt_exit.png')}
        style={st.closeIcon}
      />
    </TouchableOpacity>

    <Image 
      source={require('../src/image/img_logo.png')}
      style={st.logo}
      resizeMode="contain"
    />
  </View>
);

const LoginScreen = () => {
  return (
    <View style={st.container}>

      <Header />
      
      {/* Thông tin ưu đãi */}
      <View style={st.infoContainer}>
        {[
          { icon: require('../src/icon/ic_ship.png'), title: 'Free shipping', subtitle: 'On all orders' },
          { icon: require('../src/icon/ic_return.png'), title: 'Free returns', subtitle: 'Up to 90 days' },
        ].map((item, index) => (
          <View key={index} style={st.infoBlock}>
            <Image source={item.icon} style={st.infoIcon} resizeMode="contain" />
            <Text style={st.infoTitle}>{item.title}</Text>
            <Text style={st.infoSubtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </View>

      {/* Các nút đăng nhập */}
      <View style={st.buttonContainer}>
        {[
          { title: 'Continue with Google', icon: require('../src/button/bt_google.png') },
          { title: 'Continue with Facebook', icon: require('../src/button/bt_facebook.png') },
          { title: 'Continue with Email', icon: require('../src/button/bt_email.png') },
          { title: 'Continue with phone number', icon: require('../src/button/bt_phone.png') },
        ].map((btn, index) => (
          <Button
            key={index}
            title={btn.title}
            buttonStyle={st.authButton}
            titleStyle={st.buttonTitle}
            icon={<Image source={btn.icon} style={st.buttonIcon} resizeMode="contain" />}
            iconLeft
            containerStyle={st.buttonSpacing}
            onPress={() => console.log(btn.title)}
          />
        ))}
      </View>

      {/* Phần hỗ trợ đăng nhập */}
      <TouchableOpacity style={st.troubleContainer}>
        <Text style={st.troubleText}>Trouble signing in?</Text>
      </TouchableOpacity>

      {/* Điều khoản sử dụng và chính sách bảo mật */}
      <Text style={st.termsText}>
        By continuing, you agree to our{' '}
        <Text style={st.linkText} onPress={() => {}}>
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text style={st.linkText} onPress={() => {}}>
          Privacy Policy
        </Text>.
      </Text>
    </View>
  );
};

const st = StyleSheet.create({
    //toàn bộ màn hình
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: '#fff',
  },
  // Header
  headerContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 60,
    height: 60,
  },
  // Info
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
    marginTop: 50,
  },
  infoBlock: {
    alignItems: 'center',
  },
  infoIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 5,
  },
  infoSubtitle: {
    color: 'gray',
  },
  // Button
  buttonContainer: {
    marginTop: 10,
  },
  authButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    paddingLeft: 50,
    padding: 10,
    justifyContent: 'flex-start',
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  buttonTitle: {
    color: 'black',
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttonSpacing: {
    marginBottom: 15,
  },
  // Text
  troubleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  troubleText: {
    color: 'gray',
  },
  termsText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    fontSize: 15,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;