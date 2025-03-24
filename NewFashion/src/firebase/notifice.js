import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('FCM Permission granted!');
        await getFCMToken();
    }
}

async function getFCMToken() {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    // Gửi token này lên backend để lưu vào DB
}

export default requestUserPermission