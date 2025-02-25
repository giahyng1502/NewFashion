import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const BaseHeader = ({ title, showLeftButton, showRightButton, rightIcon, onLeftButtonPress, onRightButtonPress }) => {
    return (
        <View style={styles.headerContainer}>
            {showLeftButton ? (
                <TouchableOpacity onPress={onLeftButtonPress} style={styles.button}>
                    <Image source={require('../assets/ic_back.png')} resizeMode='contain' style={styles.buttonIcon} />
                </TouchableOpacity>
            ) : (
                <View style={styles.button} />
            )}
            <Text style={styles.title}>{title}</Text>
            {showRightButton ? (
                <TouchableOpacity onPress={onRightButtonPress} style={styles.button}>
                    <Image source={rightIcon} resizeMode='contain' style={styles.buttonIcon} />
                </TouchableOpacity>
            ) : (
                <View style={[styles.button, { backgroundColor: 'transparent' }]} />
            )}
        </View>
    )
}

export default BaseHeader

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        width: '100%'
    },
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
    },
    buttonIcon: {
        width: 24,
        height: 24,
    }
})