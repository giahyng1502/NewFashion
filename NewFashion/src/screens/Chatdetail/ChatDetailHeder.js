import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'

const ChatDetaiHeader = ({onPress,user}) => {
    return (
        <View style={styles.row}>
            <TouchableOpacity onPress={onPress}>
                <Image style={styles.backIcon} source={require('../../assets/ic_back-filled.png')} />
            </TouchableOpacity>
            <View style={styles.userbox}>
                <View style={styles.position}>
                    <Image src={user.avatar} style={styles.avatar} />
                    <View style={user.online ? styles.dot : null}></View>
                </View>
                <View style={styles.inforBox}>
                    <View>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.online}>{user.online ? 'online' : 'offline'}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex : 1}}></View>
        </View>
    )
}

export default ChatDetaiHeader;

const styles = StyleSheet.create({
    userbox : {
        flexDirection: 'row',
        flex : 3,
        justifyContent : "flex-start",
        marginLeft : 20
    },
    row: {
        height: "auto",
        flexDirection: 'row',
        alignItems: "center"
    },
    avatar : {
      width : 50,
      height: 50,
      borderRadius: 50,
    },
    title : {
        fontSize: 24,
        fontWeight: 'bold',
        color : 'black',
    },
    backIcon : {
        width : 12,
        height : 30,
    },
    inforBox: {
        flexDirection : 'column',
    },
    userName : {
        fontSize: 20,
        fontWeight: 'bold',
    },
    online: {
        fontSize: 16,
        color: '#012ee6',
    },
    position : {
        display: 'flex',
        position: 'relative',
        marginRight : 20
    },
    dot : {
        width : 12,
        height : 12,
        borderRadius: 50,
        bottom : 5,
        right : 2,
        backgroundColor : '#012ee6',
        position: 'absolute',
    }
})