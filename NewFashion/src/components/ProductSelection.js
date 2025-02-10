import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'

const ProductSelection = () => {
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1); 
        }
    };

    const images = [
        require('../assets/image/ig_product1.png'),
        require('../assets/image/ig_product2.png'),
        require('../assets/image/ig_product3.png'),
        require('../assets/image/ig_product4.png'),
        require('../assets/image/ig_product5.png'),
    ];

    const sizes = ['M', 'L', 'XL', 'XXL', 'XXXL'];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Color: {['Black', 'Blue', 'Gray', 'Red', 'Beige'][selectedColor]}</Text>
            <FlatList
                horizontal
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedColor(index)}
                        style={[styles.imageContainer, selectedColor === index && styles.selectedBorder]}
                    >
                        <Image source={item} style={styles.image} />
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.imageList}
            />

            <Text style={styles.title}>
                Size: {selectedSize ? selectedSize : 'Select a size'}
            </Text>
            <View style={styles.sizeContainer}>
                {sizes.map((size, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.sizeButton,
                            selectedSize === size && styles.selectedSizeButton, // Thay đổi kiểu dáng khi chọn
                        ]}
                        onPress={() => setSelectedSize(size)} // Cập nhật state khi chọn size
                    >
                        <Text
                            style={[
                                styles.sizeText,
                                selectedSize === size && styles.selectedSizeText, // Thay đổi màu chữ khi chọn
                            ]}
                        >
                            {size}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.title}>Qty</Text>
            <View style={styles.qtyContainer}>
                <TouchableOpacity style={styles.qtyButton} onPress={handleDecrease}>
                    <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNumber}>{quantity}</Text>
                <TouchableOpacity style={styles.qtyButton} onPress={handleIncrease}>
                    <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductSelection

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    imageList: {
        marginBottom: 16,
    },
    imageContainer: {
        marginRight: 12,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 8,
    },
    selectedBorder: {
        borderColor: '#000',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    sizeContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    sizeButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    selectedSizeButton: {
        borderColor: '#000',
        backgroundColor: '#e0e0e0',
    },
    sizeText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    selectedSizeText: {
        fontWeight: '700',
        color: '#000',
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    qtyText: {
        fontSize: 16,
        fontWeight: '600',
    },
    qtyNumber: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 16,
    },
})