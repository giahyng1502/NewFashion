import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, Pressable } from 'react-native';

export const TextFieldType = Object.freeze({
  PHONENUMBER: 'phoneNumber',
  TEXT: 'text',
  PASSWORD: 'password',
  DROPDOWN: 'dropdown',
});

const TextField = ({
  type = TextFieldType.TEXT,
  placeholder,
  customStyle,
  onChangeText,
  value = '',
  onDropdown,
  onBlur,
  error = false
}) => {
  const [text, setText] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const clearText = () => {
    handleChangeText('');
  };

  const onDropdownPress = () => {
    if (type === TextFieldType.DROPDOWN) {
      onDropdown && onDropdown();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeText = (text) => {
    setText(text);
    onChangeText && onChangeText(text);
  }

  useEffect(() => {
    if (type === TextFieldType.DROPDOWN) {
      setText('Select');
    }
  }, []);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <Pressable
      onPress={type === TextFieldType.DROPDOWN ? onDropdownPress : null}
      style={[styles.container, customStyle, (error) ? styles.errorBorder : styles.defaultBorder]}
    >
      <TextInput
        style={styles.textInput}
        value={text}
        editable={type !== TextFieldType.DROPDOWN}
        onChangeText={handleChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        secureTextEntry={type === TextFieldType.PASSWORD && !showPassword}
        keyboardType={type === TextFieldType.PHONENUMBER ? 'phone-pad' : 'default'}
      />

      {text.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={type !== TextFieldType.DROPDOWN ? clearText : null}>
          {type === TextFieldType.DROPDOWN ? (
            <Image source={require('../assets/icons/ic_arrowDown.png')} style={styles.icon} resizeMode='contain' />
          ) : (
            <Image source={require('../assets/bt_clearText.png')} style={styles.icon} />
          )}
        </TouchableOpacity>
      )}

      {type === TextFieldType.PASSWORD && (
        <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
          <Image
            source={showPassword ? require('../assets/bt_showPassword.png') : require('../assets/bt_hiddenPassword.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  defaultBorder: {
    borderWidth: 1,
    borderColor: '#737373',
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
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
