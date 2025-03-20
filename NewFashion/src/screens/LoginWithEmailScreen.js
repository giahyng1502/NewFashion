import React, { useState, useRef } from 'react';
import { Animated, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TextField, { TextFieldType } from '../components/TextField';
import ScreenSize from '../contants/ScreenSize';
import FilledButton from '../components/FilledButton';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../service/userService";
import { jwtDecode } from "jwt-decode";
import BenefitsInfoBox from '../components/BenefitsInfoBox';
import { checkEmail, loginWithEmail, register } from '../redux/actions/userActions';
import PasswordStrengthBar from '../components/PasswordStrengthBar';
import AppManager from '../utils/AppManager'

const LoginWithEmailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [strengLabel, setStrengLabel] = useState('')
  const [isRegister, setIsRegister] = useState(false);
  const [isContinue, setIsContinue] = useState(false);

  const opacityAnim = useRef(new Animated.Value(1)).current; // Điều khiển opacity của infoContainer
  const translateYAnim = useRef(new Animated.Value(0)).current; // Điều khiển translateY của email input
  const fadeInAnim = useRef(new Animated.Value(0)).current; // Điều khiển fadeIn của title và label password
  const fadePasswordAnim = useRef(new Animated.Value(0)).current; // Điều khiển fadeIn của ô nhập password

  //errorLabel
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        error = emailRegex.test(value) ? '' : 'Please enter a valid email address';
        setEmailError(error);
        return error;
      case 'password':
        error = value.length < 8 ? 'Password must be at least 8 characters' : '';
        setPasswordError(error);
        return error;
      default:
        return '';
    }
  };

  const handleCheckEmail = () => {
    const emailError = validateField('email', email);
    if (emailError) {
      console.log('Check email failed');
      return
    }

    let emailObj = {
      email: email
    }

    dispatch(checkEmail(emailObj))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          runAnimation(false);
        } else {
          runAnimation(true);
        }
      }).catch((err) => {
        console.log("Check email error: ", err);
      });
  };

  const runAnimation = (isRegisterState) => {
    Animated.sequence([
      // 1. Làm mờ và ẩn infoContainer
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      // 2. Hiển thị tiêu đề và phần label của các ô TextField
      Animated.parallel([
        Animated.timing(fadeInAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        // 3. Dịch chuyển ô nhập email lên
        Animated.timing(translateYAnim, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        // 4. Hiển thị ô nhập password
        Animated.timing(fadePasswordAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ]).start(() => {
      setIsContinue(true);
      setIsRegister(isRegisterState);
    });
  };

  const handleClose = () => {
    if (isContinue) {
      Animated.sequence([
        // 1. Hiển thị infoContainer
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        // 2. Ẩn tiêu đề và label của các ô TextField
        Animated.parallel([
          Animated.timing(fadeInAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          // 3. Dịch chuyển ô nhập email xuống
          Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          // 4. Ẩn ô nhập password
          Animated.timing(fadePasswordAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ]).start(() => {
        setIsContinue(false);
      });
    } else {
      navigation.goBack();
    }
  }

  const handleLogin = async () => {
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);


    if (emailError || passwordError) {
      console.log('Login failed');
      return
    }

    let user = {
      email: email,
      password: password
    }

    dispatch(loginWithEmail(user))
      .then((result) => {
        console.log('result: ', result);
        console.log('token: ', result.payload.token);

        // Lưu token
        AppManager.shared.saveUserInfo(result.payload.token)
          .then(() => {
            // Lấy lại token đã lưu và log ra
            return AppManager.shared.getToken();
          })
          .then((token) => {
            console.log('token: ', token); // Token thực tế
            navigation.replace('Main');
          })
          .catch((err) => {
            console.log('Error in token processing: ', err);
          });
      })
      .catch((err) => {
        console.log("Login error: ", err);
      });

  }

  const handleRegister = () => {
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);

    if (emailError || passwordError) {
      console.log('Register failed');
      return
    }

    let name = email.split('@')[0];

    let user = {
      email: email,
      name: name,
      password: password
    }
    console.log(user);

    dispatch(register(user))
      .then((result) => {
        console.log('Register successful', result);

        // Lưu token
        AppManager.shared.saveUserInfo(result.payload.token)
          .then(() => {
            // Lấy token đã lưu
            return AppManager.shared.getToken();
          })
          .then((token) => {
            console.log('token: ', token); // Token thực tế
            navigation.replace('Main');
          })
          .catch((err) => {
            console.log('Error in saving or retrieving token: ', err);
          });
      })
      .catch((err) => {
        console.log("Register error: ", err);
      });

  }

  const handleContinue = () => {
    if (isContinue) {
      if (isRegister) {
        handleRegister()
      } else {
        handleLogin()
      }
    } else {
      handleCheckEmail()
    }
  }

  return (
    <View style={st.container}>
      <View style={st.header}>
        <TouchableOpacity style={st.iconContainer} onPress={() => handleClose()}>
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

      {isContinue && (
        <Animated.Text style={[{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }, { opacity: fadeInAnim }]}>
          {isRegister ? 'Create an account' : 'Welcome back!'}
        </Animated.Text>
      )}

      {!isContinue && (
        <Animated.View style={[st.infoContainer, { opacity: opacityAnim }]}>
          <BenefitsInfoBox icon={require('../assets/icons/ic_freeReturns.png')} title="Free returns" subtitle="Up to 90 days" />
          <BenefitsInfoBox icon={require('../assets/icons/ic_freeShipping.png')} title="Free shipping" subtitle="On all orders" />
        </Animated.View>
      )}

      <Animated.View style={{ marginTop: 40, transform: [{ translateY: translateYAnim }] }}>
        {isContinue && <Animated.Text style={{ opacity: fadeInAnim }}>Email *</Animated.Text>}

        <View style={{ marginTop: 10 }}>
          <TextField
            placeholder="Please enter your email address"
            onChangeText={setEmail}
            customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }}
          />
        </View>
        {emailError &&
          <View style={st.errorContainer}>
            <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
            <Text style={st.errorLabel} numberOfLines={0}>{emailError}</Text>
          </View>
        }
      </Animated.View>

      {isContinue && (
        <Animated.View style={{ marginTop: 10, opacity: fadePasswordAnim }}>
          <Text>Password *</Text>
          <TextField
            type={TextFieldType.PASSWORD}
            placeholder={isRegister ? "Minimum 8 characters required" : "Please enter your password"}
            onChangeText={setPassword}
            customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }}
          />
          {passwordError &&
            <View style={st.errorContainer}>
              <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
              <Text style={st.errorLabel} numberOfLines={0}>{passwordError}</Text>
            </View>
          }
          {(isContinue && isRegister) &&
            <>
              <PasswordStrengthBar password={password} customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} onChangeText={setStrengLabel} />
              <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 8, alignSelf: 'flex-start', marginVertical: 5 }}>Password quality: {strengLabel}</Text>
            </>

          }
        </Animated.View>
      )}
      <FilledButton
        onPress={handleContinue}
        title="Continue"
        customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }}
      />

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
}

export default LoginWithEmailScreen;

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
    left: 0,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
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
  errorContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  errorLabel: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: '#F91616',
    flex: 1
  },
});
