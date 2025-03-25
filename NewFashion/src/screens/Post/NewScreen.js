import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ItemPost from './itemPost';
import { useDispatch, useSelector } from 'react-redux';
import {getPosts, toggleLikePost} from '../../redux/actions/postAction';
import likePost from "../../components/LikePost";

function NewScreen({ navigation }) {
    const dispatch = useDispatch();
    const { isLoading, posts, error } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    const handleLike = (_id) => {
        dispatch(toggleLikePost(_id));
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3498db" />
                    <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Lỗi tải dữ liệu: {error}</Text>
                </View>
            ) : posts.length === 0 ? (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>Không có bài viết nào!</Text>
                </View>
            ) : (
                <ItemPost posts={posts} navigation={navigation} handleLike={handleLike} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#3498db',
        fontWeight: 'bold',
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
});

export default NewScreen;
