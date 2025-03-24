import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import BenefitsInfoBox from '../../components/BenefitsInfoBox';
import OutlinedButton from '../../components/OutlinedButton';
import ScreenSize from '../../contants/ScreenSize';
import { Modal } from 'react-native-paper';
import FilledButton from '../../components/FilledButton';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import TextField, { TextFieldType } from '../../components/TextField';
import PasswordStrengthBar from '../../components/PasswordStrengthBar';
import onGoogleButtonPress from './signInWithGoogle';
import {useDispatch} from "react-redux";
import {loginWithGoogle} from "../../service/userService";
import AppManager from "../../utils/AppManager";

const LoginScreen = ({navigation}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [currentSheet, setCurrentSheet] = useState('sheet1');
  const [password, setPassword] = useState('');
  const [strengLabel, setStrengLabel] = useState('');
  const dispatch = useDispatch();


  const bottomSheetRef = useRef();

  // Hàm mở Bottom Sheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
    setIsOpen(false);
  };
  // Đóng BottomSheet
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsOpen(true);
  };

  const [values, setValues] = useState(Array(6).fill(''));
  const handleChange = (index, text) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
  };
  const handleLoginWithGoogle = async ()=> {
    const data = await onGoogleButtonPress();
    const res = await loginWithGoogle(data.user);
    if (res.token) {
      AppManager.shared.saveUserInfo(res.token)
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
    }
  }
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: isOpen ? '#fff' : 'rgba(128, 128, 128, 0.7)' }} >
      <View style={st.container}>
        <View style={st.header}>
          <TouchableOpacity style={st.iconContainer} onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../assets/bt_exit.png')}
              style={st.closeIcon}
            />
          </TouchableOpacity>

          <Image
            source={require('../../assets/img_logo.png')}
            style={st.logo}
          />
        </View>

        <View style={st.infoContainer}>
          <BenefitsInfoBox icon={require('../../assets/icons/ic_freeReturns.png')} title="Free returns" subtitle="Up to 90 days" />
          <BenefitsInfoBox icon={require('../../assets/icons/ic_freeShipping.png')} title="Free shipping" subtitle="On all orders" />
        </View>

        <OutlinedButton onPress={handleLoginWithGoogle} icon={require('../../assets/bt_google.png')} title="Continue with Google" customStyle={{ width: ScreenSize.width - 40, marginTop: 40 }} />
        <OutlinedButton icon={require('../../assets/bt_facebook.png')} title="Continue with Facebook" customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} />
        <OutlinedButton icon={require('../../assets/bt_email.png')} title="Continue with Email" customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} onPress={() => {navigation.navigate('LoginWithEmail');}} />
        <OutlinedButton icon={require('../../assets/bt_phone.png')} title="Continue with phone number" customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} />

        <TouchableOpacity style={st.troubleContainer} onPress={() => openBottomSheet()} >
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

        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={st.overlay}>
            <View style={st.modalContainer}>
              <Text style={st.title}>Enjoy these special offers after signing in! Are you sure you want to leave now?</Text>

              <View style={st.benefitsContainer}>
                <BenefitsInfoBox icon={require('../../assets/icons/ic_freeShipping.png')} title="Free shipping" subtitle="On all orders" />
                <BenefitsInfoBox icon={require('../../assets/icons/ic_freeReturns.png')} title="Free returns" subtitle="Up to 90 days" />
              </View>

              <FilledButton title="Continue" customStyle={{ backgroundColor: 'black', width: '100%', marginVertical: 10 }} onPress={() => {setModalVisible(false);}} />
              <OutlinedButton title="Leave" customStyle={{ width: '100%' }} onPress={() => {navigation.goBack();}} />
            </View>
          </View>
        </Modal>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['30%', '85%']}
          enablePanDownToClose={true}
          onClose={() => {
            setIsOpen(true);
            setCurrentSheet('sheet1');
          }}
        >
          <BottomSheetView style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
            {currentSheet === 'sheet1' && (
              <>
                <View style={st.modalHeader}>
                  <Text style={st.troubleTitle}>Trouble signing in?</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <View style={{marginHorizontal:8}}>
                  <Text style={st.troubleSubtitle}>If you registered an account with your email address, but forgot your password, you can reset your password.</Text>
                </View>
                <OutlinedButton title="Reset your password" customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} onPress={() => setCurrentSheet('sheet2')} />
              </>
            )}
            {currentSheet === 'sheet2' && (
              <>
                <View style={st.modalHeader}>
                  <Text style={st.troubleTitle}>Trouble signing in?</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <Text style={st.troubleSubtitle}>Enter your email address below, and we’ll send you a 6-digit
                  password reset code.</Text>
                <TextField placeholder="Enter your email" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} />
                <FilledButton title="Submit" customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }} onPress={() => setCurrentSheet('sheet3')} />
              </>
            )}
            {currentSheet === 'sheet3' && (
              <>
                <View style={st.modalHeader}>
                  <TouchableOpacity onPress={() => setCurrentSheet('sheet2')}>
                    <Image source={require('../../assets/ic_back.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                  <Text style={st.troubleTitle}>Enter the password reset code</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <Text style={[st.troubleSubtitle, { paddingHorizontal: 10 }]}>Please check your mailbox now! Enter the 6-digit password
                  reset code sent to dominhhieuhn01@gmail.com. The code expires after 2 hours.</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                  {values.map((value, index) => (
                    <TextInput
                      key={index}
                      value={value}
                      onChangeText={(text) => handleChange(index, text)}
                      maxLength={1}
                      style={st.input}
                    />
                  ))}
                </View>
                <View>
                  <Text style={{ alignSelf: 'center' }}>60s Resend code</Text>
                  <FilledButton title="Submit" customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }} onPress={() => setCurrentSheet('sheet4')} />
                </View>
                <View style={{ marginTop: 60, alignSelf: 'flex-start', padding: 10 }} >
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                    Didn’t receive the email?</Text>
                  <Text style={st.text}>1. Make sure your email address is correct.</Text>
                  <Text style={st.text}>2. Please check your spam folder.</Text>
                  <Text style={st.text}>
                    3. If you still don’t see the code,{' '}
                    <TouchableOpacity onPress={() => setCurrentSheet('sheet6')}>
                      <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>try another way to verify your identity &gt;</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </>
            )}
            {currentSheet === 'sheet4' && (
              <>
                <View style={st.modalHeader}>
                  <TouchableOpacity onPress={() => setCurrentSheet('sheet3')}>
                    <Image source={require('../../assets/ic_back.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                  <Text style={st.troubleTitle}>Create a new password</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <View style={{ padding: 10 }} >
                  <Text style={st.troubleSubtitle}>Enter a new password you would like to associate with
                    your account below.</Text>
                  <TextField type={TextFieldType.PASSWORD} placeholder="Enter your password" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} onChangeText={setPassword} />
                  <PasswordStrengthBar password={password} customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} onChangeText={setStrengLabel} />
                  <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 8, alignSelf: 'flex-start', marginVertical: 5 }}>Password quality: {strengLabel}</Text>
                  <Text style={st.passwordQuality}>
                    Don't use a password from another site, or something too obvious like your pet's name.
                  </Text>
                  <FilledButton title="Submit" customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }} onPress={() => setCurrentSheet('sheet5')} />
                </View>
              </>
            )}
            {currentSheet === 'sheet5' && (
              <>
                <View style={st.modalDone}>
                  <Image source={require('../../assets/ic_done.png')} style={st.doneIcon} />

                  <Text style={st.doneTitle}>Your password has been reset</Text>
                  <Text style={st.doneText}>
                    Your email <Text style={st.doneEmail}>dominhhieuhn01@gmail.com</Text> might not have been
                    able to receive our New Fashion emails. You can always edit the email on your New Fashion
                    account to another one.
                  </Text>
                  <FilledButton title="Continue Shopping" customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }} />
                </View>
              </>
            )}
            {/*  */}
            {currentSheet === 'sheet6' && (
              <>
                <View style={st.modalHeader}>
                  <TouchableOpacity onPress={() => setCurrentSheet('sheet3')}>
                    <Image source={require('../../assets/ic_back.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                  <Text style={st.troubleTitle}>Verify your identity</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <View style={{ margin: 6 }}>
                  <Text style={st.troubleSubtitle}>For your account security, we need to make sure it’s really
                    you, you have another way to verify your identity.</Text>
                  <TouchableOpacity style={st.verifyContainer} onPress={() => setCurrentSheet('sheet7')}>
                    <View style={st.verifyText}>
                      <Text style={st.verifyTitle}>Use SMS verification code to verify identity</Text>
                      <Text style={st.verifySubtitle}>We will send an SMS verification code to +84 975****96</Text>
                    </View>
                    {/* Icon mũi tên bên phải */}
                    <Image source={require('../../assets/ic_arrowRight.png')} style={st.closeIcon} />
                  </TouchableOpacity>
                </View>
              </>
            )}
            {/*  */}
            {currentSheet === 'sheet7' && (
              <>
                <View style={st.modalHeader}>
                  <TouchableOpacity onPress={() => setCurrentSheet('sheet6')}>
                    <Image source={require('../../assets/ic_back.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                  <Text style={st.troubleTitle}>Enter the verification code</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <Text style={[st.troubleSubtitle, { paddingHorizontal: 10 }]}>To continue, complete this verification step. We’ve sent a
                  verification code to the phone number +84 0975 953 696.
                  Please enter it below.</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                  {values.map((value, index) => (
                    <TextInput
                      key={index}
                      value={value}
                      onChangeText={(text) => handleChange(index, text)}
                      maxLength={1}
                      style={st.input}
                    />
                  ))}
                </View>
                <View>
                  <Text style={{ alignSelf: 'center' }}>60s Resend code</Text>
                </View>
              </>
            )}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const st = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
    color: 'gray',
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },

  // trouble modal
  troubleSubtitle: {
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 10,
    fontWeight: '700',
  },
  resetButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    marginTop: 10,
  },
  resetText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeText: {
    color: 'blue',
    fontSize: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Căn trái - giữa - phải
    padding: 7,
  },
  troubleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    width: '100%',
  },
  closeIcon1: {
    width: 18,
    height: 18,
  },
  input: {
    width: 56,
    height: 56,
    textAlign: 'center',
    borderWidth: 0.6,
    borderColor: '#BBBBBB',
    borderRadius: 5,
    fontSize: 18,
    marginHorizontal: 5,
  },
  passwordQuality: {
    fontSize: 13,
    color: '#737373',
    marginBottom: 20,
    fontWeight: '800',
  },
  modalDone: {
    alignItems: 'center',
    marginTop: 50,
    padding: 10,
  },
  doneIcon: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  doneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  doneText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  doneEmail: {
    color: '#FE7018',
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 5,
  },
  verifyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  verifyText: {
    flex: 1, // Chiếm hết không gian trừ icon
  },
  verifyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  verifySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default LoginScreen;
