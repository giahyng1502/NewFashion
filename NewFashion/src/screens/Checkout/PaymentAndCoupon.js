import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Switch } from "react-native";
import { RadioButton } from "react-native-paper";
import SupportFunctions from '../../utils/SupportFunctions';

const PaymentAndCoupon = ({ products, personalInfo, onSwitch }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    onSwitch(!isEnabled);
  }

  const getFinalPriceOfSelectedItems = () => {
    return products
      .filter(item => item.isSelected)
      .reduce((total, item) => {
        const discountMultiplier = item.disCountSale > 0 ? (1 - item.disCountSale / 100) : 1;
        const itemPrice = item.price * discountMultiplier * item.quantity;
        return total + itemPrice;
      }, 0);
  }

  const getOriginalPriceOfSelectedItems = () => {
    return products
      .filter(item => item.isSelected)
      .reduce((total, item) => {
        const itemPrice = item.price * item.quantity;
        return total + itemPrice;
      }, 0);
  }

  const getDiscountPriceOfSelectedItems = () => {
    return getOriginalPriceOfSelectedItems() - getFinalPriceOfSelectedItems();
  }

  return (
    <View style={styles.container}>
      {/* payment */}
      <View style={styles.paymentContainer}>
        {/* title */}
        <Text style={styles.sectionTitle}>Payment methods</Text>
        <View style={styles.titleContainer}>
          <Image source={require("../../assets/icons/ic_important.png")} style={styles.importantIcon} />
          <Text style={styles.subTitle}>Please select a payment method</Text>
        </View>

        {/* Direct Payment */}
        <View style={styles.paymentOption}>
          <RadioButton
            value="direct"
            status={selectedPayment === "direct" ? "checked" : "unchecked"}
            onPress={() => setSelectedPayment("direct")}
          />
          <Image source={require("../../assets/icons/ic_cash.png")} style={styles.paymentIcon} />
          <Text style={styles.paymentText}>Direct payment</Text>
        </View>

        {/* MoMo E-wallet */}
        <View style={styles.paymentOption}>
          <RadioButton
            value="momo"
            status={selectedPayment === "momo" ? "checked" : "unchecked"}
            onPress={() => setSelectedPayment("momo")}
          />
          <Image source={require("../../assets/icons/ic_momo.png")} style={styles.paymentIcon} />
          <Text style={styles.paymentText}>Momo e-wallet</Text>
        </View>

        {/* ZaloPay */}
        <View style={[styles.paymentOption, { marginBottom: 0, borderBottomWidth: 0, paddingBottom: 0 }]}>
          <RadioButton
            value="zalopay"
            status={selectedPayment === "zalopay" ? "checked" : "unchecked"}
            onPress={() => setSelectedPayment("zalopay")}
          />
          <Image source={require("../../assets/icons/ic_zaloPay.png")} style={styles.paymentIcon} />
          <Text style={styles.paymentText}>Zalopay</Text>
        </View>
      </View>

      {/* line */}
      <View style={{ backgroundColor: '#eee', width: '100%', height: 10 }} />

      {/* Coupon */}
      <View style={[styles.titleContainer, { marginBottom: 0, padding: 15, justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={styles.couponText}>Apply coupon</Text>
        <TouchableOpacity>
          <Image source={require('../../assets/ic_arrowRight.png')} style={styles.importantIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.pointsContainer}>
        <Image
          source={require("../../assets/icons/ic_point.png")}
          style={styles.icon}
        />
        <Text style={styles.text}>
          You have <Text style={styles.points}>{personalInfo.point}</Text> points that can be used
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
          <Text style={styles.textBold}>Item(s) total:</Text>
          <Text style={[styles.textBold, { textDecorationLine: 'line-through', color: '#737373' }]}>{SupportFunctions.convertPrice(getOriginalPriceOfSelectedItems())}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.textBold}>Item(s) discount:</Text>
          <Text style={[styles.textBold, { textDecorationLine: 'line-through', color: '#D96923' }]}>{SupportFunctions.convertPrice(getDiscountPriceOfSelectedItems())}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.textBold}>Points:</Text>
          <Text style={[styles.textBold, { textDecorationLine: 'line-through', color: '#D96923' }]}>{SupportFunctions.convertPrice(isEnabled ? personalInfo.point : 0)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.textBold}>Subtotal:</Text>
          <Text style={styles.textBold}>{SupportFunctions.convertPrice(getFinalPriceOfSelectedItems())}</Text>
        </View>

        <View style={[styles.summaryRow, { borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 15, borderColor: '#D7D7D7' }]}>
          <Text style={styles.textBold}>Shipping:</Text>
          <Text style={[styles.textBold, { color: '#078809' }]}>FREE</Text>
        </View>

        <View style={{ width: '100%', flexDirection: 'column' }}>
          <View style={styles.summaryRow}>
            <Text style={[styles.textBold, { fontSize: 20 }]}>Order total:</Text>
            <Text style={[styles.textBold, { fontSize: 20 }]}>{SupportFunctions.convertPrice(getFinalPriceOfSelectedItems() - (isEnabled ? personalInfo.point : 0))}</Text>
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
  text: {
    fontSize: 15,
    color: '#737373',
    fontWeight: 'bold',
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