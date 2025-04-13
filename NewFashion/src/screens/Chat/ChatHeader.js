import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'

const ChatHeader = ({onPress}) => {
    return (
        <View style={styles.row}>
            <TouchableOpacity onPress={onPress}>
                <Image style={styles.backIcon} source={require('../../assets/ic_back-filled.png')} />
            </TouchableOpacity>
            <Text style={styles.title}>Trò chuyện</Text>
            <View style={{width : 20}}></View>
        </View>
    )
}

export default ChatHeader;

const styles = StyleSheet.create({
    row: {
        height: "auto",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title : {
        fontSize: 24,
        fontWeight: 'bold',
        color : 'black',
    },
    backIcon : {
        width : 12,
        height : 30,
    }
})