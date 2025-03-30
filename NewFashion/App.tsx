import { SafeAreaView } from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider, useSelector} from 'react-redux'; // Chỉ dùng Provider ở đây
import store from './src/redux/store';
import { SocketProvider } from './src/context/socketContext';
import {configureGoogleSignIn} from './src/firebase/configAuth';

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
        //config auth login google
        configureGoogleSignIn();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1}}>
            <SocketProvider userId={userId}>
                <AppNavigator />
            </SocketProvider>
        </SafeAreaView>
    );
};

export default AppWrapper;
