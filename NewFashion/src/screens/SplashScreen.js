import { StyleSheet, Image, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { fetchCategories } from '../redux/actions/categoryActions';
import { useDispatch } from 'react-redux';

const SplashScreen = ({ navigation }) => {
    const fadeAnimLogo = useRef(new Animated.Value(1)).current;
    const fadeAnimBanner = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();

    useEffect(() => {
        const loadDataAndAnimate = async () => {
            try {
                await loadData();
                animate();
            } catch (error) {
                console.log('Load data error: ', error);
            }
        };

        loadDataAndAnimate();
    }, [fadeAnimLogo, fadeAnimBanner, navigation]);

    const loadData = async () => {
        try {
            dispatch(fetchCategories())
        } catch (error) {
            console.log('Load data error: ', error);
        }
    };

    const animate = () => {
        Animated.sequence([
            Animated.timing(fadeAnimLogo, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimBanner, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setTimeout(() => {
                navigation.navigate('Main');
            }, 3000);
        });
    };

    return (
        <View style={st.container}>
            <Animated.Image
                source={require('../assets/img_logo.png')}
                style={[st.image, { opacity: fadeAnimLogo }]} />

            <Animated.Image
                source={require('../assets/img_banner1.png')}
                style={[st.banner, { opacity: fadeAnimBanner }]} />
        </View>
    );
};

export default SplashScreen;

const st = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        position: 'absolute',
    },
    banner: {
        width: '100%',
        height: '100%',
    }
});