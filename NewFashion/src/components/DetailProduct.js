import { Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native'
import React, { useEffect, useState } from 'react'

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DetailProduct = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    const [imageAspectRatio, setImageAspectRatio] = useState({});

    const handleImageLoad = (index, width, height) => {
        setImageAspectRatio(prevState => ({
            ...prevState,
            [index]: width / height
        }));
    };

    useEffect(() => {
        // console.log("DetailProduct: ", item);
    }
        , [item])


    return (
        <View style={st.container}>
            <View style={st.cusinfoproduct}>
                <Text style={st.namedata}>Vật liệu:</Text>
                <Text style={st.infodata}>{item.description.material}</Text>
            </View>
            <View style={st.cusinfoproduct}>
                <Text style={st.namedata}>Thành phần:</Text>
                <Text style={st.infodata}>{item.description.composition}</Text>
            </View>
            <View style={st.cusinfoproduct}>
                <Text style={st.namedata}>Chiều dài tay áo:</Text>
                <Text style={st.infodata}>{item.description.sleeveLength}</Text>
            </View>

            {expanded && (
                <View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Mẫu:</Text>
                        <Text style={st.infodata}>{item.description.pattern}</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Người áp dụng:</Text>
                        <Text style={st.infodata}>{item.description.applicablePeople}</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Trong suốt:</Text>
                        <Text style={st.infodata}>{item.description.sheer}</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Kiểu:</Text>
                        <Text style={st.infodata}>{item.description.type}</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Mùa:</Text>
                        <Text style={st.infodata}>{item.description.season.join('/')}</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Hướng dẫn vận hành:</Text>
                        <Text style={st.infodata}>{item.description.operationInstruction}</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Phong cách:</Text>
                        <Text style={st.infodata}>{item.description.style}</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Độ đàn hồi của vải:</Text>
                        <Text style={st.infodata}>{item.description.fabricElasticity}</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Phương pháp dệt:</Text>
                        <Text style={st.infodata}>{item.description.weavingMethod}</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Nguồn gốc:</Text>
                        <Text style={st.infodata}>{item.description.origin}</Text>
                    </View>
                    <View style={st.cusimg}>
                        {item.image.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={{ width: '100%', aspectRatio: imageAspectRatio[index] || 1 }}
                                resizeMode="contain"
                                onLoad={(event) => {
                                    const { width, height } = event.nativeEvent.source;
                                    handleImageLoad(index, width, height);
                                }}
                            />
                        ))}
                    </View>
                </View>
            )}

            <TouchableOpacity onPress={toggleExpand} style={st.button}>
                <Text style={st.buttontext}>{expanded ? "Thu gọn ▲" : "Xem tất cả ▼"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetailProduct

const st = StyleSheet.create({
    container: {
        paddingVertical: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    price: {
        fontSize: 16,
        color: "red",
        marginBottom: 10
    },
    detailText: {
        fontSize: 14,
        color: "#555"
    },
    button: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5
    },
    buttontext: {
        color: "gray",
        textAlign: "center",
        fontWeight: "bold"
    },
    custitle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    line: {
        marginTop: 10,
        height: 1,
        backgroundColor: "#BBBBBB",
        marginBottom: 10,
    },
    cusinfoproduct: {
        paddingHorizontal: 20,
        flexDirection: "row",
        gap: 5,
    },
    namedata: {
        fontWeight: "semibold",
        fontSize: 14,
        color: "#737373",
    },
    infodata: {
        fontWeight: "semibold",
        fontSize: 14,
        color: "#000000",
    },
    cusimg: {
        alignItems: "center",
        marginVertical:10
    },
})