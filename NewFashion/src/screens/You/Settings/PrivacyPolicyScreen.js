import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

const PrivacyPolicyScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapHeader}>
        <Pressable
          style={({pressed}) => [
            {opacity: pressed ? 0.5 : 1, flexDirection: 'row'},
          ]}
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.iconBack}
            source={require('../../../assets/ic_back.png')}
          />
        </Pressable>
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
      </View>
    </View>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapHeader: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 135,
    borderBottomWidth: 0.6,
    borderColor: '#BBBBBB',
  },
  iconBack: {
    width: 24,
    height: 24,
    tintColor: '#1E1E1E',
    resizeMode: 'contain',
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});
