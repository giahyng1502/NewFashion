import React, {useState, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import { useSocket } from '../../context/socketContext';
import { useSelector } from 'react-redux';
import ChatDetailHeader from './ChatDetailHeder';

const ChatDetail = ({ navigation, route }) => {
    const { id } = route.params;
    const flatListRef = useRef(null);
    const [message, setMessage] = useState({
        receiver : '',
        sender : '',
        text : '',
        imageUrl : '',
        videoUrl : '',
        msgByUserId : '',
    });

    const { userId } = useSelector((state) => state.user);
    const [receiver, setReceiver] = useState({
        _id: '',
        name: '',
        avatar: '',
        online: false,
    });
    const [messages, setMessages] = useState([]);
    const socket = useSocket();
    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToIndex({
                index: messages.length - 1,
                animated: true,
                viewPosition: 1, // Đảm bảo phần tử cuối cùng hiển thị hoàn toàn
            });
        }
    }, [messages]);
    useEffect(() => {
        socket.emit('message-page', id);
        socket.on('message-user', (data) => {
            setReceiver(data);
        });
        socket.on('message', (data) => {
            setMessages(data);
        });
        socket.emit('seen',id);
        return () => {
            socket.off('message-user');
            socket.off('message');
        };
    }, [socket, id]);
    const handleSendMessage = ()=>{
        console.log(message)

        if(message.text || message.imageUrl || message.videoUrl){
            if(socket){
                socket.emit('new message',{
                    receiver : id,
                    sender : userId,
                    text : message.text,
                    imageUrl : message.imageUrl,
                    videoUrl : message.videoUrl,
                    msgByUserId : userId,
                })
                setMessage({
                    text : "",
                    imageUrl : "",
                    videoUrl : ""
                });
            }
        }
    }
    const renderMessage = ({ item }) => {
        const date = new Date(item.createdAt);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours}:${minutes}`;

        return (
            <View
                style={item.msgByUserId === userId ? styles.sender : styles.receiver}
            >
                <View style={[styles.messageContainer,item.msgByUserId === userId ? {color : 'white'} : {color: 'black'}]}>
                    <Text style={styles.text}>{item.text}</Text>
                    <Text style={styles.time}>{formattedTime}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ChatDetailHeader onPress={() => navigation.goBack()} user={receiver} />
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                onScrollToIndexFailed={() => {
                    setTimeout(() => {
                        flatListRef.current?.scrollToIndex({
                            index: messages.length - 1,
                            animated: true
                        });
                    }, 100);
                }}
            />
            <View style={styles.row}>
                <TextInput style={styles.input} value={message.text} onChangeText={(data)=> {
                    setMessage({
                        ...message,
                        text: data,
                    });
                } }/>
                <TouchableOpacity onPress={handleSendMessage}>
                    <Image source={require('../../assets/icons/ic_send.png')} style={styles.send} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        marginTop : 20,
        width : '100%',
        flexDirection: 'row',
    },
    input : {
        height : 40,
        borderRadius : 8,
        marginRight : 5,
        fontSize : 18,
        padding : 10,
        flex : 1,
        borderWidth : 1,
        borderColor : '#000000',
    },
    send : {
      height: 38,
      width : 38
    },
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f4f4f4',
    },
    sender: {
        alignSelf: 'flex-end',
        marginBottom: 10,
        backgroundColor: '#3453ff',
        padding: 10,
        borderRadius: 8,
        maxWidth: '80%',
    },
    receiver: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        backgroundColor: '#8f8f8f',
        padding: 10,
        borderRadius: 8,
        maxWidth: '80%',
    },
    messageContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
    time: {
        color: '#ffffff',
        fontSize: 12,
        marginLeft: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ChatDetail;
