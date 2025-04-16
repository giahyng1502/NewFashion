import messaging from "@react-native-firebase/messaging";
import notifee, {AndroidImportance} from "@notifee/react-native";

export async function setupNotificationHandlers() {
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
        console.log('📩 Thông báo nhận khi app đang mở:', remoteMessage);

        await notifee.displayNotification({
            title: remoteMessage.data?.title || 'Thông báo mới',
            body: remoteMessage.data?.body || '',
            android: {
                channelId: 'default',
                importance: AndroidImportance.HIGH,  // Độ quan trọng của thông báo
                smallIcon: 'ic_launcher',
                pressAction: {
                    id: 'default',
                },
            },
        });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('⏪ App mở từ background do người dùng bấm vào thông báo:', remoteMessage);
    });

    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
        console.log('🚀 App mở từ trạng thái tắt nhờ thông báo:', initialNotification);
    }

    return unsubscribeOnMessage;
}
