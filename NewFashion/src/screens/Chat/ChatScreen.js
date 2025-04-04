import {Image, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import ChatHeader from "./ChatHeader";
import {useSocket} from "../../context/socketContext";
import {useSelector} from "react-redux";

const ChatScreen = ({navigation}) => {
    const {userId} = useSelector((state) => state.user);
    const [allUser, setAllUser] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        if (userId && socket) {
            socket.emit('sidebar', userId);
            socket.on('conversation', (data) => {
                const conversationUserData = data.map((conversationUser) => {
                    if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser?.sender
                        };
                    }
                    else if (conversationUser?.receiver?._id !== userId) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.receiver
                        };
                    } else {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.sender
                        };
                    }
                });
                setAllUser(conversationUserData);
            });
        }

        return () => {
            socket.off('conversation');  // Dọn dẹp sự kiện khi component unmount
        };
    }, [socket, userId]);

    const renderItem = ({item}) => {
        const user = item.userDetails;
        const lastMessage = item.lastMsg;
        if (!user) return null;
        return (
            <TouchableOpacity
                style={styles.chatItem}
                onPress={() => navigation.navigate('ChatDetail',{id : user._id})}
            >
                <Image source={{uri: user?.avatar}} style={styles.avatar} />
                <View style={styles.chatInfo}>
                    <Text   style={[
                        styles.lastMessage,
                        // Chỉ in đậm nếu: tin nhắn chưa đọc và KHÔNG phải của chính mình
                        !lastMessage?.seen && lastMessage?.msgByUserId !== userId
                            ? { fontWeight: 'bold' }
                            : { fontWeight: 'normal' },
                    ]}>
                        {user?.name}</Text>
                    <Text
                        style={[
                            styles.lastMessage,
                            // Chỉ in đậm nếu: tin nhắn chưa đọc và KHÔNG phải của chính mình
                            !lastMessage?.seen && lastMessage?.msgByUserId !== userId
                                ? { fontWeight: 'bold' }
                                : { fontWeight: 'normal' },
                        ]}
                    >
                        {lastMessage?.text || 'No messages yet'}
                    </Text>


                    <View style={styles.unseenMsgContainer}>
                        {item.unseenMsg > 0 && (
                            <Text style={styles.unseenMsg}>
                                {item.unseenMsg} new message{item.unseenMsg > 1 ? 's' : ''}
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <ChatHeader onPress={() => navigation.goBack()} />
            <FlatList
                data={allUser}
                renderItem={renderItem}
                keyExtractor={(item,index) =>`${item._id}${index} chat in product chatScreen`}
                ListEmptyComponent={<Text style={styles.noConversations}>No conversations available</Text>}
            />
        </View>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    chatItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    chatInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
    },
    lastMessage: {
        color: 'black',
        fontSize: 16,
        marginTop: 5,
    },
    unseenMsgContainer: {
        marginTop: 5,
    },
    unseenMsg: {
        color: '#ff0000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    noConversations: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});