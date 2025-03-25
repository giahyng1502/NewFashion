import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image, Keyboard,
    KeyboardAvoidingView, Platform,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    View,
} from 'react-native';
import LikePost from '../../components/LikePost';
import ButtonWithLeftIcon from '../../components/ButtonWithLeftIcon';
import BaseHeader from '../../components/BaseHeader';
import {getTimeAgoText} from '../../until/getDaysAgoNext';
import {getCommentsByPostId} from '../../redux/actions/commentAction';
import axios from "../../service/axios";


function CommentScreen({ navigation,route }) {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); // Danh sách comment
    const [page, setPage] = useState(1); // Trang hiện tại
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
    const [hasMore, setHasMore] = useState(true); // Kiểm tra còn dữ liệu không

    useEffect(() => {
        if (route.params?._id) {
            setPost(route.params._id);
        }
    }, [route.params?._id]);

    useEffect(() => {
        if (post) {
            getComment(post, 1);
        }
    }, [post]);

    const getComment = async (postId, pageNumber = 1) => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const response = await getCommentsByPostId(postId, pageNumber); // Gọi API lấy comment theo trang
            if (response.data.length > 0) {
                setComments(prevComments => [...prevComments, ...response.data]); // Thêm dữ liệu mới vào danh sách
                setPage(pageNumber + 1); // Tăng số trang
            } else {
                setHasMore(false); // Nếu không còn dữ liệu, dừng phân trang
            }
        } catch (error) {
            console.error("Lỗi khi tải bình luận:", error);
        }
        setIsLoading(false);
    };

    const renderComment = useCallback(({ item }) => {
        return (
            <View style={styles.commentContainer}>
                <Image style={styles.avatar} source={{ uri: item.user?.avatar }} />
                <View style={styles.commentContent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.name}>{item?.user?.name}</Text>
                        <View style={{ width: 10 }} />
                        <Text style={styles.time}>{getTimeAgoText(item.createdAt)}</Text>
                    </View>
                    <Text style={styles.commentText}>{item?.content}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <LikePost isLike={item?.isLike} likeCount={item?.likes} commentId={item._id} />
                        <ButtonWithLeftIcon
                            icon={require('../../assets/icons/ic_comment.png')}
                            count={item?.replyCount}
                        />
                    </View>
                </View>
            </View>
        );
    }, []);


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >

            <BaseHeader title={'New Fashion'} showLeftButton={true} onLeftButtonPress={() => {navigation.goBack();}} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                            <FlatList
                                data={comments}
                                renderItem={renderComment}
                                keyExtractor={(item) => item._id}
                                onEndReached={() => getComment(post, page)} // Gọi khi cuộn đến cuối danh sách
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#3498db" /> : null} // Hiển thị loading khi tải thêm
                                showsVerticalScrollIndicator={false}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    hashtag : {
        fontStyle : 'italic',
        color : 'gray',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 16,
        color: '#7f8c8d',
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
        flex : 1,
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
        borderRadius : 25,
    },
    statusBar: {
        flexDirection : 'row',
        marginTop : 10,
        display : 'flex',
        justifyContent : 'space-between',
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
        marginRight : 3,
    },
    container: {
        flex : 1,
    },
    commentContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f1f1f1',
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

export default CommentScreen;
