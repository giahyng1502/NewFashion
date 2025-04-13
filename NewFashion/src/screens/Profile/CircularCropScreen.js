import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image as RNImage,
} from 'react-native';
import Svg, {Rect, Mask, Circle} from 'react-native-svg';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import PhotoManipulator from 'react-native-photo-manipulator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchInformation,
  updateInformation,
} from '../../redux/actions/infomationActions';
import {updateUser} from '../../redux/actions/userActions';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const CROP_SIZE = 280;

export default function CircularCropScreen() {
  const navigation = useNavigation();
  const {params} = useRoute();
  const {personalInfo} = useSelector(state => state.personalInfo);
  const dispatch = useDispatch();

  const [originalSize, setOriginalSize] = useState({width: 0, height: 0});

  const [imageDisplaySize, setImageDisplaySize] = useState({
    width: screenWidth,
    height: screenHeight,
  });

  // useEffect để lấy kích thước gốc
  useEffect(() => {
    if (!params?.imagePath) return;

    RNImage.getSize(
      params.imagePath,
      (w, h) => {
        setOriginalSize({width: w, height: h});
        const scaleFactor = Math.min(screenWidth / w, screenHeight / h);
        setImageDisplaySize({
          width: w * scaleFactor,
          height: h * scaleFactor,
        });
      },
      error => {
        console.warn('getSize error:', error);
      },
    );
  }, [params?.imagePath]);

  // Reanimated gestures
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const baseScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onEnd(() => {
      translateX.value = withTiming(translateX.value);
      translateY.value = withTiming(translateY.value);
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = baseScale.value * event.scale;
    })
    .onEnd(() => {
      const clamped = Math.min(Math.max(scale.value, 1), 3);
      scale.value = withTiming(clamped);
      baseScale.value = clamped;
    });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  console.log('originalSize: ', originalSize);
  console.log('imageDisplaySize: ', imageDisplaySize);

  const onCrop = async () => {
    if (!params?.imagePath) return;

    const cropXScreen = (screenWidth - CROP_SIZE) / 2;
    const cropYScreen = (screenHeight - CROP_SIZE) / 2;

    const imageLeft =
      (screenWidth - imageDisplaySize.width) / 2 + translateX.value;
    const imageTop =
      (screenHeight - imageDisplaySize.height) / 2 + translateY.value;

    const cropRelativeX = (cropXScreen - imageLeft) / scale.value;
    const cropRelativeY = (cropYScreen - imageTop) / scale.value;

    const ratioX = originalSize.width / imageDisplaySize.width;
    const ratioY = originalSize.height / imageDisplaySize.height;

    let cropRegion = {
      x: cropRelativeX * ratioX,
      y: cropRelativeY * ratioY,
      width: (CROP_SIZE / scale.value) * ratioX,
      height: (CROP_SIZE / scale.value) * ratioY,
    };

    // Clamp
    cropRegion.x = Math.max(
      0,
      Math.min(cropRegion.x, originalSize.width - cropRegion.width),
    );
    cropRegion.y = Math.max(
      0,
      Math.min(cropRegion.y, originalSize.height - cropRegion.height),
    );

    console.log('cropRegion : ', cropRegion);

    try {
      const croppedImage = await PhotoManipulator.crop(
        params.imagePath,
        cropRegion,
      );

      const data = {...personalInfo, avatar: croppedImage};
      await dispatch(updateUser(data)).unwrap();
      await dispatch(fetchInformation()).unwrap();
      navigation.pop();
    } catch (err) {
      console.log('Crop error', err);
    }
  };

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[animatedStyle, StyleSheet.absoluteFill]}>
          {params.imagePath ? (
            <Image
              source={{uri: params.imagePath}}
              style={styles.image}
              resizeMode="contain"
            />
          ) : null}
        </Animated.View>
      </GestureDetector>

      {/* Crop Mask */}
      <Svg
        height={screenHeight}
        width={screenWidth}
        style={StyleSheet.absoluteFill}>
        <Mask id="mask">
          <Rect height={screenHeight} width={screenWidth} fill="white" />
          <Circle
            r={CROP_SIZE / 2}
            cx={screenWidth / 2}
            cy={screenHeight / 2}
            fill="black"
          />
        </Mask>
        <Rect
          height={screenHeight}
          width={screenWidth}
          fill="black"
          fillOpacity={0.6}
          mask="url(#mask)"
        />
      </Svg>

      {/* Crop border */}
      <View
        style={[
          styles.cropCircle,
          {
            width: CROP_SIZE,
            height: CROP_SIZE,
            top: (screenHeight - CROP_SIZE) / 2,
            left: (screenWidth - CROP_SIZE) / 2,
            borderRadius: CROP_SIZE / 2,
          },
        ]}
      />

      <View style={styles.wrapperHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Huỷ</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Chỉnh sửa ảnh</Text>
        <TouchableOpacity onPress={onCrop}>
          <Text style={styles.doneButton}>Xong</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  wrapperHeader: {
    position: 'absolute',
    zIndex: 9999,
    elevation: 10,
    backgroundColor: '#FFFFFF',
    width: screenWidth,
    height: 60,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
  cropCircle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'white',
  },
  doneButton: {color: '#000', fontWeight: 'bold', fontSize: 16},
  backButton: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
