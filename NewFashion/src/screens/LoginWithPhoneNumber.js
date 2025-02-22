import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRef } from 'react';
import BenefitsInfoBox from '../components/BenefitsInfoBox'
import TextField from '../components/TextField'
import ScreenSize from '../contants/ScreenSize'
import FilledButton from '../components/FilledButton'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-gesture-handler';

const LoginWithPhoneNumber = () => {
  const [isOpen, setIsOpen] = useState(true)
  const bottomSheetRef = useRef();
  // Hàm mở Bottom Sheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
    setIsOpen(true)
  };
  // Đóng BottomSheet
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsOpen(false)
  };
  const [values, setValues] = useState(Array(6).fill(""));
  const handleChange = (index, text) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
  };
  return (
    <View style={[st.container, {backgroundColor: isOpen ? 'rgba(128, 128, 128, 0.7)' : '#fff'}]}>
      {/* Overlay chỉ hiển thị khi mở BottomSheet */}
      {isOpen && <View style={st.overlay} />}
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

      <TextField placeholder="Enter phone number" customStyle={{ width: ScreenSize.width - 40, marginTop: 40 }} />
      <FilledButton title="Sign in /  Register" customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }} onPress={() => openBottomSheet()} />

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
          Privacy Policy.
        </Text>.
        You will receive an SMS for verification purposes only.
        Message and data rates may apply.
      </Text>


      {/* bottom sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['85%']}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
      >
        <BottomSheetView>
          <View style={st.modalHeader}>
            <Text style={st.troubleTitle}>Enter the verification code</Text>
            <TouchableOpacity onPress={() => closeBottomSheet()}>
              <Image source={require('../assets/bt_exit.png')} style={st.closeIcon1} />
            </TouchableOpacity>
          </View>
          <View style={st.separator} />
          <View style={{marginHorizontal:15}}>
            <Text style={st.troubleSubtitle}>To continue, complete this verification step. We’ve sent a
              verification code to the phone number <Text style={{ color: '#FE7018' }}>+84 0975 953 696.</Text>Please enter it below.</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", padding: 10, }}>
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
          </View>
        </BottomSheetView>
      </BottomSheet>

    </View>
  )
}

export default LoginWithPhoneNumber

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
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    marginLeft: 30,
    textAlign: 'center',
    fontWeight: 'semibold',
    color: '#000',
    fontSize: 14,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'semibold',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: '100%'
  },
  closeIcon1: {
    width: 18,
    height: 18,
  },
  troubleSubtitle: {
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 10,
    fontWeight: '700'
  },
  input: {
    width: 56,
    height: 56,
    textAlign: "center",
    borderWidth: 0.6,
    borderColor: '#BBBBBB',
    borderRadius: 5,
    fontSize: 18,
    marginHorizontal: 5,
  },
})