import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Keyboard, Alert, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerSheet from './ImagePickerSheet';

const SearchBar = ({ disable, onSearch, onImagePicked }) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const actionSheetRef = useRef();

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(debouncedSearchText);
    }, 300);
    return () => clearTimeout(handler);
  }, [debouncedSearchText]);

  const handleTextChange = (text) => {
    setSearchText(text);
    setDebouncedSearchText(text);
  };

  const handleClearText = () => {
    setSearchText('');
    setDebouncedSearchText('');
  };

  const openActionSheet = () => {
    if (!disable) return;
    actionSheetRef.current?.show();
  };

  const handleAction = async (index) => {
    try {
      if (index === 0) {
        // Chụp ảnh
        const image = await ImagePicker.openCamera({
          cropping: false,
          width: 300,
          height: 300,
        });
        onImagePicked?.(image);
      } else if (index === 1) {
        // Chọn từ thư viện
        const image = await ImagePicker.openPicker({
          cropping: false,
          width: 300,
          height: 300,
          cropperToolbarTitle: 'Cắt ảnh',
        });
        onImagePicked?.(image);
      }
      actionSheetRef.current?.hide();
    } catch (error) {
      if (error.message !== 'User cancelled image selection') {
        Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
        console.error(error);
      }
    }
  };

  const handleSubmitEditing = () => {
    onSearch(searchText);
    Keyboard.dismiss();
  };

  return (
      <View style={styles.searchContainer}>
        <TextInput
            value={searchText}
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            placeholderTextColor={'#bbb'}
            onChangeText={handleTextChange}
            onSubmitEditing={handleSubmitEditing}
            editable={disable}
        />
        {searchText.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearText}>
              <Image source={require('../assets/bt_clearText.png')} style={styles.icon} />
            </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.searchButton} onPress={openActionSheet}>
          <Image source={require('../assets/icons/ic_camera.png')} style={styles.searchIcon} />
        </TouchableOpacity>

        {/* Bottom Sheet */}
        <ImagePickerSheet ref={actionSheetRef} onActionSelect={handleAction} />
      </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    color: '#000',
  },
  clearButton: {
    padding: 5,
  },
  searchButton: {
    margin: 3,
    padding: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  searchIcon: {
    width: 32,
    height: 32,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 7,
    resizeMode: 'contain',
  },
});

export default SearchBar;
