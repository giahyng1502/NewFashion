import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import BaseHeader from '../../../components/BaseHeader';
import AppManager from '../../../utils/AppManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
  {
    id: '1',
    title: 'Sign in / Register',
    nameScreen: 'Login',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
  },
  {
    id: '2',
    title: 'Language',
    language: 'English',
    nameScreen: 'Language',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
  },
  {
    id: '3',
    title: 'Privacy',
    nameScreen: '',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
  },
  {
    id: '4',
    title: 'Permissions',
    nameScreen: '',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
  },
  {
    id: '5',
    title: 'Safety center',
    nameScreen: '',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
  },
];

const anotherOptions = [
  {
    id: '3',
    title: 'Switch accounts',
    nameScreen: 'SwitchAccount',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
  },
  {
    id: '4',
    title: 'Sign out',
    nameScreen: '',
  },
];

const settings = [
  {
    id: '1',
    iconLeft: require('../../../assets/icons/ic_account.png'),
    title: 'Account security',
    iconRight: require('../../../assets/icons/ic_arrowRight1.png'),
    nameScreen: 'AccountSecurity',
  },
  {
    id: '2',
    iconLeft: require('../../../assets/icons/ic_shieldLock.png'),
    title: 'Privacy',
    iconRight: require('../../../assets/icons/ic_arrowRight1.png'),
    nameScreen: 'Privacy',
  },
  {
    id: '3',
    iconLeft: require('../../../assets/icons/ic_shieldKey.png'),
    title: 'Permissions',
    iconRight: require('../../../assets/icons/ic_arrowRight1.png'),
    nameScreen: 'Permissions',
  },
  {
    id: '4',
    iconLeft: require('../../../assets/icons/ic_shieldCheck.png'),
    title: 'Safety center',
    iconRight: require('../../../assets/icons/ic_arrowRight1.png'),
    nameScreen: 'SafetyCenter',
  },
];

const SettingsScreen = ({navigation}) => {
  const handleNavigate = ({nameScreen}) => navigation.navigate(nameScreen);
  const filteredOptions = options
    .slice(1)
    .filter(item => item.title === 'Language');
  const mergedOptions = [...filteredOptions, ...anotherOptions];

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
        title="Settings"
        showLeftButton={true}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <View style={styles.lineHeader} />
      {AppManager.shared.isUserLoggedIn() ? (
        <View>
          <View style={styles.heading}>
            <Text style={styles.h2}>Your account is protected</Text>
            <Text style={styles.p}>
              New Fashion protects your personal information and keeps it
              private, safe and secure.
            </Text>
          </View>

          {/* Grid 2x2 */}
          <View style={styles.grid}>
            {settings.map(item => (
              <Pressable
                key={item.id}
                style={({pressed}) => [
                  {opacity: pressed ? 0.5 : 1},
                  styles.card,
                ]}
                onPress={() => handleNavigate(item)}>
                <View style={styles.innerCard}>
                  <Image source={item.iconLeft} style={styles.innerIcon} />
                  <Text style={styles.text}>{item.title}</Text>
                </View>
                <Image source={item.iconRight} style={styles.innerIcon} />
              </Pressable>
            ))}
          </View>
          <View style={styles.firstIndex} />

          {/* Phần danh sách dưới */}
          {mergedOptions.map((item, index) => (
            <Options
              key={item.id}
              index={index}
              item={item}
              onPress={() => {
                if (item.title === 'Sign out') {
                  AppManager.shared.removeUserInfo()
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Splash' }],
                  });

                  AsyncStorage.removeItem('browsingHistory');
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
