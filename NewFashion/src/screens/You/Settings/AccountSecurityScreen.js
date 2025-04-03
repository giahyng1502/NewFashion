import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import BaseHeader from '../../../components/BaseHeader';

const getPasswordStrength = password => {
  const specialChars = password.replace(/[a-zA-Z0-9]/g, '').length;
  const length = password.length;

  if (length >= 10 || (length > 8 && specialChars > 0)) {
    return {label: 'Strong', color: '#078809'};
  }
  if (length >= 8 && specialChars === 0) {
    return {label: 'Fair', color: '#EE640F'};
  }
  if (length === 8 && specialChars > 0) {
    return {label: 'Good', color: '#EF9E1C'};
  }
  if (length === 6 && specialChars >= 3) {
    return {label: 'Strong', color: '#078809'};
  }
  return {label: 'Weak', color: '#DF0808'};
};

const formatPhoneNumber = phone =>
  phone?.replace(/^0(\d{3})(\d{3})(\d{3})$/, '0$1 $2 $3') || '';

const getButtonText = value => (value ? 'Edit' : 'Add');

const AccountSecurityScreen = ({navigation}) => {
  const googleAccountSignedIn = true;
  const facebookAccountSignedIn = false;
  const hasPassword = true;
  const hasPhonenumber = true;
  const hasEmail = true;
  const password = 'hieu2001@!';
  const phoneNumber = '0975953696';
  const email = 'tofuhieesu@gmail.com';

  const {label, color} = getPasswordStrength(password);

  const getPasswordDescription = () => {
    if (hasPassword) {
      return (
        <View>
          <Text>{hasPassword ? '******' : ''}</Text>
          <Text style={styles.passwordQuality}>
            Password quality:{' '}
            <Text style={{color: color, fontWeight: 'bold'}}>{label}.</Text> A
            stronger password will protect your account better.
          </Text>
        </View>
      );
    }
    return null;
  };

  const passwordDescription = getPasswordDescription();

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#FFFFFF'}}>
        <BaseHeader
          title="Account security"
          showLeftButton={true}
          onLeftButtonPress={() => navigation.goBack()}
        />
        <View style={styles.lineHeader} />
        <View style={styles.heading}>
          <View style={styles.circleContainer}>
            <Image
              style={styles.iconHeading}
              source={require('../../../assets/icons/ic_account.png')}
            />
          </View>
          <View style={styles.innerHeading}>
            <Text style={styles.h2}>Your account is protected</Text>
            <Text style={styles.p}>
              Your New Fashion account is protected by advanced security.
              Keeping this information up-to-date safeguards your account even
              more.
            </Text>
          </View>
        </View>
        <View style={styles.lineHeader} />
        <View style={styles.contentContainer}>
          <View style={styles.innerContent}>
            <View style={styles.wrapContent}>
              <Text style={styles.h3}>Mobile phone number</Text>
              {hasPhonenumber && (
                <Text style={[styles.p, {color: '#1E1E1E'}]}>
                  {formatPhoneNumber(phoneNumber)}
                </Text>
              )}
            </View>
            <Pressable
              style={({pressed}) => [
                {opacity: pressed ? 0.5 : 1},
                styles.button,
              ]}>
              <Text style={styles.textButton}>
                {getButtonText(hasPhonenumber)}
              </Text>
            </Pressable>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.innerContent}>
            <View style={styles.wrapContent}>
              <Text style={styles.h3}>Email</Text>
              {hasEmail && (
                <Text style={[styles.p, {color: '#1E1E1E'}]}>{email}</Text>
              )}
            </View>
            <Pressable
              style={({pressed}) => [
                {opacity: pressed ? 0.5 : 1},
                styles.button,
              ]}>
              <Text style={styles.textButton}>{getButtonText(hasEmail)}</Text>
            </Pressable>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.innerContent}>
            <View style={styles.wrapContent}>
              <Text style={styles.h3}>Password</Text>
              {passwordDescription}
            </View>
            <Pressable
              style={({pressed}) => [
                {opacity: pressed ? 0.5 : 1},
                styles.button,
              ]}>
              <Text style={styles.textButton}>
                {getButtonText(hasPassword)}
              </Text>
            </Pressable>
          </View>
          <View style={{height: 6, backgroundColor: '#FAFAFA'}} />
        </View>
        <Text style={[styles.h3, {paddingTop: 12, paddingStart: 12}]}>
          Third-party accounts
        </Text>
        <View style={styles.contentContainer}>
          <View style={styles.innerContent}>
            <View style={[styles.wrapContent, {flexDirection: 'row', gap: 10}]}>
              <Image source={require('../../../assets/bt_google.png')} />
              <Text style={styles.h3}>Google</Text>
            </View>
            <Pressable
              style={({pressed}) => [
                googleAccountSignedIn ? {} : {opacity: pressed ? 0.5 : 1},
                googleAccountSignedIn ? styles.linked : styles.button,
              ]}>
              <Text
                style={
                  googleAccountSignedIn ? styles.textLinked : styles.textButton
                }>
                {googleAccountSignedIn ? 'Linked' : 'Link'}
              </Text>
            </Pressable>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.innerContent}>
            <View style={[styles.wrapContent, {flexDirection: 'row', gap: 10}]}>
              <Image source={require('../../../assets/bt_facebook.png')} />
              <Text style={styles.h3}>Facebook</Text>
            </View>
            <Pressable
              style={({pressed}) => [
                {opacity: pressed ? 0.5 : 1},
                facebookAccountSignedIn ? styles.linked : styles.button,
              ]}>
              <Text
                style={
                  facebookAccountSignedIn
                    ? styles.textLinked
                    : styles.textButton
                }>
                {facebookAccountSignedIn ? 'Linked' : 'Link'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountSecurityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  lineHeader: {
    width: '100%',
    height: 0.6,
    backgroundColor: '#BBBBBB',
  },
  heading: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 18,
    marginTop: 18,
    marginBottom: 18,
  },
  circleContainer: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#F3FBEE',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 28,
  },
  innerHeading: {
    flexBasis: '67%',
    gap: 8,
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#078809',
  },
  p: {
    fontSize: 14,
    fontWeight: '600',
    color: '#737373',
    textAlign: 'justify',
  },
  iconHeading: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  contentContainer: {},
  innerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  wrapContent: {
    gap: 4,
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  button: {
    width: 60,
    height: 28,
    backgroundColor: '#FA7806',
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  linked: {
    width: 60,
    height: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  textLinked: {
    textAlign: 'center',
    color: '#FA7806',
    fontSize: 14,
    fontWeight: '600',
  },
  line: {
    width: '100%',
    marginStart: 12,
    height: 0.6,
    backgroundColor: '#E0E0E0',
  },
  passwordQuality: {
    fontSize: 14,
    color: '#1E1E1E',
    fontWeight: '600',
    width: 300,
  },
});
