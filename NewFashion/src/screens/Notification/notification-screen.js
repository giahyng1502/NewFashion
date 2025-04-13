import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import React, {useEffect} from 'react'
import NotificationList from "./notifice-list-custom";
import BaseHeader from '../../components/BaseHeader';
import {useDispatch, useSelector} from "react-redux";
import {getNotifications} from "../../redux/actions/notificationActions";

const NotificationScreen = ({navigation}) => {
    const {isLoading,notifications} = useSelector(state => state.notification);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNotifications())
    }, [dispatch]);
    return (
        <View style={styles.container}>
            <BaseHeader title="Thông báo" showLeftButton={true} onLeftButtonPress={() => navigation.goBack()}/>
            {
                isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                    <NotificationList notifications={notifications} />
                )
        }
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})