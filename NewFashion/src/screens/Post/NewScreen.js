import React from 'react';
import {StyleSheet, View} from "react-native";
import ItemPost from "./itemPost";

function NewScreen({navigation}) {
    const convert = (number) => {
        if (number < 1000) {
            return number.toString();
        }
        number = Math.floor(number / 1000)
        return `${number}K`;
    }
    const iProp = {
        shopName: 'NewFashion',
        time: '2 hours ago',
        imageUrl:  [
                'https://pub-6e2d2a5dd8884c0aba621d11584b9caf.r2.dev/58bda8bf5d2c2c5c12d3e3278b0022de.png',
                'https://pub-6e2d2a5dd8884c0aba621d11584b9caf.r2.dev/1738933284323-quanbo.png',
            ],
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.',
        likeCount: convert(320003),
        commentCount: convert(2000),
    };

    return (
        <View style={styles.container}>
            <ItemPost post={iProp} navigation={navigation} />
        </View>
    );
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding : 15
    }
})
export default NewScreen;