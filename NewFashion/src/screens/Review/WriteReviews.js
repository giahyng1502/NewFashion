import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import BaseHeader from "../../components/BaseHeader";
import { writeReview } from "../../redux/actions/orderActions";
import { useDispatch } from "react-redux";


const WriteReviews = ({ navigation,route }) => {
    const {product,orderId} = route.params
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [images, setImages] = useState([]);

    const dispatch = useDispatch()

    const handleReview = () => {
        try {
            if (!product || !product?.productId) {
                Alert.alert("Error", "Product data is missing!");
                return;
            }
            console.log("Submitting review for product ID:", product.productId);

            if(!rating || !review){
                Alert.alert("Error", "Your review isn't valid");
                return
            }else{
                dispatch(
                    writeReview({
                        rate: rating,
                        content: review,
                        productId: product.productId,
                        files: images,
                        orderId
                    })
                ) // unwrap() giúp lấy dữ liệu từ Promise
    
                Alert.alert("Review sent", "Your review has been sent", [
                    { text: "OK", onPress: () => navigation.replace('Your orders') }
                ]);
            }

        } catch (error) {
            Alert.alert("Error", error?.message || "Something went wrong!");
        }
    }

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

                <View style={{borderBottomWidth:7,borderBottomColor:'#E7E7E7'}}>
                    {/* Product Info */}
                    <View style={st.productContainer}>
                        <Image
                            source={{ uri: product.color.imageColor }}
                            style={st.productImage}
                        />
                        <View style={st.productDetails}>
                            <Text style={st.productTitle} numberOfLines={1}>
                                {product.productName}
                            </Text>
                            <Text style={st.productSubtitle}>{product.color.nameColor}, {product.size}</Text>
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
                        <TouchableOpacity style={st.imagePicker} onPress={()=>selectImage()}>
                            <Image source={require("../../assets/icons/ic_add_photo.png")} />
                            <Text style={st.imagePickerText}>Add photos or videos</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={st.submitButton} onPress={() => handleReview()}>
                        <Text style={st.submitButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
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
        marginVertical: 15,
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
        marginBottom:30
      },
      submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800",
    },
});

export default WriteReviews;