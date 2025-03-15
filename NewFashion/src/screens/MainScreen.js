import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './Home/HomeScreen'
import CategoryScreen from './Category/CategoryScreen'
import NotificationScreen from './Notification/notification-screen'
import YouScreen from './You/YouScreen'
import CartScreen from './Cart/CartScreen'
import NewScreen from "./Post/NewScreen";
import SearchScreen from './SearchScreen'

const Tab = createBottomTabNavigator()

const MainScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName
                        let label

                        if (route.name === 'Home') {
                            iconName = focused ? require("../assets/icons/ic_homeSelected.png") : require("../assets/icons/ic_home.png");
                            label = 'Home'
                        } else if (route.name === 'Category') {
                            iconName = require("../assets/icons/ic_category.png");
                            label = 'Categories'
                        } else if (route.name === 'News') {
                            iconName = focused ? require("../assets/icons/ic_favouriteSelected.png") : require("../assets/icons/ic_favourite.png");
                            label = 'NF News'
                        } else if (route.name === 'Notification') {
                            iconName = require("../assets/icons/ic_notification.png");
                            label = 'Notification'
                        } else if (route.name === 'You') {
                            iconName = require("../assets/icons/ic_you.png");
                            label = 'You'
                        }

                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />
                            </View>
                        )
                    },
                    tabBarLabelStyle: styles.label, // Thêm style cho tiêu đề
                    tabBarStyle: styles.tabBar,
                    tabBarActiveTintColor: "#1D1D1D", // Màu chữ khi active
                    tabBarInactiveTintColor: "#737373", // Màu chữ khi không active
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Category" component={CategoryScreen} />
                <Tab.Screen name="News" component={NewScreen} />
                <Tab.Screen name="Notification" component={NotificationScreen} />
                <Tab.Screen name="You" component={YouScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
            </Tab.Navigator>
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
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
      },
})