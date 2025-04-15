import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "../service/axios";
import notifee, {AndroidImportance} from '@notifee/react-native';

// Hàm tạo kênh thông báo
export async function createNotificationChannel() {
    const channelId = 'default';  // ID của kênh thông báo

    // Kiểm tra xem kênh đã tồn tại hay chưa
    const channels = await notifee.getChannels();
    console.log(channels);
    if (channels.some(channel => channel.id === channelId)) {
        return;  // Nếu kênh đã tồn tại, không cần tạo lại
    }

    // Tạo kênh thông báo mới
    await notifee.createChannel({
        id: channelId,  // ID kênh thông báo
        name: 'Default Channel',  // Tên kênh
        importance: AndroidImportance.HIGH,  // Độ quan trọng của thông báo
    });
}

export async function requestUserPermission() {
    try {
        // Yêu cầu quyền thông báo từ notifee
        const settings = await notifee.requestPermission();

        if (settings.authorizationStatus >= 1) {
            console.log('✅ Notifee Permission granted');
            // Sau khi có quyền từ notifee, yêu cầu quyền FCM và lấy token
            await requestFCMToken();
        } else {
            console.log('❌ Notifee Permission denied');
        }
    } catch (error) {
        console.error('❌ Error while requesting permission:', error);
    }
}
export async function requestFCMToken() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('✅ FCM Permission granted!');
        await getAndSendFCMToken();
    } else {
        console.log('❌ Permission denied');
    }
}

export async function getAndSendFCMToken() {
    try {
        const token = await messaging().getToken();
        const savedToken = await AsyncStorage.getItem('fcmToken');

        if (token && token !== savedToken) {
            console.log('📤 Sending new FCM token to backend:', token);
            await axios.post('/users/saveDevice', {
                token: token,
            })

            await AsyncStorage.setItem('fcmToken', token);
        } else {
            console.log('✅ Token unchanged, not sending again');
        }
    } catch (error) {
        console.error('❌ Error while sending FCM token:', error);
    }
}
