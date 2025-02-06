import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const types = () => {
    return (
        <View>
            <Text>types</Text>
        </View>
    )
}

export default types

const styles = StyleSheet.create({})

export type BottomTabParamList = {
    Home: undefined;
    Category: undefined;
    Video: undefined;
    Notification: undefined;
    You: undefined;
};