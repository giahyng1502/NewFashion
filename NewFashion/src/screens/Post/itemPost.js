import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Button} from "react-native-paper";
import ImageSlider from "../../components/ImageSlider";

function ItemPost({ post ,navigation }) {
    const [islike, setIslike] = useState(false)
    const handleLike = () => {
        setIslike(!islike);
    }

    const handleDetail = () => {
        navigation.navigate('PostDetail')
    }
    return (
        <View style={styles.item}>
            <View style={styles.admin}>
                <View style={styles.infor}>
                    <Image style={styles.avatar} source={require('../../assets/img_logo.png')} />

                <View style={styles.column}>
                    <Text style={{fontWeight : 'bold',fontSize : 16}}>
                        New Fashion Shop
                    </Text>
                    <Text style={{color : 'rgb(115,115,115)',fontSize : 14}} >
                        2 hours ago
                    </Text>
                </View>
                </View>
                <View style={{
                    borderWidth : 2,
                    width : 40,
                    height : 40,
                    borderRadius : 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderStyle: 'dashed',
                    borderColor: '#1E1E1E',
                }}>
                    <Image style={styles.cart} source={require('../../assets/icons/ic_cart_post.png')} />
                </View>
            </View>
                <ImageSlider images={post.imageUrl} />
                <TouchableOpacity onPress={handleDetail}>
                    <Text
                        style={styles.content}
                        numberOfLines={5}
                        ellipsizeMode="tail"
                    >
                        {post.content}
                    </Text>
                </TouchableOpacity>

                <View style={{flexDirection : 'row',marginTop : 10,display : 'flex', justifyContent : 'space-between'}}>

                <TouchableOpacity style={styles.button} onPress={() => {handleLike()}} activeOpacity={1}>
                    <Image style={styles.likeBtn} source={islike ? require('../../assets/icons/ic_select_like.png') : require('../../assets/icons/ic_like.png')} />
                    <Text style={{fontSize : 16, fontWeight: 'bold'}}>
                        {post.likeCount}
                    </Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {}}>
                        <Image style={styles.likeBtn} source={require('../../assets/icons/ic_comment.png')} />
                        <Text style={{fontSize : 16, fontWeight: 'bold'}}>
                            {post.commentCount}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.button} onPress={() => {}}>
                        <Image style={styles.likeBtn} source={require('../../assets/icons/ic_sold.png')} />
                        <Text style={{fontSize : 16, fontWeight: 'bold'}}>
                            {post.commentCount} sold
                        </Text>
                    </View>
                </View>

            </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginVertical : 8,
        lineHeight: 22,
        fontSize: 16,
        textAlign : 'justify',
    },
    column : {
        flexDirection: 'column',
    },
    cart : {
        width : 20,
        height : 20,
    },
    infor : {
        flexDirection : 'row',
    },
    avatar : {
        width : 50,
        height : 50,
        marginRight : 10,
        borderRadius : 25
    },
    admin : {
        flexDirection : 'row',
        marginBottom : 10,
        justifyContent : 'space-between',
    },
    button : {
        width : 'auto',
        paddingVertical : 8,
        paddingHorizontal : 16,
        borderRadius: 30,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#1E1E1E',
        display: 'flex',
        alignContent : 'center',
        justifyContent : 'center',
        alignItems: 'center',
      flexDirection : 'row',
    },
    likeBtn : {
        width : 32,
        height : 32,
        marginRight : 5
    },
    showMore: {
        color: 'blue',
        marginTop: 4,
        fontSize: 14,
        fontWeight: 'bold',
    },
    item: {
        borderRadius: 16,
        borderWidth: 2,
        padding : 15,
        borderStyle: 'dashed',
        borderColor: '#1E1E1E'
    },
});

export default ItemPost;
