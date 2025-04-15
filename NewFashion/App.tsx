import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider, useDispatch, useSelector } from 'react-redux'; // Chỉ dùng Provider ở đây
import store from './src/redux/store';
import { SocketProvider } from './src/context/socketContext';
import { configureGoogleSignIn } from './src/firebase/configAuth';
import { setUser } from "./src/redux/reducer/userReducer";
import AppManager from "./src/utils/AppManager";
import { SafeAreaView } from 'react-native-safe-area-context'
import {createNotificationChannel, requestUserPermission} from "./src/firebase/notifice";
import messaging from "@react-native-firebase/messaging";
import axios from "./src/service/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setupNotificationHandlers} from "./src/utils/notificationService";

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

const App = () => {
    const dispatch = useDispatch();
    // Lấy userId sau khi Redux Provider đã được khởi tạo
    const userId = useSelector((state) => state.user?.userId);
    const [notification, setNotification] = useState(null)

    // Lấy thông tin user từ AppManager khi ứng dụng mở
    useEffect(() => {
        const fetchUserData = async () => {
            await AppManager.shared.loadUserInfo();
            const [user] = await Promise.all([AppManager.shared.getUserInfo()]);
            if (user) {
                dispatch(setUser(user)); // Cập nhật Redux store
            }
        };
        fetchUserData();
    }, [dispatch]);
    // config firebaseAuth
    useEffect(() => {
        // Khóa màn hình theo chiều dọc khi ứng dụng bắt đầu
        // Orientation.lockToPortrait();
        configureGoogleSignIn();

        // Cleanup function để hủy khóa khi ứng dụng kết thúc
        // return () => {
        //     Orientation.unlockAllOrientations();
        // };
    }, []);
    // Xin quyền và lấy token drive
    useEffect(() => {
        requestUserPermission()
    }, [userId]);

    useEffect(() => {
        let unsubscribe  : any;
        const init = async () => {
            unsubscribe = await setupNotificationHandlers();
            await createNotificationChannel();
        };
        init();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);
        useEffect(() => {
            const unsubscribe = messaging().onTokenRefresh(async (newToken) => {
                console.log('📤 Token refreshed:', newToken);
                await axios.post('/users/saveDevice', {
                    token: newToken,
                });
                await AsyncStorage.setItem('fcmToken', newToken);
            });

            return () => {
                unsubscribe();
            };
    }, [userId]);
    return (
        <SafeAreaView style={{ flex: 1 ,margin : 0}}>
            <SocketProvider userId={userId} setNotification={setNotification}>
                <AppNavigator />
            </SocketProvider>

        </SafeAreaView>
    );
};

export default AppWrapper;