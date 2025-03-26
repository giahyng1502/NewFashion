import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationList from "./notifice-list-custom";
import BaseHeader from '../../components/BaseHeader';
const notifications = [
    {
        _id: "1",
        avatar: "https://pub-6e2d2a5dd8884c0aba621d11584b9caf.r2.dev/avatar.jpg",
        type: 0,
        contentId: "123", // ID của nội dung liên quan (ví dụ: đơn hàng, sản phẩm)
        imageUrl: "https://pub-6e2d2a5dd8884c0aba621d11584b9caf.r2.dev/58bda8bf5d2c2c5c12d3e3278b0022de.png",
        message: "Đơn hàng đã giao!",
        timestamp: "2025-02-24T10:30:00Z"
    },

    {
        _id: "2",
        avatar: "https://pub-6e2d2a5dd8884c0aba621d11584b9caf.r2.dev/avatar.jpg",
        type: 1,
        imageUrl: "https://pub-6e2d2a5dd8884c0aba621d11584b9caf.r2.dev/58bda8bf5d2c2c5c12d3e3278b0022de.png",

        contentId: "456",
        message: "@kimngan.nef_, @_hgiangdang_, and 17 others liked your comment.",
        timestamp: "2025-02-22T15:45:00Z"
    },
    {
        _id: "3",
        avatar: "https://pub-6e2d2a5dd8884c0aba621d11584b9caf.r2.dev/avatar.jpg",
        imageUrl: "https://pub-6e2d2a5dd8884c0aba621d11584b9caf.r2.dev/58bda8bf5d2c2c5c12d3e3278b0022de.png",
        type: 2,
        contentId: "789",
        message: "@_hgiangdang_, and 17 others reply your comment.",
        timestamp: "2020-02-21T09:00:00Z"
    }
];

const NotificationScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <BaseHeader title="Notifications" showLeftButton={true} onLeftButtonPress={() => navigation.goBack()}/>
            <NotificationList notifications={notifications} />
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})