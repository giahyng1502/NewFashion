import { Image, Animated, StyleSheet, Text, TouchableOpacity, View, Easing } from 'react-native'
import React, { useRef, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Home/HomeScreen'
import CategoryScreen from '../Category/CategoryScreen'
import NotificationScreen from '../Notification/NotificationScreen'
import YouScreen from '../You/YouScreen'
import NFNewsScreen from '../NFNews/FavouriteScreen'
import ScreenSize from '../../contants/ScreenSize'
import BenefitsInfoBox from '../../components/BenefitsInfoBox'
import OutlinedButton from '../../components/OutlinedButton'

const Tab = createBottomTabNavigator()

const MainScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName

                        if (route.name === 'Home') {
                            iconName = focused ? require("../../assets/icons/ic_homeSelected.png") : require("../../assets/icons/ic_home.png");
                        } else if (route.name === 'Category') {
                            iconName = require("../../assets/icons/ic_category.png");
                        } else if (route.name === 'NF News') {
                            iconName = focused ? require("../../assets/icons/ic_newsSelected.png") : require("../../assets/icons/ic_news.png");
                        } else if (route.name === 'Notification') {
                            iconName = focused ? require("../../assets/icons/ic_notificationSelected.png") : require("../../assets/icons/ic_notification.png");
                        } else if (route.name === 'You') {
                            iconName = require("../../assets/icons/ic_you.png");
                        }

                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />
                            </View>
                        )
                    },
                    tabBarLabelStyle: st.label, // Thêm style cho tiêu đề
                    tabBarStyle: st.tabBar,
                    tabBarActiveTintColor: "#1D1D1D", // Màu chữ khi active
                    tabBarInactiveTintColor: "#737373", // Màu chữ khi không active
                })}
            >
                <Tab.Screen name="Home">
                    {props => <HomeScreen {...props} pushScreen={(screenName) => navigation.navigate(screenName)} />}
                </Tab.Screen>
                <Tab.Screen name="Category" component={CategoryScreen} />
                <Tab.Screen name="NF News" component={NFNewsScreen} />
                <Tab.Screen name="Notification" component={NotificationScreen} />
                <Tab.Screen name="You" component={YouScreen} />
            </Tab.Navigator>
        </View>
    )
}

export default MainScreen

const st = StyleSheet.create({
    tabBar: {
        backgroundColor: "#fff",
        height: 60,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    icon: {
        width: 24,
        height: 24,
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        paddingBottom: 5,
    }
})