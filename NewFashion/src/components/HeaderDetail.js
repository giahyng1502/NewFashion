import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

function HeaderDetail({navigation,title}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
                <Image style={styles.image} source={require('../assets/icons/ic_back.png')} />
            </TouchableOpacity>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={{width : 40}}/>
        </View>
    );
}
const styles = StyleSheet.create({
    title : {
        fontSize: 22,
        fontWeight: 'bold',
    },
    container: {
        height : 70,
        alignItems: 'center',
        alignContent : 'center',
        justifyContent : 'space-between',
        padding : 15,
        flexDirection: 'row',
    },
    image: {
        width : 18,
        height : 25,
    }
})
export default HeaderDetail;