import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Switch } from "react-native";
import { RadioButton } from "react-native-paper";
import SupportFunctions from '../../utils/SupportFunctions';

const PaymentAndCoupon = ({onPayment, newCart, personalInfo, onSwitch, onClickShowPopup }) => {
  useEffect(() => {
    console.log(newCart);
    
  }, [])
  
  const [selectedPayment, setSelectedPayment] = useState("direct");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    onSwitch(!isEnabled);
  }

  return (
    <View style={styles.container}>
      {/* payment */}
      <View style={styles.paymentContainer}>
        {/* title */}
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <View style={styles.titleContainer}>
          <Image source={require("../../assets/icons/ic_important.png")} style={styles.importantIcon} />
          <Text style={styles.subTitle}>Vui lòng chọn phương thức thanh toán</Text>
        </View>

        {/* Direct Payment */}
        <View style={styles.paymentOption}>
          <RadioButton
            value="direct"
            status={selectedPayment === "direct" ? "checked" : "unchecked"}
            onPress={() => {
              setSelectedPayment("direct")
              onPayment('direct')
            }}
          />
          <Image source={require("../../assets/icons/ic_cash.png")} style={styles.paymentIcon} />
          <Text style={styles.paymentText}>Thanh toán khi nhận hàng</Text>
        </View>

        {/* MoMo E-wallet */}
        <View style={styles.paymentOption}>
          <RadioButton
            value="momo"
            status={selectedPayment === "momo" ? "checked" : "unchecked"}
            onPress={() => {
              setSelectedPayment("momo")
              onPayment('momo')
            }}
          />
          <Image source={require("../../assets/icons/ic_momo.png")} style={styles.paymentIcon} />
          <Text style={styles.paymentText}>Ví điện tử Momo</Text>
        </View>
      </View>

      {/* line */}
      <View style={{ backgroundColor: '#eee', width: '100%', height: 10 }} />

      {/* Coupon */}
      <View style={[styles.titleContainer, { marginBottom: 0, padding: 15, justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={styles.couponText}>Áp dụng mã giảm giá</Text>
        <TouchableOpacity onPress={()=>onClickShowPopup()}>
          <Image source={require('../../assets/ic_arrowRight.png')} style={styles.importantIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.pointsContainer}>
        <Image
          source={require("../../assets/icons/ic_point.png")}
          style={styles.icon}
        />
        <Text style={styles.text}>
          Bạn có <Text style={styles.points}>{personalInfo?.point}</Text> điểm có thể sử dụng
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* line */}
      <View style={{ backgroundColor: '#eee', width: '100%', height: 10 }} />

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.textBold}>Giá ban đầu:</Text>
          <Text style={[styles.textBold, { textDecorationLine: 'line-through', color: '#737373' }]}>{SupportFunctions.convertPrice(newCart.total)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.textBold}>Ưu đãi:</Text>
          <Text style={[styles.textBold, { textDecorationLine: 'line-through', color: '#D96923' }]}>{SupportFunctions.convertPrice(newCart.maxDiscount)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.textBold}>Điểm:</Text>
          <Text style={[styles.textBold, { textDecorationLine: 'line-through', color: '#D96923' }]}>{SupportFunctions.convertPrice(isEnabled ? personalInfo.point : 0)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.textBold}>Tổng sản phẩm:</Text>
          <Text style={styles.textBold}>{SupportFunctions.convertPrice((
              Math.max((newCart.finalTotal - (isEnabled ? personalInfo.point : 0)),0)
          ))}</Text>
        </View>

        <View style={[styles.summaryRow, { borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 15, borderColor: '#D7D7D7' }]}>
          <Text style={styles.textBold}>Phí vận chuyển:</Text>
          <Text style={[styles.textBold, { color: '#078809' }]}>miễn phí</Text>
        </View>

        <View style={{ width: '100%', flexDirection: 'column' }}>
          <View style={styles.summaryRow}>
            <Text style={[styles.textBold, { fontSize: 20 }]}>Tổng đơn hàng:</Text>
            <Text style={[styles.textBold, { fontSize: 20 }]}>{SupportFunctions.convertPrice((
                Math.max((newCart.finalTotal - (isEnabled ? personalInfo.point : 0)),0)
            ))}</Text>
          </View>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: 'column'
  },
  paymentContainer: {
    padding: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  subTitle: {
    color: '#737373'
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 15
  },
  importantIcon: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  //payment
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#D7D7D7'
  },
  paymentIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5
  },
  //coupon
  couponText: {
    fontSize: 18,
    color: "#000",
    fontWeight: 'bold'
  },
  //summary
  summaryContainer: {
    padding: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textStrikethrough: {
    textDecorationLine: "line-through",
    color: "#777",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#000'
  },
  subTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Cho phép tự động xuống dòng khi hết chỗ
    width: '100%', // Chiều rộng 100% để đảm bảo xuống dòng khi cần
    alignItems: 'center',
  },
  link: {
    fontSize: 15,
    color: '#1976D2',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingVertical: 10
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  points: {
    fontWeight: 'bold',
  },
});

export default PaymentAndCoupon;