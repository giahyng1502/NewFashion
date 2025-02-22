import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const StarRating = ({ rating, maxStars = 5 }) => {
  const fullStar = require('../assets/icons/ic_fullStar.png');
  const halfStar = require('../assets/icons/ic_halfStar.png');
  const emptyStar = require('../assets/icons/ic_emptyStar.png');

  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(fullStar); 
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(halfStar); 
    } else {
      stars.push(emptyStar); 
    }
  }

  return (
    <View style={styles.container}>
      {stars.map((star, index) => (
        <Image key={index} source={star} style={styles.starImage} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starImage: {
    width: 12, 
    height: 12,
    marginRight: 2,
  }
});

export default StarRating;
