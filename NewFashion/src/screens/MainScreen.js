import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './Home/HomeScreen'
import CategoryScreen from './Category/CategoryScreen'
import YouScreen from './You/YouScreen'
import NewScreen from "./Post/NewScreen";

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

                        if (route.name === 'Trang chủ') {
                            iconName = focused ? require("../assets/icons/ic_homeSelected.png") : require("../assets/icons/ic_home.png");
                            label = 'Trang chủ'
                        } else if (route.name === 'Danh mục') {
                            iconName = require("../assets/icons/ic_category.png");
                            label = 'Danh mục'
                        } else if (route.name === 'Tin tức') {
                            iconName = focused ? require("../assets/icons/ic_favouriteSelected.png") : require("../assets/icons/ic_favourite.png");
                            label = 'Tin tức'
                        } else if (route.name === 'Cá nhân') {
                            iconName = require("../assets/icons/ic_you.png");
                            label = 'Cá nhân'
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
                <Tab.Screen name="Trang chủ" component={HomeScreen} />
                <Tab.Screen name="Danh mục" component={CategoryScreen} />
                <Tab.Screen name="Tin tức" component={NewScreen} />
                <Tab.Screen name="Cá nhân" component={YouScreen} />
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