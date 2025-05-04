import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import BaseHeader from '../../../components/BaseHeader';
import AppManager from '../../../utils/AppManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onGoogleSignOut} from "../../Login/signInWithGoogle";
import {useDispatch} from "react-redux";
import {logout} from "../../../redux/reducer/userReducer";

const options = [
  {
    id: '1',
    title: 'Sign in / Register',
    nameScreen: 'Login',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
    h3: 'Đăng ký / Đăng nhập',
  },
  {
    id: '3',
    title: 'Privacy',
    nameScreen: '',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
    h3: 'Đăng ký / Đăng nhập',
  },
  {
    id: '4',
    title: 'Permissions',
    nameScreen: '',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
    h3: 'Quyền',
  },
  {
    id: '5',
    title: 'Safety center',
    nameScreen: '',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
    h3: 'Trung tâm bảo mật',
  },
];

const anotherOptions = [
  {
    id: '4',
    title: 'Đăng xuất',
    nameScreen: '',
    h3: 'Đăng xuất'
  },
];

const SettingsScreen = ({navigation}) => {
  const handleNavigate = ({nameScreen}) => navigation.navigate(nameScreen);
  const filteredOptions = options
    .slice(1)
    .filter(item => item.title === 'Language');
  const mergedOptions = [...filteredOptions, ...anotherOptions];
  const dispatch = useDispatch();
  const Options = ({item: {id, title, language, icon}, index, onPress}) => {
    return (
      <Pressable
        style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}
        onPress={() => {
          onPress(id);
        }}>
        <View style={styles.row}>
          <Text style={styles.optionTitle}>{title}</Text>
          <View style={styles.rightSide}>
            <Text style={styles.language}>{language}</Text>
            <Image source={icon} style={styles.icon} />
          </View>
        </View>
        <View
          style={[
            index === 0 && (AppManager.shared.isUserLoggedIn() ? styles.line : styles.firstIndex),
            index !== 0 && (!AppManager.shared.isUserLoggedIn() ? styles.firstIndex : styles.line),
            index === options.length - 1 && styles.lastIndex,
            title === 'Sign out' && styles.lastIndex,
            title === 'Sign in / Register' && styles.firstIndex,
          ]}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <BaseHeader
        title="Cài đặt"
        showLeftButton={true}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <View style={styles.lineHeader} />
      {AppManager.shared.isUserLoggedIn() ? (
        <View>
          <View style={styles.heading}>
            <Text style={styles.h2}>Tài khoản của bạn được bảo vệ</Text>
            <Text style={styles.p}>
            New Fashion bảo vệ thông tin cá nhân của bạn và giữ cho thông tin đó được riêng tư, an toàn và bảo mật.
            </Text>
          </View>

          {/* Phần danh sách dưới */}
          {mergedOptions.map((item, index) => (
            <Options
              key={item.id}
              index={index}
              item={item}
              onPress={() => {
                if (item.title === 'Đăng xuất') {
                  AppManager.shared.removeUserInfo()
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Splash' }],
                  });

                  AsyncStorage.removeItem('browsingHistory');
                  dispatch(logout())
                  onGoogleSignOut();
                } else {
                  handleNavigate(item)
                }
              }}
            />
          ))}
        </View>
      ) : (
        options.map((item, index) => (
          <Options
            key={item.id}
            index={index}
            item={item}
            onPress={() => handleNavigate(item)}
          />
        ))
      )}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  lineHeader: {
    width: '100%',
    height: 0.8,
    backgroundColor: '#BBBBBB',
  },
  line: {
    width: '100%',
    height: 0.8,
    backgroundColor: '#BBBBBB',
    marginStart: 20,
  },
  firstIndex: {
    width: '100%',
    height: 10,
    backgroundColor: '#F3F3F3',
    marginStart: 0,
  },
  lastIndex: {
    backgroundColor: '#FFFFFF',
  },
  row: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  language: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#737373',
  },
  icon: {
    width: 10,
    height: 20,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  card: {
    width: '48%', // Để 2 card trên 1 dòng
    backgroundColor: '#FFF',
    marginBottom: 12,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.6,
    borderColor: '#BBBBBB',
  },
  innerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#078809',
  },
  list: {
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  listItem: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 16,
    color: '#777',
    fontWeight: 'bold',
  },
  heading: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 5,
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#078809',
  },
  p: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#737373',
    textAlign: 'justify',
  },
});
