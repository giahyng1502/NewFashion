import { StyleSheet, Image, View, Animated, Alert } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { fetchCategories } from '../redux/actions/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import AppManager from '../utils/AppManager';
import { fetchProducts, fetchSaleProducts } from '../redux/actions/productActions';
import { fetchOrders } from '../redux/actions/orderActions';
import { fetchInformation } from '../redux/actions/infomationActions';

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

            // Gọi và unwrap fetchCategories
            const fetchResult = await dispatch(fetchCategories()).unwrap();
            if (!fetchResult) {
                throw new Error('Fetch categories failed');
            }

            // Gọi và unwrap fetchProducts
            const fetchProduct = await dispatch(fetchProducts(1)).unwrap();
            if (!fetchProduct) {
                throw new Error('Fetch products failed');
            }

            const fetchSaleProduct = await dispatch(fetchSaleProducts(1)).unwrap();
            if (!fetchSaleProduct) {
                throw new Error('Fetch sale products failed');
            }


            const token = await AppManager.shared.getToken();
            console.log('Token:', token);

            if (token) {
                const fetchPersonalInfo = await dispatch(fetchInformation()).unwrap();
            }

            navigation.replace('Main');
        } catch (error) {
            console.log('Load data error: ', error);
            Alert.alert('Error', 'Load data error');
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