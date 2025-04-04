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
import AppManager from "../../utils/AppManager";
import {useDispatch, useSelector} from "react-redux";
import {incComment} from "../../redux/reducer/postReducer";


function CommentScreen({ navigation,route }) {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); // Danh sách comment
    const [page, setPage] = useState(1); // Trang hiện tại
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
    const [hasMore, setHasMore] = useState(true); // Kiểm tra còn dữ liệu không
    const [replyInfor, setReplyInfor] = useState(null);
    const [commentText, setCommentText] = useState(""); // Lưu nội dung bình luận

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
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
    useEffect(() => {
        console.log(comments)
    },[comments]);
    const handleSendComment = async () => {
        const content = commentText.trim();
        if (!content) return;

        let url = `/comment/${post}`;
        let data = {
            content,
            postId: post,
        };

        try {
            if (replyInfor?.type === 'COMMENT') {
                // Nếu là reply
                url = `/replies/${replyInfor._id}`;
                const response = await axios.post(url, data);

                const newReply = {
                    ...response?.reply,
                    user: {
                        _id: user.userId,
                        name: user.name,
                        avatar: user.avatar,
                    },
                    commentId: replyInfor._id,
                };

                // Cập nhật replies trong comment tương ứng
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment._id === replyInfor._id
                            ? {
                                ...comment,
                                replies: [...(comment.replies || []), newReply],
                                replyCount: (comment.replyCount || 0) + 1,
                            }
                            : comment
                    )
                );
            } else {
                // Nếu là comment chính
                const response = await axios.post(url, data);

                const newComment = {
                    ...response?.comment,
                    user: {
                        _id: user.userId,
                        name: user.name,
                        avatar: user.avatar,
                    },
                    replies: [],
                    replyCount: 0,
                };

                setComments((prev) => [...prev, newComment]);
            }

            setCommentText("");
            setReplyInfor(null);
            dispatch(incComment({ _id: post }));

        } catch (error) {
            console.error("Lỗi khi gửi bình luận:", error);
        }
    };


    const getComment = async (postId, pageNumber = 1) => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const response = await getCommentsByPostId(postId, pageNumber); // Gọi API lấy comment theo trang
            if (response.data.length > 0) {
                setComments(prevComments => [...prevComments, ...response.data]); // Thêm dữ liệu mới vào danh sách
                setPage(pageNumber + 1); // Tăng số trang
                console.log(comments);
            } else {
                setHasMore(false); // Nếu không còn dữ liệu, dừng phân trang
            }
        } catch (error) {
            console.error("Lỗi khi tải bình luận:", error);
        }
        setIsLoading(false);
    };

    const handleMoreReply = async (offset,commentId) => {
        try {

            const res = await axios.get(`/replies/${commentId}`,{
                params: {offset},
            })
            setComments((prev) =>
                prev.map((c) =>
                    c._id === commentId
                        ? {
                            ...c,
                            replies: [...(c.replies || []), ...res?.data],
                        }
                        : c
                )
            );
        }catch (error) {
            console.log(error);
        }
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
                        <ButtonWithLeftIcon
                            icon={require('../../assets/icons/ic_comment.png')}
                            count={item?.replyCount}
                            onPress={() => setReplyInfor({ type: 'COMMENT', name: item.user?.name, _id: item._id })}
                        />
                    </View>

                    {/* Danh sách reply hiển thị dưới mỗi comment */}
                    {item.replies && item.replies.length > 0 && (
                        <FlatList
                            data={item.replies}
                            keyExtractor={(item,index) => `${item._id} ${index} replies in comments`}
                            renderItem={({ item: reply }) => (
                                <View style={styles.replyContainer}>
                                    <Image style={styles.avatar} source={{ uri: reply.user?.avatar }} />
                                    <View style={styles.commentContent}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.name}>{reply.user?.name}</Text>
                                            <View style={{ width: 10 }} />
                                            <Text style={styles.time}>{getTimeAgoText(reply.createdAt)}</Text>
                                        </View>
                                        <Text style={styles.commentText}>{reply.content}</Text>
                                    </View>
                                </View>
                            )}
                            ListFooterComponent={
                                (item.replyCount - item.replies.length) > 0 ? (
                                    <View>
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleMoreReply(item?.replies?.length,item._id)
                                            }
                                        >
                                            <Text style={{ color: '#202020', marginLeft: 20, marginTop: 5 }}>
                                                {`Xem thêm ${item.replyCount - item.replies.length} phản hồi`}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null
                            }

                        />
                    )}
                </View>
            </View>
        );
    }, [comments]);




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
                                keyExtractor={(item,index) =>`${item._id}${index} comment in commentScreen`}
                                onEndReached={() => getComment(post, page)} // Gọi khi cuộn đến cuối danh sách
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#3498db" /> : null} // Hiển thị loading khi tải thêm
                                showsVerticalScrollIndicator={false}
                            />
                </View>

            </TouchableWithoutFeedback>
            <View style={{height : 100,flexDirection : 'column',justifyContent:'center',}}>
                {replyInfor && (
                    <View style={{ flexDirection : 'row',justifyContent: 'flex-start',width: '500' }}>
                        <Text style={styles.replyText}>
                            Đang trả lời <Text style={{ fontWeight: 'bold' }}>{replyInfor.name}</Text>
                        </Text>
                        <TouchableOpacity style={styles.removeBtn} onPress={()=>{setReplyInfor(null)}} activeOpacity={0.7}>
                            <Image style={styles.icon} source={require('../../assets/bt_exit.png')} />
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Nhập bình luận..."
                    value={commentText}
                    onChangeText={setCommentText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
                    <Text style={styles.sendText}>Gửi</Text>
                </TouchableOpacity>
                </View>
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
    icon:{
        width : 14,
        height : 14,
        resizeMode : 'contain',
    },
    removeBtn : {
      width : 20,
      justifyContent: 'center',
      height : 20,
      marginLeft : 5,
    },
    replyText:{
        color : '#fffff',
        marginLeft : 15,
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
