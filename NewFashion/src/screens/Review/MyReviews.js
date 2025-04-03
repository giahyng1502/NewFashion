import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import BaseHeader from '../../components/BaseHeader';
import StarRating from '../../components/StarRating';

const MyReviews = ({ navigation, route }) => {
    const { item } = route.params
    useEffect(() => {
        console.log(item);

    }, [])

    function formatDate(isoString) {
        const date = new Date(isoString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0 nên +1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <View style={st.container}>
            {/* header */}
            <BaseHeader title="My Review" showLeftButton={true} showRightButton={true} onLeftButtonPress={() => { navigation.goBack() }} />

            <View style={{ paddingHorizontal: 16, }}>
                {/* Product Info */}
                <View style={st.productContainer}>
                    <Image source={{ uri: item.color.imageColor }} style={st.productImage} />
                    <View style={st.productDetails}>
                        <Text style={st.productName}>{item.productName}</Text>
                        <Text style={st.productVariant}>{item.color.nameColor}, {item.size}</Text>
                    </View>
                </View>

                {/* Review Section */}
                <View style={st.reviewContainer}>
                    {/* Star Rating */}
                    <StarRating rating={item.reviewId.rate} />
                    {/* Comment */}
                    <Text style={st.comment}>{item.reviewId.content}</Text>
                    {/* Review Image */}
                    <View style={{flexDirection:"row"}}>
                        {item.reviewId.images.map((uri, index) => (
                            <Image key={index} source={{ uri }} style={{ width: 80, height: 80, marginRight: 10, borderRadius: 10 }} />
                        ))}
                    </View>
                    {/* Timestamp */}
                    <Text style={st.timestamp}>{formatDate(item.reviewId.reviewDate)}</Text>
                    {/* Edit Button */}
                    <TouchableOpacity style={st.editButton}>
                        <Text style={st.editText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

const st = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    productContainer: { flexDirection: "row", paddingVertical: 10, borderBottomColor: '#BBBBBB', borderBottomWidth: 0.4, borderTopColor: 'BBBBBB', borderTopWidth: 0.4 },
    productImage: { width: 90, height: 90, borderRadius: 8, marginRight: 12 },
    productName: { fontWeight: "#1E1E1E" },
    productVariant: { color: "#AAAAAA" },
    reviewContainer: { paddingTop: 10 },
    starContainer: { flexDirection: "row", marginBottom: 4 },
    starIcon: { width: 16, height: 16, marginRight: 2 },
    comment: { fontSize: 16, marginVertical: 10 },
    reviewImage: { width: 80, height: 80, borderRadius: 8, marginBottom: 8 },
    timestamp: { color: "gray", fontSize: 12, marginTop: 12 },
    editButton: { position: "absolute", right: 0, top: 0, marginTop: 8, },
    editText: { color: "orange", fontWeight: "bold" },
});


export default MyReviews