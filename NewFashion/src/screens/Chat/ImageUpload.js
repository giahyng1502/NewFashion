import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const ChatDetail = ({ messages, isUploading, uploadProgress }) => {
    const flatListRef = useRef(null);

    const handleFooterLayout = () => {
        // Cuộn xuống cuối khi Footer được hiển thị
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 10 }}>
                        <Text>{item.text}</Text>
                    </View>
                )}
                ListFooterComponent={
                    isUploading ? (
                        <View style={styles.footer}>
                            <Progress.Circle
                                size={40}
                                progress={uploadProgress}
                                showsText={true}
                                color="black"
                                textStyle={styles.progressText}
                            />
                        </View>
                    ) : null
                }
                ListFooterComponentStyle={{ paddingBottom: 20 }}
                onContentSizeChange={() => {
                    // Tự động cuộn xuống khi nội dung thay đổi
                    flatListRef.current?.scrollToEnd({ animated: true });
                }}
                onLayout={() => {
                    // Cuộn xuống khi FlatList được render lần đầu tiên
                    flatListRef.current?.scrollToEnd({ animated: true });
                }}
                onScrollToIndexFailed={() => {
                    // Xử lý khi không thể cuộn đến index cụ thể
                    setTimeout(() => {
                        flatListRef.current?.scrollToEnd({ animated: true });
                    }, 100);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    progressText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default ChatDetail;
