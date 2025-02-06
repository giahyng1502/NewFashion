import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from '../screens/Home/HomeScreen';
import CategoryScreen from '../screens/Category/CategoryScreen';
import VideoScreen from '../screens/Video/VideoScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import YouScreen from '../screens/You/YouScreen';

import homeIcon from "../assets/icons/home-active-2x.png";
import categoryIcon from "../assets/icons/categories-2x.png";
import videoIcon from "../assets/icons/video-2x.png";
import notificationIcon from "../assets/icons/notification-2x.png";
import youIcon from "../assets/icons/you-2x.png";

import { BottomTabParamList } from "./types";
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource;
            switch (route.name) {
              case "Home":
                iconSource = homeIcon;
                break;
              case "Category":
                iconSource = categoryIcon;
                break;
              case "Video":
                iconSource = videoIcon;
                break;
              case "Notification":
                iconSource = notificationIcon;
                break;
              case "You":
                iconSource = youIcon;
                break;
              default:
                iconSource = homeIcon;
            }

            return (
              <Image
                source={iconSource}
                style={[styles.icon, { tintColor: focused ? "#1D1D1D" : "#737373" }]}
              />
            );
          },
          tabBarLabelStyle: styles.label, // Thêm style cho tiêu đề
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: "#1D1D1D", // Màu chữ khi active
          tabBarInactiveTintColor: "#737373", // Màu chữ khi không active
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
        <Tab.Screen name="Category" component={CategoryScreen} options={{ title: "Categories" }} />
        <Tab.Screen name="Video" component={VideoScreen} options={{ title: "Video" }} />
        <Tab.Screen name="Notification" component={NotificationScreen} options={{ title: "Notification" }} />
        <Tab.Screen name="You" component={YouScreen} options={{ title: "You" }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default BottomTabNavigator

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