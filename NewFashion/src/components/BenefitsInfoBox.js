import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BenefitsInfoBox = ({ icon, title, subtitle }) => {
    return (
        <View style={st.container}>
            <View style={st.iconContainer}>
                <Image source={icon} style={st.icon} resizeMode='contain' />
            </View>
            <Text style={st.title}>{title}</Text>
            <Text style={st.subtitle}>{subtitle}</Text>
        </View>
    )
}

export default BenefitsInfoBox

const st = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 25,
        height: 25,
    },
    title: {
        color: '#000',
        fontSize: 14,
        fontWeight: '900',
        marginTop: 4,
    },
    subtitle: {
        color: '#000',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4,
    },
})