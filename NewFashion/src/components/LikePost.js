import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";



function LikePost({count,isLike}) {
    const [like, setLike] = useState(isLike);

    return (
            <TouchableOpacity style={styles.button} onPress={() => {
                setLike(!isLike)
                console.log(like)
            }} activeOpacity={1}>

                <Image style={styles.likeBtn} source={isLike ? require('../assets/icons/ic_select_like.png') : require('../assets/icons/ic_like.png')} />
                <Text style={{fontSize : 16, fontWeight: 'bold'}}>
                    {count}
                </Text>
            </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button : {
        width : 'auto',
        display: 'flex',
        alignContent : 'center',
        justifyContent : 'center',
        alignItems: 'center',
        flexDirection : 'row',
    },
    likeBtn : {
        width : 32,
        height : 32,
        marginRight : 3
    },
});
export default LikePost;