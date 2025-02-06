import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const SplashScreen1 = () => {
    return (
        <View style={st.container}>
            <Image
                source={require('../assets/img_logo.png')}
                style={st.image} />
        </View>
    )
}

export default SplashScreen1

const st = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
})