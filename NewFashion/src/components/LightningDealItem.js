import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import SupportFunctions from '../utils/SupportFunctions';

const LightningDealItem = ({ item, onPress }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const startTime = new Date(item.createdAt).getTime();
      const endTime = new Date(item.expireAt).getTime();

      const totalTime = endTime - startTime;
      const elapsedTime = currentTime - startTime;

      const progressPercent = Math.min(elapsedTime / totalTime, 1) * 100;
      setProgress(progressPercent);
    }, 1000);

    return () => clearInterval(interval);
  }, [item.createdAt, item.expireAt]);

  return (
    <TouchableOpacity style={st.productItem} onPress={onPress}>
      <Image source={{ uri: item.productId.image[0] }} style={st.productImage} />

      <View style={st.labelContainer}>
          <Text style={st.labelText}>{`Only ${item.limit} left`}</Text>
        </View>
      <Text style={st.priceText}>{SupportFunctions.convertPrice(item.productId.price)}</Text>
      <Text style={st.soldText}>{item.productId.sold} sold</Text>
      <View style={st.progressBarBackground}>
        <View style={[st.progressBarFill, { width: `${progress}%` }]}>
          <Image source={require('../assets/icons/ic_clock.png')} style={{ width: 14, height: 14, position: 'absolute', right: -7, top: -4.5 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const st = StyleSheet.create({
  productItem: {
    width: 100,
    marginRight: 15,
  },
  productImage: {
    position: 'relative',
    width: '100%',
    height: 100,
  },
  labelContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 25,
    top: 70,
    opacity: 0.8,
  },
  labelText: {
    fontSize: 10,
    color: '#fff',
  },
  priceText: {
    fontSize: 14,
    color: '#FE7018',
    fontWeight: 'bold',
    marginTop: 8,
    width: '100%',
    textAlign: 'center',
  },
  soldText: {
    fontSize: 12,
    color: '#737373',
    marginTop: 3,
    width: '100%',
    textAlign: 'center',
  },

  progressBarBackground: {
    height: 5,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginTop: 8,
  },
  progressBarFill: {
    height: 5,
    backgroundColor: '#000',
    borderRadius: 3,
  },
})

export default LightningDealItem;
