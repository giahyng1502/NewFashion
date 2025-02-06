import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff"}}>
      <View style={styles.container}>
        <View style={{alignSelf:'center'}}>
          <Image source={require('./images/logoNF.jpg')} style={styles.logo} />
        </View>
        <View >
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Registration is easy, just fill in the password.</Text>
        </View>

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Minimum 8 characters required"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={{fontWeight:'bold', fontSize:14,marginBottom:8}}>Password quality:</Text>
        <Text style={styles.passwordQuality}>
          Don't use a password from another site, or something too obvious like your pet's name.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By clicking Register, you agree to our <TouchableOpacity><Text style={styles.link}>Terms of Use</Text></TouchableOpacity> and <TouchableOpacity><Text style={styles.link}>Privacy Policy</Text></TouchableOpacity>.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#737373",
    marginBottom: 20,
    fontWeight:'600'
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordQuality: {
    fontSize: 13,
    color: "#737373",
    marginBottom: 20,
    fontWeight:'800'
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 13,
    color: "#1D1D1D",
    textAlign: "center",
  },
  link: {
    color: "#004D96",
    textDecorationLine: "underline",
    fontSize:13,
  },
});
export default RegisterScreen;
