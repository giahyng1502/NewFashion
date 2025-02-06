import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import TextField from "../components/TextField";
import ScreenSize from "../contants/ScreenSize";
import PasswordStrengthBar from "../components/PasswordStrengthBar";
import FilledButton from "../components/FilledButton";

const RegisterWithEmailScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strengLabel, setStrengLabel] = useState("");

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
      <View >
        <Text style={st.title}>Create your account</Text>
        <Text style={st.subtitle}>Registration is easy, just fill in the password.</Text>
      </View>

      <Text style={st.label}>Email *</Text>
      <TextField placeholder="Enter your email" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} />
      <Text style={st.label}>Password *</Text>
      <TextField isPassword={true} placeholder="Enter your password" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} onChangeText={setPassword} />
      <PasswordStrengthBar password={password} customStyle={{ width: ScreenSize.width - 40, marginTop: 10 }} onChangeText={setStrengLabel} />

      <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 8 }}>Password quality: {strengLabel}</Text>
      <Text style={st.passwordQuality}>
        Don't use a password from another site, or something too obvious like your pet's name.
      </Text>

      <FilledButton title="Register" customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }} />


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
    backgroundColor: "#fff",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#737373",
    marginBottom: 20,
    fontWeight: '600'
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  passwordQuality: {
    fontSize: 13,
    color: "#737373",
    marginBottom: 20,
    fontWeight: '800'
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  termsText: {
    textAlign: 'center',
    fontWeight: 'semibold',
    color: '#000',
    marginTop: 10,
    fontSize: 14,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'semibold',
  },
});

export default RegisterWithEmailScreen;
