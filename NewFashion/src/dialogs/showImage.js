import React from "react";
import { Modal, View, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

function ShowImage({ visible, onClose, images = [] }) {
    const reversedImages = [...images].reverse();
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                {/* Nút đóng */}
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Image source={require('../assets/bt_exit.png')} style={styles.closeIcon} />
                </TouchableOpacity>

                {/* Hiển thị ảnh */}
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {images.length > 0 ? (
                        reversedImages.map((image, index) => (
                            <Image key={index} source={{ uri: image }} style={styles.image} resizeMode="contain" />
                        ))
                    ) : (
                        null
                    )}
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 15,
        right: 20,
        zIndex: 10,
    },
    closeIcon: {
        width: 30,
        height: 30,
        tintColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: width,
        height: height,
    },
    noImageContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height,
    },
    noImage: {
        width: 150,
        height: 150,
        opacity: 0.5,
    },
});

export default ShowImage;
