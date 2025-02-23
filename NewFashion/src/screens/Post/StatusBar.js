import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LikePost from "../../components/LikePost";
import ButtonWithLeftIcon from "../../components/ButtonWithLeftIcon";

function StatusBar({likeCount,commentCount,rateCount,soldCount,islike}) {

    return (
        <View style={styles.statusBar}>

            <LikePost count={likeCount} islike={islike} />
            <ButtonWithLeftIcon count={commentCount} icon={require('../../assets/icons/ic_comment.png')} />
            <ButtonWithLeftIcon count={rateCount} icon={require('../../assets/icons/ic_star_post.png')}/>
            <ButtonWithLeftIcon count={soldCount} icon={require('../../assets/icons/ic_sold.png')}/>
        </View>
    );
}
const styles = StyleSheet.create({
    statusBar: {
        paddingVertical : 15,
        flexDirection : 'row',
        marginTop : 10,
        display : 'flex',
        justifyContent : 'space-around',
        borderTopWidth : 2,
        borderStyle : 'dashed',
        borderBottomWidth : 2,
    },
});
export default StatusBar;