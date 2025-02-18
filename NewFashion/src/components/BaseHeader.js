import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

const BaseHeader = ({ title, showLeftButton, showRightButton, rightIcon, onLeftButtonPress, onRightButtonPress }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>{title}</Text>
            {showLeftButton && (
                <TouchableOpacity onPress={onLeftButtonPress} style={styles.button}>
                    <Image source={require('../assets/ic_back.png')} resizeMode='contain' style={styles.buttonIcon} />
                </TouchableOpacity>
            )}

            {showRightButton && (
                <TouchableOpacity onPress={onRightButtonPress} style={styles.button}>
                    <Image source={rightIcon} resizeMode='contain' style={styles.buttonIcon} />
                </TouchableOpacity>
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
        paddingVertical: 0,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
        textAlign: 'center',
        width: '100%'
    },
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonIcon: {
        width: 24,
        height: 24,
    }
})