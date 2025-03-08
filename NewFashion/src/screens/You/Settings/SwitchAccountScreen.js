import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import BaseHeader from '../../../components/BaseHeader';

const BlockAccountInfo = ({avatar, name, email, subscribe}) => {
  return (
    <Pressable
      style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.block]}>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{uri: avatar}} />
        <View style={styles.information}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      {subscribe ? (
        <Image
          style={styles.icon}
          source={require('../../../assets/icons/ic_selectedItem.png')}
        />
      ) : null}
    </Pressable>
  );
};

const SwitchAccountScreen = ({navigation}) => {
  const currentAccount = true;

  return (
    <View style={styles.container}>
      <BaseHeader
        title="Switch accounts"
        showLeftButton={true}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <View style={styles.lineHeader} />
      <BlockAccountInfo
        avatar="https://i.pinimg.com/236x/2d/eb/1f/2deb1f0fa4397872856cfe28e206d815.jpg"
        name="Minhyu Do"
        email="tof***esu@gmail.com"
        subscribe={currentAccount}
      />
      <Pressable
        style={({pressed}) => [
          {opacity: pressed ? 0.5 : 1},
          styles.blockButton,
        ]}>
        <View style={styles.buttonContainer}>
          <Image
            source={require('../../../assets/icons/ic_outline_plus.png')}
          />
        </View>
        <Text style={styles.p}>Add account</Text>
      </Pressable>
    </View>
  );
};

export default SwitchAccountScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  lineHeader: {
    width: '100%',
    height: 0.8,
    backgroundColor: '#BBBBBB',
  },
  block: {
    padding: 12,
    width: '93.5%',
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BBBBBB',
    marginHorizontal: 14,
    marginVertical: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  information: {
    gap: 4,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  email: {
    fontSize: 14,
    fontWeight: '500',
    color: '#737373',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#FE7018',
    marginTop: 12,
  },
  blockButton: {
    padding: 12,
    width: '93.5%',
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BBBBBB',
    marginHorizontal: 14,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
  },
  buttonContainer: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  p: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginLeft: 12,
    marginTop: 15,
  },
});
