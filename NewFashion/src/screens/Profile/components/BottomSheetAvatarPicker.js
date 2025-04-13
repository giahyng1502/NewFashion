import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {requestPermission} from '../../../utils/permissions';
import {useRetryAfterSettings} from '../../../hooks/useRetryAfterSettings';
import {useNavigation} from '@react-navigation/native';
import {TYPE_PICKER} from '../../../contants';

export default function BottomSheetAvatarPicker() {
  const bottomSheet = useBottomSheet();
  const navigation = useNavigation();
  const [retryAction, setRetryAction] = useState(null);

  useRetryAfterSettings(retryAction);

  const handleUpdateAvatar = async type => {
    const granted = await requestPermission({
      type,
      onBlocked: () => setRetryAction(() => handleUpdateAvatar(type)),
    });

    if (granted) {
      await updateAvatar(type);
    }
  };

  const updateAvatar = async type => {
    try {
      const pickerData = {
        mediaType: 'photo',
        includeBase64: true,
        width: 300,
        height: 300,
        compressImageQuality: 0.7,
      };

      let imagePicker;
      if (type === TYPE_PICKER.GALLERY) {
        imagePicker = await ImagePicker.openPicker(pickerData);
      } else {
        imagePicker = await ImagePicker.openCamera(pickerData);
      }
      bottomSheet.close();

      if (imagePicker?.path) {
        navigation.push('CircularCropScreen', {
          imagePath: imagePicker.path,
        });
      }
    } catch (err) {
      console.log('Lỗi cập nhật ảnh đại diện:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleUpdateAvatar(TYPE_PICKER.GALLERY)}>
        <Text style={styles.text}>Chọn từ thư viện</Text>
      </TouchableOpacity>
      <View style={{height: 0.6, backgroundColor: '#CCCCCC'}}>
        <Text>
          ------------------------------------------------------------------------
          -------------------------------------
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleUpdateAvatar(TYPE_PICKER.CAMERA)}>
        <Text style={styles.text}>Chụp ảnh</Text>
      </TouchableOpacity>
      <View style={{height: 8, backgroundColor: '#EEEEEE'}}>
        <Text>
          ------------------------------------------------------------------------
          -------------------------------------
        </Text>
      </View>
      <TouchableOpacity onPress={() => bottomSheet.close()}>
        <Text style={styles.text}>Huỷ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
