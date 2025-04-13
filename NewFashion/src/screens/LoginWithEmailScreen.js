import React, { useState, useRef } from 'react';
import { Animated, Text, View, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, InteractionManager, Keyboard, Linking } from 'react-native';
import TextField, { TextFieldType } from '../components/TextField';
import ScreenSize from '../contants/ScreenSize';
import FilledButton from '../components/FilledButton';
import { useDispatch } from "react-redux";
import BenefitsInfoBox from '../components/BenefitsInfoBox';
import { checkEmail, loginWithEmail, register } from '../redux/actions/userActions';
import PasswordStrengthBar from '../components/PasswordStrengthBar';
import AppManager from '../utils/AppManager'
import { fetchInformation } from '../redux/actions/infomationActions';

const LoginWithEmailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [strengLabel, setStrengLabel] = useState('')
  const [isRegister, setIsRegister] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        error = emailRegex.test(value) ? '' : 'Vui lòng nhập địa chỉ email hợp lệ';
        setEmailError(error);
        return error;
      case 'password':
        error = value.length < 8 ? 'Mật khẩu phải có ít nhất 8 ký tự' : '';
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

  const handleLogin = () => {
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);
  
    if (emailError || passwordError) {
      console.log('Login failed');
      return;
    }
  
    setIsLoading(true); // Hiện loading trước
    Keyboard.dismiss(); // Ẩn bàn phím
  
    InteractionManager.runAfterInteractions(() => {
      let user = {
        email: email,
        password: password
      };
  
      dispatch(loginWithEmail(user))
        .then(async (result) => {
          console.log('result: ', result);
          console.log('token: ', result.payload.token);
  
          try {
            await AppManager.shared.saveUserInfo(result.payload.token);
  
            const token = await AppManager.shared.getToken();
            console.log('token: ', token);
  
            if (token) {
              const fetchPersonalInfo = await dispatch(fetchInformation()).unwrap();
              console.log('Fetch personal info success:', fetchPersonalInfo);
  
              setIsLoading(false); // Tắt loading trước khi chuyển màn
              navigation.replace('Main');
            }
          } catch (err) {
            console.log('Error in token processing: ', err);
            setIsLoading(false);
            Alert.alert('Error', 'An error occurred while processing the token. Please try again.');
          }
        })
        .catch((err) => {
          console.log('Login error: ', err);
          setIsLoading(false);
          Alert.alert('Đăng nhập không thành công', 'Email hoặc mật khẩu không đúng.');
        });
    });
  };

  const handleRegister = () => {
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);
  
    if (emailError || passwordError) {
      console.log('Register failed');
      return;
    }
  
    setIsLoading(true); // Hiện loading trước
    Keyboard.dismiss(); // Ẩn bàn phím
    
    InteractionManager.runAfterInteractions(() => {
      let name = email.split('@')[0];
      let user = {
        email: email,
        name: name,
        password: password
      };
  
      console.log(user);
  
      dispatch(register(user))
        .then(async (result) => {
          console.log('Register successful', result);
  
          try {
            await AppManager.shared.saveUserInfo(result.payload.token);
            const token = await AppManager.shared.getToken();
            console.log('token: ', token);
  
            setIsLoading(false); // Tắt loading trước khi chuyển màn
            navigation.replace('Main');
          } catch (err) {
            console.log('Error in saving or retrieving token: ', err);
            setIsLoading(false);
            Alert.alert('Thông báo', 'Lỗi khi lưu hoặc lấy token. Vui lòng thử lại.');
          }
        })
        .catch((err) => {
          console.log('Register error: ', err);
          setIsLoading(false);
          Alert.alert('Thông báo', 'Có lỗi xảy ra khi đăng ký.');
        });
    });
  };  

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
          {isRegister ? 'Tạo một tài khoản' : 'Chào mừng trở lại!'}
        </Animated.Text>
      )}

      {!isContinue && (
        <Animated.View style={[st.infoContainer, { opacity: opacityAnim }]}>
          <BenefitsInfoBox icon={require('../assets/icons/ic_freeReturns.png')} title="Trả lại miễn phí" subtitle="Lên đến 90 ngày" />
          <BenefitsInfoBox icon={require('../assets/icons/ic_freeShipping.png')} title="Miễn phí vận chuyển" subtitle="Trên tất cả các đơn hàng" />
        </Animated.View>
      )}

      <Animated.View style={{ marginTop: 40, transform: [{ translateY: translateYAnim }] }}>
        {isContinue && <Animated.Text style={{ opacity: fadeInAnim }}>Email *</Animated.Text>}

        <View style={{ marginTop: 10 }}>
          <TextField
            placeholder="Vui lòng nhập địa chỉ email của bạn"
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
          <Text>Mật khẩu *</Text>
          <TextField
            type={TextFieldType.PASSWORD}
            placeholder={isRegister ? "Yêu cầu tối thiểu 8 ký tự" : "Vui lòng nhập mật khẩu của bạn"}
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
              <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 8, alignSelf: 'flex-start', marginVertical: 5 }}>Chất lượng mật khẩu: {strengLabel}</Text>
            </>

          }
        </Animated.View>
      )}
      <FilledButton
        onPress={handleContinue}
        title="Tiếp tục"
        customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }}
      />

      <Text style={st.termsText}>
      Bằng cách tiếp tục, bạn đồng ý với chúng tôi{' '}
        <Text style={st.linkText} onPress={() => {Linking.openURL('https://www.freeprivacypolicy.com/live/a1f3fc15-3468-4c50-897d-7d126f8de39e')}}>
        Điều khoản sử dụng
        </Text>{' '}
        và{' '}
        <Text style={st.linkText} onPress={() => {Linking.openURL('https://www.freeprivacypolicy.com/live/9e7e7430-63f1-4258-beae-999dd85300cc')}}>
        Chính sách bảo mật
        </Text>.
      </Text>

      {isLoading && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#FA7806" />
        </View>
      )}
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
