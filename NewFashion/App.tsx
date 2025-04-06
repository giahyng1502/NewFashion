import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider, useSelector} from 'react-redux'; // Chỉ dùng Provider ở đây
import store from './src/redux/store';
import { SocketProvider } from './src/context/socketContext';
import {configureGoogleSignIn} from './src/firebase/configAuth';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

const App = () => {
    // Lấy userId sau khi Redux Provider đã được khởi tạo
    const userId = useSelector((state) => state.user.userId);
    
    useEffect(() => {
        // Khóa màn hình theo chiều dọc khi ứng dụng bắt đầu
        Orientation.lockToPortrait();
        configureGoogleSignIn();
    
        return () => {
          // Hủy khóa khi ứng dụng kết thúc
          Orientation.unlockAllOrientations();
        };
      }, []);
    return (
        <SafeAreaView style={{ flex:1 }}>
            <SocketProvider userId={userId}>
                <AppNavigator />
            </SocketProvider>
        </SafeAreaView>
    );
};

export default AppWrapper;
