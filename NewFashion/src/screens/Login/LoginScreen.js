import * as React from 'react';
import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import BenefitsInfoBox from '../../components/BenefitsInfoBox';
import OutlinedButton from '../../components/OutlinedButton';
import ScreenSize from '../../contants/ScreenSize';
import { Modal } from 'react-native-paper';
import FilledButton from '../../components/FilledButton';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import TextField, { TextFieldType } from '../../components/TextField';
import PasswordStrengthBar from '../../components/PasswordStrengthBar';
import { useDispatch } from 'react-redux';
import AppManager from '../../utils/AppManager';
import { onGoogleButtonPress } from './signInWithGoogle';
import { loginWithGoogle } from "../../redux/actions/userActions";

const LoginScreen = ({ navigation }) => {

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
  const handleLoginWithGoogle = async () => {
    try {
      const data = await onGoogleButtonPress();
      if (!data || !data.user) {
        console.log('Google login failed: No user data');
        return;
      }

      dispatch(loginWithGoogle(data.user._user)).then((result) => {
        console.log(result);
        if (result?.meta.requestStatus === 'fulfilled') {
          AppManager.shared.saveUserInfo(result.payload.token)
            .then(() => AppManager.shared.getToken())
            .then((token) => {
              console.log('token: ', token);
              navigation.replace('Main');
            })
            .catch((err) => {
              console.log('Error in token processing: ', err);
            });
        } else {
          console.log('Google login failed:', result);
        }
      });
    } catch (error) {
      console.error('Error in Google login:', error);
    }
  };


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
          <BenefitsInfoBox icon={require('../../assets/icons/ic_freeReturns.png')} title="Trả lại miễn phí" subtitle="Lên đến 90 ngày" />
          <BenefitsInfoBox icon={require('../../assets/icons/ic_freeShipping.png')} title="Miễn phí vận chuyển" subtitle="Trên tất cả các đơn hàng" />
        </View>

        <OutlinedButton onPress={handleLoginWithGoogle} icon={require('../../assets/bt_google.png')} title="Tiếp tục với Google" customStyle={{ width: ScreenSize.width - 40, marginTop: 40 }} />
        <OutlinedButton icon={require('../../assets/bt_email.png')} title="Tiếp tục với Email" customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} onPress={() => { navigation.navigate('LoginWithEmail'); }} />
        {/* <OutlinedButton icon={require('../assets/bt_phone.png')} title="Continue with phone number" customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} /> */}



        <TouchableOpacity style={st.troubleContainer} onPress={() => openBottomSheet()} >
          <Text style={st.troubleText}>Gặp sự cố khi đăng nhập?</Text>
        </TouchableOpacity>

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

        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={st.overlay}>
            <View style={st.modalContainer}>
              <Text style={st.title}>Tận hưởng những ưu đãi đặc biệt này sau khi đăng nhập! Bạn có chắc chắn muốn rời đi ngay bây giờ không?</Text>

              <View style={st.benefitsContainer}>
                <BenefitsInfoBox icon={require('../../assets/icons/ic_freeReturns.png')} title="Trả lại miễn phí" subtitle="Lên đến 90 ngày" />
                <View style={{width:10}}/>
                <BenefitsInfoBox icon={require('../../assets/icons/ic_freeShipping.png')} title="Miễn phí vận chuyển" subtitle="Trên tất cả các đơn hàng" />
              </View>

              <FilledButton title="Đăng nhập" customStyle={{ backgroundColor: 'black', width: '100%', marginVertical: 10 }} onPress={() => { setModalVisible(false); }} />
              <OutlinedButton title="Tiếp tục trạng thái chưa đăng nhập" customStyle={{ width: '100%' }} onPress={() => { navigation.goBack(); }} />
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
                  <Text style={st.troubleTitle}>Gặp sự cố khi đăng nhập?</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <View style={{ marginHorizontal: 8 }}>
                  <Text style={st.troubleSubtitle}>Nếu bạn đã đăng ký tài khoản bằng địa chỉ email nhưng quên mật khẩu, bạn có thể đặt lại mật khẩu.</Text>
                </View>
                <OutlinedButton title="Đặt lại mật khẩu" customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} onPress={() => setCurrentSheet('sheet2')} />
              </>
            )}
            {currentSheet === 'sheet2' && (
              <>
                <View style={st.modalHeader}>
                  <Text style={st.troubleTitle}>Gặp sự cố khi đăng nhập?</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <Text style={st.troubleSubtitle}>Nhập địa chỉ email của bạn bên dưới và chúng tôi sẽ gửi cho bạn mã đặt lại mật khẩu gồm 6 chữ số.</Text>
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
                  <Text style={st.troubleTitle}>Nhập mã đặt lại mật khẩu</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <Text style={[st.troubleSubtitle, { paddingHorizontal: 10 }]}>Vui lòng kiểm tra hộp thư của bạn ngay bây giờ! Nhập mã đặt lại mật khẩu gồm 6 chữ số
                  được gửi đến dominhhieuhn01@gmail.com. Mã sẽ hết hạn sau 2 giờ.</Text>

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
                  <Text style={{ alignSelf: 'center' }}>60 giây Gửi lại mã</Text>
                  <FilledButton title="Submit" customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }} onPress={() => setCurrentSheet('sheet4')} />
                </View>
                <View style={{ marginTop: 60, alignSelf: 'flex-start', padding: 10 }} >
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                    Không nhận được email?</Text>
                  <Text style={st.text}>1. Đảm bảo địa chỉ email của bạn là chính xác.</Text>
                  <Text style={st.text}>2. Vui lòng kiểm tra thư mục thư rác.</Text>
                  <Text style={st.text}>
                    3. Nếu bạn vẫn không thấy mã,{' '}
                    <TouchableOpacity onPress={() => setCurrentSheet('sheet6')}>
                      <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>hãy thử một cách khác để xác minh danh tính của bạn &gt;</Text>
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
                  <Text style={st.troubleTitle}>Tạo mật khẩu mới</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <View style={{ padding: 10 }} >
                  <Text style={st.troubleSubtitle}>Nhập mật khẩu mới mà bạn muốn liên kết với
                    tài khoản của bạn bên dưới.</Text>
                  <TextField type={TextFieldType.PASSWORD} placeholder="Enter your password" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} onChangeText={setPassword} />
                  <PasswordStrengthBar password={password} customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} onChangeText={setStrengLabel} />
                  <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 8, alignSelf: 'flex-start', marginVertical: 5 }}>Chất lượng mật khẩu: {strengLabel}</Text>
                  <Text style={st.passwordQuality}>
                    Đừng sử dụng mật khẩu của một trang web khác hoặc thứ gì đó quá dễ đoán như tên thú cưng của bạn.
                  </Text>
                  <FilledButton title="Submit" customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }} onPress={() => setCurrentSheet('sheet5')} />
                </View>
              </>
            )}
            {currentSheet === 'sheet5' && (
              <>
                <View style={st.modalDone}>
                  <Image source={require('../../assets/ic_done.png')} style={st.doneIcon} />

                  <Text style={st.doneTitle}>Mật khẩu của bạn đã được đặt lại</Text>
                  <Text style={st.doneText}>
                    Your email <Text style={st.doneEmail}>dominhhieuhn01@gmail.com</Text> có thể không nhận được email Thời trang mới của chúng tôi. Bạn luôn có thể chỉnh sửa email trên tài khoản Thời trang mới của mình
                    thành một tài khoản khác.
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
                  <Text style={st.troubleTitle}>Xác minh danh tính của bạn</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <View style={{ margin: 6 }}>
                  <Text style={st.troubleSubtitle}>Để bảo mật tài khoản của bạn, chúng tôi cần đảm bảo rằng bạn thực sự là người đó, bạn có cách khác để xác minh danh tính của mình.</Text>
                  <TouchableOpacity style={st.verifyContainer} onPress={() => setCurrentSheet('sheet7')}>
                    <View style={st.verifyText}>
                      <Text style={st.verifyTitle}>Sử dụng mã xác minh SMS để xác minh danh tính</Text>
                      <Text style={st.verifySubtitle}>Chúng tôi sẽ gửi mã xác minh SMS tới +84 975****96</Text>
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
                  <Text style={st.troubleTitle}>Nhập mã xác minh</Text>
                  <TouchableOpacity onPress={() => closeBottomSheet()}>
                    <Image source={require('../../assets/bt_exit.png')} style={st.closeIcon1} />
                  </TouchableOpacity>
                </View>
                <View style={st.separator} />
                <Text style={[st.troubleSubtitle, { paddingHorizontal: 10 }]}>Để tiếp tục, hãy hoàn tất bước xác minh này. Chúng tôi đã gửi
                  mã xác minh đến số điện thoại +84 0975 953 696.
                  Vui lòng nhập mã bên dưới.</Text>
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
                  <Text style={{ alignSelf: 'center' }}>60 giây Gửi lại mã</Text>
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
