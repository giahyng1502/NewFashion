import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BaseHeader from '../../components/BaseHeader';
import { FlatList } from 'react-native-gesture-handler';

const MyReviews = ({ navigation }) => {
    const reviews = [
        {
            id: "1",
            name: "Embroidered Wool-blend Scarf Jacket...",
            variant: "Green, XL",
            image: "https://s3-alpha-sig.figma.com/img/4d0a/f0c1/5378413b2872936af32c70ef3bb9c699?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZPOGmJQPy~W8MthKDeZ8uAL-fORUkHa7mrsTpRili~gT3EOayUuJIBeKfsn-kRNHIprLYY4DN6XZyyhOpLqU8wNFelgp1nt1497gQQ3HzYcITmh18HwK7S0o-xY7NIYdGP80pfOU~2HXfIOCEL6TZWn6gHQJY2mDbZSlg5S0L4113ZrJklp9eBNcrWRfovVCcF~W~WLP8vRhUFWc4si6RdU-mY7TVcaphAQCDzO3W~THuZJMv5w2lQM1REbUPqsNxzd7KYPPbvDlp1RYfRpVXoNjnawGPV~0tgWSv0n0c6FWTYEZe9urIkxRXGPBhPaNAHISPuTFxgogTJCNjZvUww__",
            rating: 5,
            comment: "Ok",
            reviewImage: "https://s3-alpha-sig.figma.com/img/4d0a/f0c1/5378413b2872936af32c70ef3bb9c699?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZPOGmJQPy~W8MthKDeZ8uAL-fORUkHa7mrsTpRili~gT3EOayUuJIBeKfsn-kRNHIprLYY4DN6XZyyhOpLqU8wNFelgp1nt1497gQQ3HzYcITmh18HwK7S0o-xY7NIYdGP80pfOU~2HXfIOCEL6TZWn6gHQJY2mDbZSlg5S0L4113ZrJklp9eBNcrWRfovVCcF~W~WLP8vRhUFWc4si6RdU-mY7TVcaphAQCDzO3W~THuZJMv5w2lQM1REbUPqsNxzd7KYPPbvDlp1RYfRpVXoNjnawGPV~0tgWSv0n0c6FWTYEZe9urIkxRXGPBhPaNAHISPuTFxgogTJCNjZvUww__",
            timestamp: "Mar 22, 2025 11:25PM",
        },
    ];
    return (
        <View style={st.container}>
            {/* header */}
            <BaseHeader title="My Review" showLeftButton={true} showRightButton={true} onLeftButtonPress={() => { navigation.goBack() }} />
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{paddingHorizontal:16,}}> 
                        {/* Product Info */}
                        <View style={st.productContainer}>
                            <Image source={{ uri: item.image }} style={st.productImage} />
                            <View style={st.productDetails}>
                                <Text style={st.productName}>{item.name}</Text>
                                <Text style={st.productVariant}>{item.variant}</Text>
                            </View>
                        </View>

                        {/* Review Section */}
                        <View style={st.reviewContainer}>
                            {/* Star Rating */}
                            <View style={st.starContainer}>
                                {[...Array(item.rating)].map((_, index) => (
                                    <Image key={index} source={require('../../assets/icons/ic_staralone.png')} style={st.starIcon} />
                                ))}
                            </View>
                            {/* Comment */}
                            <Text style={st.comment}>{item.comment}</Text>
                            {/* Review Image */}
                            <Image source={{ uri: item.reviewImage }} style={st.reviewImage} />
                            {/* Timestamp */}
                            <Text style={st.timestamp}>{item.timestamp}</Text>
                            {/* Edit Button */}
                            <TouchableOpacity style={st.editButton}>
                                <Text style={st.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const st = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    productContainer: { flexDirection: "row", paddingVertical: 10, borderBottomColor:'#BBBBBB', borderBottomWidth:0.4, borderTopColor:'BBBBBB',borderTopWidth:0.4},
    productImage: { width: 90, height: 90, borderRadius: 8, marginRight: 12 },
    productName: { fontWeight: "#1E1E1E" },
    productVariant: { color: "#AAAAAA" },
    reviewContainer: { paddingTop: 10 },
    starContainer: { flexDirection: "row", marginBottom: 4 },
    starIcon: { width: 16, height: 16, marginRight: 2 },
    comment: { fontSize: 16, marginBottom: 8 },
    reviewImage: { width: 80, height: 80, borderRadius: 8, marginBottom: 8 },
    timestamp: { color: "gray", fontSize: 12 },
    editButton: { position: "absolute", right: 0, top: 0, marginTop:8, },
    editText: { color: "orange", fontWeight: "bold" },
});


export default MyReviews