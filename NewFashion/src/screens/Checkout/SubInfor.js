import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SubInfor = () => {
  const sections = [
    {
      title: 'Delivery guarantee',
      image: require("../../assets/icons/ic_greenTruck.png"),
      items: [
        '25.000đ Credit for delay',
        'Return if item damaged',
        '15-day no update refund',
        '30-day no delivery refund',
      ],
      showLearnMore: false, // Không hiển thị Learn More
    },
    {
      title: 'Secure privacy',
      image: require("../../assets/icons/ic_greenLock.png"),
      description:
        'Protecting your privacy is important to us! Please be assured that your information will be kept secured and uncompromised. We do not sell your personal information for money and will only use your information in accordance with our privacy and cookie policy to provide and improve our services to you.',
      showLearnMore: true, // Hiển thị Learn More
    },
    {
      title: 'New Fashion purchase protection',
      image: require("../../assets/icons/ic_greenLock.png"),
      description:
        'Shop confidently on New Fashion knowing that if something goes wrong, we’ve always got your back.',
      showLearnMore: true, // Hiển thị Learn More
    },
  ];

  return (
    <View style={styles.container}>
      {sections.map((item, index) => (
        <View key={index} style={styles.card}>
          {/* Tiêu đề + Ảnh */}
          <View style={styles.header}>
            <Image source={item.image} style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
          </View>

          {/* Nếu có danh sách thì hiển thị, nếu không thì hiển thị mô tả */}
          {item.items ? (
            <View>
              {item.items.map((text, i) => (
                <View key={i} style={styles.listItem}>
                  <Image source={require("../../assets/icons/ic_greenCheck2.png")} style={styles.icon} />
                  <Text style={[styles.listText,{marginLeft:8}]}>{text}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.listText,{marginBottom:10}]}>{item.description}</Text>
          )}

          {/* Nút Learn More (chỉ hiển thị khi cần) */}
          {item.showLearnMore && (
            <View style={[styles.header,{marginBottom:0}]}>
              <Text style={[styles.listText,{marginRight:8}]}>Learn more</Text>
              <TouchableOpacity>
                <Image source={require('../../assets/ic_arrowRight.png')} style={styles.subIcon}/>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  card:{
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  subIcon:{
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    color:'#078809'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  listText: {
    fontSize: 16,
    color:'#737373',
    fontWeight:'bold'
  },
});

export default SubInfor;
