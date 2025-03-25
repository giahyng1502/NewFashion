import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from "react-native-paper";
import ImageSlider from "../../components/ImageSlider";
import {getTimeAgoText} from "../../until/getDaysAgoNext";
import imageSlider from "../../components/ImageSlider";

function ItemPost({ posts ,navigation,handleLike }) {

    const handleDetail = () => {
        navigation.navigate('PostDetail');
    }
    const renderItem = ({item : post}) => {
        if (!post) return null;
      return (
        <View style={styles.item}>
          <View style={styles.admin}>
            <View style={styles.infor}>
              <Image style={styles.avatar} src={post.user?.avatar} />

              <View style={styles.column}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    {post.user?.name}
                </Text>
                <Text style={{color: 'rgb(115,115,115)', fontSize: 14}}>
                  {getTimeAgoText(post.createdAt)}
                </Text>
              </View>
            </View>
          </View>
            {post.images?.length > 0 && (<ImageSlider images={post.images} />)}
          <TouchableOpacity onPress={handleDetail}>
            <Text style={styles.content} numberOfLines={5} ellipsizeMode="tail">
              {post.content}
            </Text>
              <Text style={[styles.hashtag,styles.content]} numberOfLines={5} ellipsizeMode="tail">
                  {post.hashtag}
              </Text>
          </TouchableOpacity>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'gray',
              flexDirection: 'row',
              marginTop: 10,
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleLike(post._id);
              }}
              activeOpacity={1}>
              <Image
                style={styles.likeBtn}
                source={
                  post.isLike
                    ? require('../../assets/icons/ic_select_like.png')
                    : require('../../assets/icons/ic_like.png')
                }
              />
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Image
                style={styles.likeBtn}
                source={require('../../assets/icons/ic_comment.png')}
              />
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{post.comments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
    return (
        <View style={styles.container}>
            <FlatList showsVerticalScrollIndicator={false} data={posts} renderItem={renderItem} keyExtractor={(item,index) => `${item._id.toString()} posts ${index}}`} />
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
        flex : 1,
        display: 'flex',
        alignContent : 'center',
        justifyContent : 'center',
        alignItems: 'center',
        flexDirection : 'row',
    },
    hashtag : {
        fontStyle : 'italic',
        color : 'gray',
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
    item:{
        marginTop : 10
    }
});

export default ItemPost;
