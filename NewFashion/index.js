/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import messaging from "@react-native-firebase/messaging";
import notifee, {AndroidImportance} from "@notifee/react-native";
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Thông báo nhận được khi ứng dụng chạy nền:', remoteMessage);
    await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Thông báo mới',
        body: remoteMessage.notification?.body || '',
        android: {
            channelId: 'default',
            smallIcon: 'ic_launcher',
            importance: AndroidImportance.HIGH,
            pressAction: {
                id: 'default',
            },
        },
    });
});
AppRegistry.registerComponent(appName, () => App);
