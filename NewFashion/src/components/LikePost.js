import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import axios from "../service/axios";



function LikePost({likeCount,isLike,commentId}) {
    const [count, setCount] = useState(likeCount)
    const [like, setLike] = useState(isLike)
    const handleLikeComment = async () => {
        try {
            const res = await axios.post(`/comment/like/${commentId}`);
            if (res.isLike !== isLike) {
                setLike(!like);
                if (res.isLike === false) {
                    setCount(count - 1);
                }else{
                    setCount(count + 1);
                }
            }
        }catch(err) {

        }
    }

    return (
            <TouchableOpacity style={styles.button} onPress={handleLikeComment} activeOpacity={1}>

                <Image style={styles.likeBtn} source={like ? require('../assets/icons/ic_select_like.png') : require('../assets/icons/ic_like.png')} />
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