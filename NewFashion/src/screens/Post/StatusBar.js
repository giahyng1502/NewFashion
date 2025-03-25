import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LikePost from "../../components/LikePost";
import ButtonWithLeftIcon from "../../components/ButtonWithLeftIcon";

function StatusBar({likeCount,commentCount,isLike}) {

    return (
        <View style={styles.statusBar}>
            <LikePost count={likeCount} islike={isLike} />
            <ButtonWithLeftIcon count={commentCount} icon={require('../../assets/icons/ic_comment.png')} />
        </View>
    );
}
const styles = StyleSheet.create({
    statusBar: {
        paddingVertical : 15,
        flexDirection : 'row',
        marginEnd : 10,
        display : 'flex',
        justifyContent : 'space-around',
        borderBottomWidth : 1,
        borderBottomColor : 'gray',
    },
});
export default StatusBar;