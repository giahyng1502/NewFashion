import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import BenefitsInfoBox from '../../components/BenefitsInfoBox';
import FilledButton from '../../components/FilledButton';
import ProductCard from '../../components/ProductCard';
import AppManager from '../../utils/AppManager'
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {id} from "@gorhom/bottom-sheet/lib/typescript/utilities/id";

const menuItems = [
  {
    id: '1',
    image: require('../../assets/icons/ic_message.png'),
    text: 'Messages',
    h3: 'Tin nhắn',
  },
  {
    id: '2',
    image: require('../../assets/icons/ic_yourOrder.png'),
    text: 'Your orders',
    h3: 'Đơn hàng của bạn',
  },
  {
    id: '3',
    image: require('../../assets/icons/ic_couponPercent.png'),
    text: 'Coupons & offers',
    h3: 'Đơn hàng của bạn',
  },
  {
    id: '4',
    image: require('../../assets/icons/ic_Adress.png'),
    text: 'Addresses',
    h3: 'Đơn hàng của bạn',
  },
  {
    id: '5',
    image: require('../../assets/icons/ic_support.png'),
    text: 'Customer support',
    h3: 'Đơn hàng của bạn',
  },
  {
    id: '6',
    image: require('../../assets/icons/ic_settings.png'),
    text: 'Settings',
    h3: 'Đơn hàng của bạn',
  },
];

const bottomMenuItems = [
  {
    id: '1',
    title: 'Addresses',
    icon: require('../../assets/icons/ic_Adress.png'),
    h3: 'Địa chỉ giao hàng',
  },
  {
    id: '2',
    title: 'Notification',
    icon: require('../../assets/icons/ic_notification.png'),
    h3: 'Thông báo',
  },
  {
    id: '3',
    title: 'Coupons & offers',
    icon: require('../../assets/icons/ic_couponPercent.png'),
    h3: 'Phiếu giảm giá & ưu đãi',
  },
];

const YouScreen = ({ navigation }) => {

  const { personalInfo } = useSelector(state => state.personalInfo);
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleNavigate = (item) => {
    if (item.text !== 'Messages') {
      navigation.navigate(item.text);
    }
    else {
      if (personalInfo._id) {
        if (personalInfo?.role === 0) {
          navigation.navigate('ChatDetail',{id : '67eeafc786a3c7e95e9d3a73'});
        }
        else if (personalInfo?.role === 1 || personalInfo?.role === 2) {
          navigation.navigate(item.text);
        }
      }else {
        navigation.navigate('Login');
      }
    }
  }
  useEffect(() => {
    const fetchBrowsingHistory = async () => {
      try {
        // Lấy mảng browsingHistory từ AsyncStorage
        const storedHistory = await AsyncStorage.getItem('browsingHistory');
        const historyArray = storedHistory ? JSON.parse(storedHistory) : [];
        setBrowsingHistory(historyArray);
      } catch (error) {
        console.error('Error fetching browsing history:', error);
      }
    };

    fetchBrowsingHistory();
  }, []);

  useEffect(() => {
    console.log('personalInfo:', personalInfo);

    if (personalInfo && personalInfo.information) {

      setLoading(false);
    } else {
      console.log('No personalInfo data or empty information array');
      setLoading(false);
    }
  }, [personalInfo]);

  const handleSelectedItem = item => {
    navigation.navigate('ProductDetail', { item });
  }

  if (loading) {
    return (
      <View style={st.loadingContainer}>
        <ActivityIndicator size="large" color="#FA7806" />
      </View>
    );
  }

  return (
    <View style={st.container}>
      {/* Danh sách  lịch sử sản phẩm */}
      <FlatList
        data={browsingHistory}
        keyExtractor={item => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1 / 2, padding: 5 }}>
            <ProductCard
              item={item}
              onSelected={() => { handleSelectedItem(item) }}
            />
          </View>
        )}
        contentContainerStyle={st.list}
        ListHeaderComponent={
          <View>
            {/* islogin = false */}
            {!AppManager.shared.isUserLoggedIn() && (
              <>
                <View>
                  <View style={st.header}>
                    <Text style={st.title}>
                    Đăng nhập để có trải nghiệm tốt nhất
                    </Text>
                    <View style={st.infoContainer}>
                      <BenefitsInfoBox
                        icon={require('../../assets/icons/ic_freeReturns.png')}
                        title="Trả lại miễn phí"
                        subtitle="Lên đến 90 ngày"
                      />
                      <BenefitsInfoBox
                        icon={require('../../assets/icons/ic_freeShipping.png')}
                        title="Miễn phí vận chuyển"
                        subtitle="Trên tất cả các đơn hàng"
                      />
                    </View>
                    <FilledButton
                      title="Đăng nhập / Đăng ký"
                      customStyle={{
                        backgroundColor: 'black',
                        width: '100%',
                        marginTop: 20,
                      }}
                      onPress={() => navigation.navigate('Login')}
                    />
                  </View>
                  {/* menu item */}
                  <View style={st.separator} />
                  {menuItems.map(item => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      onPress={item => handleNavigate(item)}
                    />
                  ))}
                  <View style={st.historyItem}>
                    <Text style={st.sectionTitle}>Lịch sử tìm kiếm</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#737373',
                          fontWeight: '700',
                          flex: 1,
                        }}>
                        Đăng nhập để xem các mục đã xem gần đây
                      </Text>
                      <Image
                        source={require('../../assets/icons/ic_next.png')}
                        style={{ height: 15, width: 15 }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
            {/*  islogin = true */}
            {AppManager.shared.isUserLoggedIn() && (
              <>
                <View>
                  <View style={st.userInfo}>
                    <Image source={{ uri: personalInfo?.avatar }} style={st.avatar} />
                    <Text style={st.userName}>{personalInfo?.name}</Text>
                    <View style={st.headerIcons}>
                      <Image
                        source={require('../../assets/icons/ic_support.png')}
                        style={st.icon}
                      />
                      <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                        <Image
                          source={require('../../assets/icons/ic_settings.png')}
                          style={st.icon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {menuItems.slice(0, 2).map(item => (
                    <MenuItem key={item.id} item={item} onPress={item => handleNavigate(item)} />
                  ))}
                  <View style={st.bottomMenu}>
                    {bottomMenuItems.map(item => (
                      <TouchableOpacity key={item.id} style={st.bottomMenuItem} onPress={() => navigation.navigate(item.title)}>
                        <Image source={item.icon} style={st.menuIcon} />
                        <Text style={st.menuText}>{item.h3}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text
                    style={[st.sectionTitle, { marginLeft: 15, marginTop: 5 }]}>
                    Lịch sử tìm kiếm
                  </Text>

                  {browsingHistory.length === 0 && (
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#737373',
                        fontWeight: '700',
                        marginLeft: 15,
                        marginTop: 100,
                        textAlign: 'center',
                      }}>
                      Không có mục nào trong lịch sử duyệt web
                    </Text>
                  )}
                </View>
              </>
            )}
          </View>
        }
      />
    </View>
  );
};

const MenuItem = ({ item, onPress }) => (
  <TouchableOpacity
    style={st.menuItem}
    onPress={() => {
      onPress(item);
    }}>
    <Image source={item.image} style={st.menuIcon} />
    <Text style={st.menuText}>{item.h3}</Text>
    <Image
      source={require('../../assets/icons/ic_next.png')}
      style={{ height: 15, width: 15 }}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

export default YouScreen;

const st = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    padding: 14,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 50,
  },
  menuItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#B1B1B1',
  },
  menuText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  historyItem: {
    padding: 13,
    borderTopWidth: 5,
    borderTopColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 3,
    backgroundColor: '#fff',
  },
  separator: {
    height: 5,
    backgroundColor: '#EEEEEE',
  },
  //
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 5,
    borderBlockColor: '#EEEEEE',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  menuBottomText: {
    fontSize: 16,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 13,
    backgroundColor: '#fff',
    borderTopWidth: 5,
    borderTopColor: '#EEEEEE',
    borderBottomWidth: 5,
    borderBlockColor: '#EEEEEE',
  },
  bottomMenuItem: {
    alignItems: 'center',
  },
});
