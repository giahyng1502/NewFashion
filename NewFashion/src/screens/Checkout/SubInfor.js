import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const SubInfor = () => {
  const sections = [
    {
      title: 'Đảm bảo giao hàng',
      image: require("../../assets/icons/ic_greenTruck.png"),
      items: [
        '25.000đ tín dụng do giao hàng chậm',
        'Hoàn trả nếu hàng bị hư hỏng',
        'Hoàn tiền nếu không có cập nhật trong 15 ngày',
        'Hoàn tiền nếu không giao hàng trong 30 ngày',
      ],
      showLearnMore: false, // Không hiển thị Learn More
    },
    {
      title: 'Chính sách bảo mật',
      image: require("../../assets/icons/ic_greenLock.png"),
      description:
        'Việc bảo vệ quyền riêng tư của bạn là rất quan trọng đối với chúng tôi! Xin hãy yên tâm rằng thông tin của bạn sẽ được giữ an toàn và không bị xâm phạm. Chúng tôi không bán thông tin cá nhân của bạn để lấy tiền và chỉ sử dụng thông tin đó theo chính sách quyền riêng tư và cookie của chúng tôi nhằm cung cấp và cải thiện các dịch vụ dành cho bạn.',
      showLearnMore: true,
      link:'https://www.freeprivacypolicy.com/live/9e7e7430-63f1-4258-beae-999dd85300cc' // Hiển thị Learn More
    },
    {
      title: 'New Fashion bảo vệ người mua',
      image: require("../../assets/icons/ic_greenLock.png"),
      description:
        'Yên tâm mua sắm tại New Fashion vì nếu có bất kỳ sự cố nào xảy ra, chúng tôi luôn sẵn sàng hỗ trợ bạn.',
      showLearnMore: true,
      link:'https://www.freeprivacypolicy.com/live/a1f3fc15-3468-4c50-897d-7d126f8de39e' // Hiển thị Learn More
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
              <TouchableOpacity onPress={()=>{Linking.openURL(item.link)}} style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={[styles.listText,{marginRight:8}]}>Tìm hiểu thêm</Text>
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
