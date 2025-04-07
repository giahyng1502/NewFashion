import React, { useEffect } from "react";
import Toast from "react-native-toast-message";

const NotificationDisplay = ({notification}) => {

    useEffect(() => {
        console.log("Notifications from Redux: ", notification);
        if (notification) {
            // Hiển thị thông báo mới nhất bằng toast
            Toast.show({
                type: 'info',
                position: 'top',
                text1: 'Thông báo đơn hàng',
                text2: notification.message,
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 60,
                onPress: () => console.log("Thông báo đã được nhấn"),

                // Tùy chỉnh cỡ chữ cho text1 và text2
                text1Style: {
                    fontSize: 18, // Cỡ chữ cho tiêu đề
                    fontWeight: 'bold', // Đậm cho tiêu đề
                    color: 'black', // Màu chữ cho tiêu đề
                },
                text2Style: {
                    fontSize: 14, // Cỡ chữ cho nội dung
                    color: 'gray', // Màu chữ cho nội dung
                },
            });
        }
    }, [notification]); // Khi có thông báo mới, sẽ hiển thị

    return <Toast />;
};

export default NotificationDisplay;
