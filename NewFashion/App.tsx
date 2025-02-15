import { SafeAreaView } from "react-native";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux"; // Chỉ dùng Provider ở đây
import store from "./src/redux/store";
import { SocketProvider } from "./src/context/socketContext";
import { useSelector } from "react-redux"; // Import để sử dụng bên trong component con

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

const App = () => {
    // Lấy userId sau khi Redux Provider đã được khởi tạo
    const userId = useSelector((state) => state.user?.userId);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SocketProvider userId={userId}>
                <AppNavigator />
            </SocketProvider>
        </SafeAreaView>
    );
};

export default AppWrapper;
