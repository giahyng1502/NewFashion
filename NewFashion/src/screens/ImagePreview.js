import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const ScreenSize = Dimensions.get('window');

const ImagePreview = ({ route, navigation }) => {
    const { images } = route.params;
    const [currentIndex, setCurrentIndex] = useState(0);
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    // Hàm được gọi khi viewable item thay đổi
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item }} style={styles.image} />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged} // Đăng ký callback
                viewabilityConfig={viewabilityConfig} // Cấu hình để xác định khi nào view thay đổi
            />

            {/* Hiển thị vị trí hiện tại trên tổng số */}
            <View style={styles.indexContainer}>
                <Text style={styles.indexText}>{`${currentIndex + 1}/${images.length}`}</Text>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ImagePreview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageContainer: {
        width: ScreenSize.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: ScreenSize.width,
        height: '100%',
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    indexContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
    },
    indexText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
