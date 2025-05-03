import React, { useRef, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

const BannerSlider = ({ images }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Cập nhật vị trí khi user vuốt tay
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0]?.index ?? 0);
        }
    }).current;

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => `${index.toString()} image slide`}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item }} style={styles.image} />
                    </View>
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                snapToAlignment="center"
            />
            {/* Hiển thị số lượng ảnh */}
            <View style={styles.quantity}>
                <Text style={styles.quantityText}>{`${currentIndex + 1}/${images.length}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        width: width,
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    quantity: {
        position: 'absolute',
        bottom: 6,
        right: 14,
        backgroundColor: 'rgba(29, 29, 29, 0.7)',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    quantityText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default BannerSlider;
