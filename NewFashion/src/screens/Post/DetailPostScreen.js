import React, { useState } from 'react';
import {
    FlatList,
    Image, Keyboard,
    KeyboardAvoidingView, Platform,
    ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from 'react-native';
import {Button} from "react-native-paper";
import ImageSlider from "../../components/ImageSlider";
import convert from "../../until/quantity-exchange";
import HeaderDetail from "../../components/HeaderDetail";
import StatusBar from "./StatusBar";
import LikePost from "../../components/LikePost";
import ButtonWithLeftIcon from "../../components/ButtonWithLeftIcon";
const post = {
    shopName: 'NewFashion',
    time: '2 hours ago',
    imageUrl:  [
        'https://pub-6e2d2a5dd8884c0aba621d11584b9caf.r2.dev/58bda8bf5d2c2c5c12d3e3278b0022de.png',
        'https://pub-6e2d2a5dd8884c0aba621d11584b9caf.r2.dev/1738933284323-quanbo.png',
    ],
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.',
    likeCount: convert(320003),
    isLike: true,
    commentCount: convert(2000),
    rateCount: convert(20000),
    soldCount : convert(20000),
};
const comments = [
    {
        likeCount: convert(2000),
        commentCount: convert(3),
        tag: '@hungcy',
        isLike: true,

        name: 'Hoang Van Hung',
        content: 'Bên mình còn màu hồng size M không nhỉ shop ơii',
        time: '2 hours ago',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        reply: [
            {
                likeCount: convert(1500),
                commentCount: convert(1),
                isLike: false,

                name: 'Nguyen Thanh Phat',
                content: 'Shop có giao hàng tận nơi không ạ?',
                time: '1 hour ago',
                avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            },
            {
                likeCount: convert(500),
                commentCount: convert(0),
                name: 'Le Minh Tuan',
                isLike: false,

                content: 'Còn size XL không shop?',
                time: '45 minutes ago',
                avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            }
        ]
    },
    {
        likeCount: convert(1200),
        commentCount: convert(2),
        tag: '@tuanle',
        name: 'Tran Thi Hoa',
        isLike: false,

        content: 'Sản phẩm có chất liệu gì vậy shop?',
        time: '3 hours ago',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        reply: [
            {
                likeCount: convert(800),
                commentCount: convert(0),
                name: 'Shop Zoe',
                content: 'Dạ vải cotton 100% mềm mịn ạ!',
                time: '2 hours ago',
                isLike: false,

                avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
            }
        ]
    },
    {
        likeCount: convert(900),
        commentCount: convert(1),
        tag: '@trangnguyen',
        name: 'Nguyen Thi Trang',
        isLike: false,

        content: 'Mình muốn đặt 2 cái size M thì ship bao lâu ạ?',
        time: '4 hours ago',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        reply: [
            {
                likeCount: convert(400),
                commentCount: convert(0),
                name: 'Shop Zoe',
                isLike: false,

                content: 'Dạ nếu ở Hà Nội hoặc TP.HCM thì trong vòng 2-3 ngày ạ!',
                time: '3 hours ago',
                avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
            }
        ]
    }
];


function DetailPostScreen({ navigation }) {
    const renderReply = ({ item }) => {
        return (
            <View style={styles.replyContainer}>
                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                <View style={styles.commentContent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={{ width: 10 }} />
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                    <Text style={styles.commentText}>{item.content}</Text>

                    {/* Hiển thị like và số lượng phản hồi */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <LikePost islike={item.isLike} count={item.likeCount} />
                        <ButtonWithLeftIcon
                            icon={require('../../assets/icons/ic_comment.png')}
                        />
                    </View>
                </View>
            </View>
        );
    };

    const renderComment = ({ item }) => {
        return (
            <View style={styles.commentContainer}>
                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                <View style={styles.commentContent}>
                    {/* Hiển thị thông tin người bình luận */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={{ width: 10 }} />
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                    <Text style={styles.commentText}>{item.content}</Text>

                    {/* Hiển thị like và reply */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <LikePost islike={item.isLike} count={item.likeCount} />
                        <ButtonWithLeftIcon
                            icon={require('../../assets/icons/ic_comment.png')}
                            count={item.reply.length}
                        />
                    </View>

                    {/* FlatList hiển thị các phản hồi */}
                    {item.reply.length > 0 && (
                        <FlatList
                            data={item.reply}
                            renderItem={renderReply}
                            keyExtractor={(replyItem, index) => index.toString()}
                        />
                    )}
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <HeaderDetail title={'New Fashion'} navigation={navigation} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={comments}
                        renderItem={renderComment}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                            <>
                                <View style={{padding : 15}}>
                                    <View style={styles.admin}>
                                        <View style={styles.infor}>
                                            <Image style={styles.avatar} source={require('../../assets/img_logo.png')} />

                                            <View style={styles.column}>
                                                <Text style={{fontWeight : 'bold',fontSize : 16}}>
                                                    New Fashion Shop
                                                </Text>
                                                <Text style={{color : 'rgb(115,115,115)',fontSize : 14}} >
                                                    2 hours ago
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            borderWidth : 2,
                                            width : 40,
                                            height : 40,
                                            borderRadius : 50,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderStyle: 'dashed',
                                            borderColor: '#1E1E1E',
                                        }}>
                                            <Image style={styles.cart} source={require('../../assets/icons/ic_cart_post.png')} />
                                        </View>
                                    </View>
                                    <ImageSlider images={post.imageUrl} />
                                    <Text
                                        style={styles.content}
                                        numberOfLines={5}
                                        ellipsizeMode="tail"
                                    >
                                        {post.content}
                                    </Text>
                                </View>
                                <StatusBar commentCount={post.commentCount} likeCount={post.likeCount} rateCount={post.rateCount} soldCount={post.soldCount} islike={post.isLike} />
                            </>
                        }
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Nhập bình luận..."
                    // value={comment}
                    // onChangeText={setComment}
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendText}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    commentInputContainer: {
        width: '100%',
        height : 70,
        paddingHorizontal: 15,
        display: 'flex',
        alignContent : 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection : 'row',
    },
    commentInput : {
        flex: 9,
        fontSize : 16,
        marginRight : 15,
        width: '90%',
        borderRadius : 16,
        padding : 10,
        height : 50,
        borderWidth: 1,
        borderColor: '#afafaf',
    },
    sendText : {
        color : 'black',
    },
    sendButton : {
        flex : 1
    },
    content: {
        marginVertical : 8,
        lineHeight: 22,
        fontSize: 16,
        textAlign : 'justify',
    },
    column : {
        flexDirection: 'column',
    },
    cart : {
        width : 20,
        height : 20,
    },
    infor : {
        flexDirection : 'row',
    },
    avatar : {
        width : 50,
        height : 50,
        marginRight : 10,
        borderRadius : 25
    },
    statusBar: {
        flexDirection : 'row',
        marginTop : 10,
        display : 'flex',
        justifyContent : 'space-between',
        borderTopWidth : 2,
        borderStyle : 'dashed',
        borderBottomWidth : 2,
    },
    admin : {
        flexDirection : 'row',
        marginBottom : 10,
        justifyContent : 'space-between',
    },
    button : {
        width : 'auto',
        paddingVertical : 8,
        paddingHorizontal : 16,
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
    container: {
        flex : 1,
    },
    commentContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderBottomWidth : 2,
        borderStyle: 'dashed',
        borderBottomColor: '#1E1E1E',
    },
    replyContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentText: {
        fontSize: 16,
        color: '#000000',
    },
    name: {
        fontSize: 14,
        color: '#000000',
        fontWeight : 'bold',
    },
    commentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    time: {
        fontSize: 12,
        color: 'gray',
    },
    likeCount: {
        fontSize: 12,
        color: 'red',
    },
    likeButton: {
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#eee',
    },
});

export default DetailPostScreen;
