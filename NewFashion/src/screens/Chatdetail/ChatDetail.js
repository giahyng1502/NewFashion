import React, { useState, useEffect, useRef } from 'react';
import {FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import { useSocket } from '../../context/socketContext';
import { useSelector } from 'react-redux';
import ChatDetailHeader from './ChatDetailHeder';
import ShowImage from "../../dialogs/showImage";
import { launchImageLibrary } from "react-native-image-picker";
import { uploadImage } from "../../until/uploadImages";
import * as Progress from 'react-native-progress';
import {fetchMoreMessages} from "../../redux/actions/messageAction";

const ChatDetail = ({ navigation, route }) => {
    const { id } = route.params;
    const flatListRef = useRef(null);
    const [visiable, setVisiable] = useState(false);
    const [imagesSlected, setImagesSlected] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    // Khởi tạo placeholder image
    const [imagePick, setImagePick] = useState([]);
    const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false); // State kiểm tra xem đang tải thêm không
    const [hasMoreMessages, setHasMoreMessages] = useState(true); // Kiểm tra có còn tin nhắn để tải không
    const [message, setMessage] = useState({
        receiver: '',
        sender: '',
        text: '',
        imageUrl: [],
        videoUrl: '',
        msgByUserId: '',
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
        socket.emit('message-page', id);
        socket.on('message-user', (data) => {
            setReceiver(data);
        });
        socket.on('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        socket.emit('seen', id);
        return () => {
            socket.off('message-user');
            socket.off('message');
        };
    }, [socket, id]);

    const handleSendMessage = () => {
        console.log('message được gửi : ', message);
        if (message.text || message.imageUrl.length > 0 || message.videoUrl) {
            if (socket) {
                socket.emit('new message', {
                    receiver: id,
                    sender: userId,
                    text: message.text,
                    imageUrl: message.imageUrl,
                    videoUrl: message.videoUrl,
                    msgByUserId: userId,
                });
                setMessage({
                    text: "",
                    imageUrl: [],
                    videoUrl: ""
                });
            }
        }
    };
    useEffect(() => {
        if (id) {
            loadMoreMessages();
        }
    },[id])
    const loadMoreMessages = async () => {
        if (isLoadingMoreMessages || !hasMoreMessages) return; // Nếu đang tải hoặc không còn tin nhắn nữa thì dừng

        setIsLoadingMoreMessages(true);
        try {
            const newMessages = await fetchMoreMessages(id, messages.length); // Gửi yêu cầu tải thêm tin nhắn
            if (newMessages.length > 0) {
                setMessages((prevMessages) => [...newMessages, ...prevMessages]);
            } else {
                setHasMoreMessages(false); // Nếu không có tin nhắn mới, dừng việc tải thêm
            }
        } catch (error) {
            console.error("Lỗi tải thêm tin nhắn:", error);
        } finally {
            setIsLoadingMoreMessages(false);
        }
    };
    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToIndex({
                animated: true,
                index: messages.length - 1,
            });
        }
    }, [messages]); // Gọi khi messages thay đổi

    const renderMessage = ({ item }) => {
        const date = new Date(item.createdAt);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours}:${minutes}`;

        return (
            <View style={{ marginBottom: 10 }}>
                {item.imageUrl.length > 0 ? (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        handShowImage(item.imageUrl);
                    }} style={[
                        styles.imageContainer,
                        item.msgByUserId === userId ? styles.senderImage : styles.receiverImage
                    ]}>
                        {item.imageUrl.map((url, index) => (
                            <Image
                                key={index}
                                source={{ uri: url }}
                                style={[styles.image, {
                                    top: index * 10,
                                    ...(index > 0 ? { transform: [{ rotate: `${index % 2 ? (index + 1) * -2 : (index + 1) * 2}deg` }] } : {})
                                }]}
                            />
                        ))}
                    </TouchableOpacity>
                ) : null}

                {item.text.trim() !== "" && (
                    <View style={item.msgByUserId === userId ? styles.sender : styles.receiver}>
                        <View style={styles.messageContainer}>
                            <Text style={styles.text}>{item.text}</Text>
                            <Text style={styles.time}>{formattedTime}</Text>
                        </View>
                    </View>
                )}
            </View>
        );
    };

    useEffect(() => {
        if (message.imageUrl.length > 0) {
            handleSendMessage();
        }
    }, [message.imageUrl]);
    const pickAndUploadImage = async () => {
        return new Promise((resolve, reject) => {
            launchImageLibrary(
                { mediaType: 'photo', quality: 1, selectionLimit: 5 },
                async (response) => {
                    if (response.didCancel) {
                        console.log("Người dùng đã hủy chọn ảnh");
                        resolve([]);
                    } else if (response.errorMessage) {
                        console.log("Lỗi chọn ảnh:", response.errorMessage);
                        resolve([]);
                    } else if (response.assets) {
                        const images = response.assets.map((asset) => ({
                            uri: asset.uri,
                            fileName: asset.fileName,
                            type: asset.type,
                        }));
                        setImagePick(images)
                        console.log("Ảnh đã chọn:", images);

                        try {
                            const uploadedUrls = await uploadImage(images, setUploadProgress);
                            resolve(uploadedUrls);
                        } catch (error) {
                            console.error("Lỗi upload ảnh:", error);
                            resolve([]);
                        }
                    } else {
                        resolve([]);
                    }
                }
            );
        });
    };

    const handSendImages = async () => {
        setIsUploading(true);
        const images = await pickAndUploadImage(setUploadProgress);
        if (images.length > 0) {
            setMessage(prev => ({
                ...prev,
                imageUrl: images,
                text: ""
            }));
        }
        setIsUploading(false);
        setUploadProgress(0);
    };

    const handShowImage = (images) => {
        setImagesSlected(images);
        setVisiable(true);
    };
    return (
        <>
            <ShowImage
                images={imagesSlected}
                visible={visiable}
                onClose={() => { setVisiable(false); }}
            />
            <View style={styles.container}>
                <ChatDetailHeader onPress={() => navigation.goBack()} user={receiver} />
                <View style={{marginBottom : 15}}></View>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    onRefresh={loadMoreMessages}
                    refreshing={isLoadingMoreMessages}
                    keyExtractor={(item,index) =>`${item._id}${index} chat in chatDetail`}
                    ListFooterComponent={
                        isUploading && imagePick.length > 0 ? (
                            <View style={{flex : 1,alignItems: 'flex-end'}}>
                                <View style={{height : 300,width : '40%',position : 'relative'}}>
                                    {imagePick.map((image, index) => (
                                        <View key={index} style={{
                                            position: 'absolute',
                                            height: 250,
                                            width : '100%',
                                            flexDirection: 'row',}}>
                                            {/* Hiển thị ảnh */}
                                            <Image
                                                key={`${index} imagePreview`}
                                                source={{ uri: image.uri }}
                                                style={[{width : '100%' ,height : '250',borderRadius : 10}, {
                                                    opacity : 0.4,
                                                    top: index * 10,
                                                    ...(index > 0 ? { transform: [{ rotate: `${index % 2 ? (index + 1) * -2 : (index + 1) * 2}deg` }] } : {})
                                                }]}
                                            />
                                        </View>
                                    ))}

                                    {/* Hiển thị vòng tròn loading theo tiến trình */}
                                    <View style={styles.loadingContainer}>
                                        <Progress.Circle
                                            size={40}
                                            progress={uploadProgress}
                                            showsText={true}
                                            color="black"
                                            textStyle={{
                                                fontSize: 12, // Tăng kích thước chữ
                                                fontWeight: '500', // Chữ đậm hơn
                                                color: 'black', // Màu chữ
                                            }}
                                            thickness={2}
                                        />
                                    </View>
                                </View>

                            </View>
                        ):null
                    }
                    onContentSizeChange={() => {
                        // Chỉ cuộn xuống cuối nếu không có tin nhắn đang tải thêm
                        if (!isLoadingMoreMessages) {
                            flatListRef.current?.scrollToEnd({ animated: true });
                        }
                    }}
                    onLayout={() => {
                        if (!isLoadingMoreMessages) {
                            flatListRef.current?.scrollToEnd({ animated: true });
                        }
                    }} // Cuộn khi FlatList hiển thị
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
                    <TextInput style={styles.input} value={message.text} onChangeText={(data) => {
                        setMessage({
                            ...message,
                            text: data,
                        });
                    }} />
                    <TouchableOpacity onPress={handSendImages}>
                        <Image source={require('../../assets/icons/chose_icon.png')} style={styles.send} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSendMessage}>
                        <Image source={require('../../assets/icons/ic_send.png')} style={styles.send} />
                    </TouchableOpacity>

                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
    },
    loadingContainer: {
        position: 'absolute',
        top: '40%',
        left: '40%',
    },
    imagePreviewRow: {
        flexDirection: 'row',
        position: 'relative',
        gap: 5,
        backgroundColor : 'red',
        justifyContent : 'flex-end',
        height : 200,
        marginBottom: 10,
    },
    imageContainer: {
        position: 'relative',
        height: 250,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    imagePreview: {
        height: 250,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },

    input: {
        height: 40,
        borderRadius: 8,
        marginRight: 5,
        fontSize: 18,
        padding: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
    },
    senderImage: {
        alignSelf: 'flex-end',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    receiverImage: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    image: {
        width: '40%',
        height: '200',
        position: 'absolute',
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
    },
    send: {
        height: 38,
        width: 38,
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
    uploadContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        zIndex: 100,
    },
    placeholderImage: {
        width: 100,
        height: 100,
    },
    progressBarContainer: {
        width: '80%',
        height: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        marginTop: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#3453ff',
        borderRadius: 5,
    },
    progressText: {
        marginTop: 5,
        fontSize: 16,
        color: '#3453ff',
    },

});

export default ChatDetail;
