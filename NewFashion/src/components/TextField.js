import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TextField = ({ isPassword = false, placeholder, customStyle, onChangeText }) => {
  const [text, setText] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const clearText = () => {
    handleChangeText('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeText = (text) => {
    setText(text);
    onChangeText && onChangeText(text);
  }

  return (
    <View style={[styles.container, customStyle]}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        secureTextEntry={isPassword && !showPassword}
      />

      {text.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearText}>
          <Image source={require('../asset/bt_clearText.png')} style={styles.icon} />
        </TouchableOpacity>
      )}

      {isPassword && (
        <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
          <Image
            source={showPassword ? require('../asset/bt_showPassword.png') : require('../asset/bt_hiddenPassword.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#737373',
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },
  clearButton: {
    padding: 5,
  },
  eyeButton: {
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
