import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'

const HomeHeader = ({onPress}) => {
    return (
        <View style={styles.row}>
            <View style={{width : 20}}></View>
            <Text style={styles.title}>Home</Text>

            <TouchableOpacity onPress={onPress}>
                    <Image style={styles.chatIcon} source={require('../../assets/icons/ic_chat.png')} />
            </TouchableOpacity>

        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    row: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title : {
        fontSize: 24,
        fontWeight: 'bold',
        color : 'black',
    },
    chatIcon : {
        width : 30,
        height : 30,
    }
})