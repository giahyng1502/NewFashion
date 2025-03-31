import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import BaseHeader from "../../components/BaseHeader";

const WriteReviews = ({ navigation }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [images, setImages] = useState([]);

    const handleStarPress = (index) => {
        setRating(index + 1);
    };

    const selectImage = () => {
        launchImageLibrary({ mediaType: "photo", quality: 0.8 }, (response) => {
            if (response.assets) {
                setImages([...images, ...response.assets.map((asset) => asset.uri)]);
            }
        });
    };

    return (
        <View style={st.container}>
            {/* Header */}
            <BaseHeader title="Write a review" showLeftButton={true} showRightButton={true} onLeftButtonPress={() => { navigation.goBack() }} />

            {/* Product Info */}
            <View style={st.productContainer}>
                <Image
                    source={{ uri: "https://s3-alpha-sig.figma.com/img/4d0a/f0c1/5378413b2872936af32c70ef3bb9c699?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZPOGmJQPy~W8MthKDeZ8uAL-fORUkHa7mrsTpRili~gT3EOayUuJIBeKfsn-kRNHIprLYY4DN6XZyyhOpLqU8wNFelgp1nt1497gQQ3HzYcITmh18HwK7S0o-xY7NIYdGP80pfOU~2HXfIOCEL6TZWn6gHQJY2mDbZSlg5S0L4113ZrJklp9eBNcrWRfovVCcF~W~WLP8vRhUFWc4si6RdU-mY7TVcaphAQCDzO3W~THuZJMv5w2lQM1REbUPqsNxzd7KYPPbvDlp1RYfRpVXoNjnawGPV~0tgWSv0n0c6FWTYEZe9urIkxRXGPBhPaNAHISPuTFxgogTJCNjZvUww__" }}
                    style={st.productImage}
                />
                <View style={st.productDetails}>
                    <Text style={st.productTitle} numberOfLines={1}>
                        Embroidered Wool-blend Scarf Jacket
                    </Text>
                    <Text style={st.productSubtitle}>Green, XL</Text>
                </View>
            </View>

            {/* Star Rating */}
            <View style={st.ratingContainer}>
                {[...Array(5)].map((_, index) => (
                    <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                        <Image
                            source={
                                index < rating
                                    ? require("../../assets/icons/ic_star_filled1.png")
                                    : require("../../assets/icons/ic_star_empty.png")
                            }
                            style={st.star}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={st.rateLabel}>Rate this product*</Text>

            {/* Review Input */}
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: '#1E1E1E', fontWeight: '600', fontSize: 16, marginVertical: 8 }}>Write a review</Text>
                <View style={st.reviewBox}>
                    <TextInput
                        style={st.textInput}
                        placeholder="Share your thoughts"
                        multiline
                        maxLength={300}
                        value={review}
                        onChangeText={setReview}
                    />
                </View>
            </View>

            {/* Add Photos or Videos */}
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: '#1E1E1E', fontWeight: '600', fontSize: 16, marginVertical: 8 }}>Add photos or videos</Text>
                <TouchableOpacity style={st.imagePicker} onPress={selectImage}>
                    <Image source={require("../../assets/icons/ic_add_photo.png")} />
                    <Text style={st.imagePickerText}>Add photos or videos</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={st.submitButton} onPress={() => navigation.navigate('MyReview')}>
                <Text style={st.submitButtonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles
const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    productContainer: {
        flexDirection: "row",
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    productImage: {
        width: 90,
        height: 90,
    },
    productDetails: {
        marginLeft: 12,
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1E1E1E",
    },
    productSubtitle: {
        fontSize: 14,
        color: "#AAAAAA",
        marginTop: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    star: {
        width: 36,
        height: 36,
        marginHorizontal: 4,
    },
    rateLabel: {
        fontSize: 14,
        color: "#1E1E1E",
        textAlign: "center",
        marginBottom: 15,
        fontWeight: 'bold'
    },
    reviewBox: {
        height: 120,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#FAFAFA",
        marginBottom: 15,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: "#333",
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 10,
        paddingVertical: 20,
        alignItems: "center",
        backgroundColor: "#FAFAFA",
        marginBottom: 15,
    },
    imagePickerText: {
        color: "#777",
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: "#FA7806",
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: "center",
        margin: 10,
      },
      submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800",
    },
});

export default WriteReviews;
