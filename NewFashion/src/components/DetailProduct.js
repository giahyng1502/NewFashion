import { Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native'
import React, { useState } from 'react'

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DetailProduct = () => {
    const [expanded, setExpanded] = useState(false);

    const [saved, setSaved] = useState(false)

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    const toggleSaved=()=>{
        setSaved(!saved);
    };

    return (
        <View style={st.container}>
            <View style={st.custitle}>
                <Text style={st.title}>Product details</Text>
                <TouchableOpacity onPress={toggleSaved}>
                    <Image 
                      source={
                        saved 
                        ? require('../assets/icons/ic_redheart.png') 
                        : require('../assets/icons/ic_heart.png')}
                        style={{marginLeft:200}}/>
                </TouchableOpacity>
                <Text>Saved</Text>
            </View>
            <View style={st.line} />
            <View style={st.cusinfoproduct}>
                <Text style={st.namedata}>Material:</Text>
                <Text style={st.infodata}>Polyester</Text>
            </View>
            <View style={st.cusinfoproduct}>
                <Text style={st.namedata}>Composition:</Text>
                <Text style={st.infodata}>100% Polyester</Text>
            </View>
            <View style={st.cusinfoproduct}>
                <Text style={st.namedata}>Sleeve Length:</Text>
                <Text style={st.infodata}>Long Sleeve</Text>
            </View>

            {expanded && (
                <View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Pattern:</Text>
                        <Text style={st.infodata}>Geometric-pattern</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Applicable People:</Text>
                        <Text style={st.infodata}>Adult</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Sheer:</Text>
                        <Text style={st.infodata}>No</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Type:</Text>
                        <Text style={st.infodata}>Coat</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Season:</Text>
                        <Text style={st.infodata}>Fall/Winter</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Operation Instruction:</Text>
                        <Text style={st.infodata}>Machine wash, do not dry clean</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Style:</Text>
                        <Text style={st.infodata}>Casual</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Fabric Elasticity:</Text>
                        <Text style={st.infodata}>Micro elasticity</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Weaving Method:</Text>
                        <Text style={st.infodata}>Woven</Text>
                    </View>
                    <View style={st.cusinfoproduct}>
                        <Text style={st.namedata}>Origin:</Text>
                        <Text style={st.infodata}>Hubei, China</Text>
                    </View>
                    <View style={st.cusimg}>
                        <Image source={require('../assets/image/img_product1.png')} />
                        <Image source={require('../assets/image/img_product2.png')} />
                        <Image source={require('../assets/image/img_product3.png')} />
                        <Image source={require('../assets/image/img_product4.png')} />
                    </View>
                </View>
            )}

            <TouchableOpacity onPress={toggleExpand} style={st.button}>
                <Text style={st.buttontext}>{expanded ? "See less ▲" : "See all ▼"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetailProduct

const st = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: "#fff",
        elevation: 3,
        borderBottomWidth: 5,
        borderColor: "#EEEEEE"
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
        flexDirection: "row",
        gap: 5,
    },
    namedata: {
        fontWeight: "bold",
        color: "#737373",
    },
    infodata: {
        fontWeight: "bold",
        color: "#000000",
    },
    cusimg: {
        marginTop: 10,
        alignItems:"center",
        gap: 10,
    },
})