import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function ButtonWithLeftIcon({ count, icon, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
            <Image style={styles.icon} source={icon} />
            <Text style={styles.count}>{count}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 5,
        resizeMode: 'contain', // Giúp icon hiển thị tốt hơn
    },
    count: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ButtonWithLeftIcon;
