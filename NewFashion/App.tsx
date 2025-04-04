import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider, useDispatch, useSelector } from 'react-redux'; // Chỉ dùng Provider ở đây
import store from './src/redux/store';
import { SocketProvider } from './src/context/socketContext';
import { configureGoogleSignIn } from './src/firebase/configAuth';
import { setUser } from "./src/redux/reducer/userReducer";
import AppManager from "./src/utils/AppManager";
import Orientation from 'react-native-orientation-locker';
import { SafeAreaView } from 'react-native-safe-area-context'

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


    useEffect(() => {
        // Lấy thông tin user từ AppManager khi ứng dụng mở
        const fetchUserData = async () => {
            await AppManager.shared.loadUserInfo();
            const [user] = await Promise.all([AppManager.shared.getUserInfo()]);
            if (user) {
                dispatch(setUser(user)); // Cập nhật Redux store
            }
        };
        fetchUserData();
    }, [dispatch]);

    // useEffect(() => {
    //     // Khóa màn hình theo chiều dọc khi ứng dụng bắt đầu
    //     // Orientation.lockToPortrait();
    //     configureGoogleSignIn();
    //
    //     // Cleanup function để hủy khóa khi ứng dụng kết thúc
    //     return () => {
    //         Orientation.unlockAllOrientations();
    //     };
    // }, []);

    return (
        <SafeAreaView style={{ flex: 1 ,margin : 0}}>
            <SocketProvider userId={userId}>
                <AppNavigator />
            </SocketProvider>
        </SafeAreaView>
    );
};

export default AppWrapper;