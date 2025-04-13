import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {Platform, Alert} from 'react-native';

export async function requestPermission({type = 'gallery', onBlocked} = {}) {
  let permission;

  if (type === 'gallery') {
    permission =
      Platform.OS === 'android'
        ? Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY;
  } else if (type === 'camera') {
    permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;
  }

  const result = await check(permission);

  if (result === RESULTS.GRANTED) return true;

  if (result === RESULTS.BLOCKED) {
    Alert.alert(
      'Cấp quyền bị từ chối',
      `Truy cập ${
        type === 'camera' ? 'máy ảnh' : 'thư viện'
      } đã bị chặn. Vui lòng bật trong Cài đặt.`,
      [
        {text: 'Huỷ', style: 'cancel'},
        {
          text: 'Mở cài đặt',
          onPress: () => {
            openSettings();
            onBlocked?.();
          },
        },
      ],
    );
    return false;
  }

  const requestResult = await request(permission);
  return requestResult === RESULTS.GRANTED;
}
