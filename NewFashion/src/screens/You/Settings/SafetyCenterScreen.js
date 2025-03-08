import {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Box = ({icon, title}) => {
  return (
    <Pressable style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
      <View style={styles.boxContainer}>
        <Image
          source={icon}
          style={{width: 36, height: 36, resizeMode: 'contain'}}
        />
        <Text style={styles.pBox}>{title}</Text>
      </View>
    </Pressable>
  );
};

const SafetyCenterScreen = ({navigation}) => {
  const [showTitleScreen, setShowTitleScreen] = useState(false);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 0) {
      setShowTitleScreen(true);
    } else {
      setShowTitleScreen(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={{height: 56}}
        colors={
          showTitleScreen ? ['#068909', '#068909'] : ['#0E600C', '#208819']
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
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
            {showTitleScreen && (
              <View style={styles.nav}>
                <Image
                  style={styles.iconNav}
                  source={require('../../../assets/icons/ic_shieldCheck.png')}
                />
                <Text style={styles.titleNav}>Safety center</Text>
              </View>
            )}
          </Pressable>
        </View>
      </LinearGradient>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <LinearGradient
            style={{height: 135}}
            colors={['#0E600C', '#208819']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <View style={styles.header}>
              <View style={styles.innerHeader}>
                <Text style={styles.heading}>Safety center</Text>
                <Text style={styles.pHeader}>
                  New Fashion is committed to creating a safe shopping
                  environment. Learn about our efforts to enhance New Fashion's
                  security for you.
                </Text>
              </View>
              <Image
                style={styles.imageBg}
                source={require('../../../assets/image/hint.png')}
              />
            </View>
          </LinearGradient>
          <View style={styles.wrapGrid}>
            <Text style={styles.h1}>Protect your information</Text>
            <View style={styles.grid}>
              <Box
                icon={require('../../../assets/icons/ic_lockGreen.png')}
                title="Protect your  data"
              />
              <Box
                icon={require('../../../assets/icons/ic_user_shield.png')}
                title="Protect your account"
              />
              <Box
                icon={require('../../../assets/icons/ic_cart_shield.png')}
                title="Protect your payment"
              />
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.wrapGrid}>
            <Text style={styles.h1}>Stay safe from scammers</Text>
            <View style={styles.grid}>
              <Box
                icon={require('../../../assets/icons/ic_hook_warning.png')}
                title="Recognize scams"
              />
              <Box
                icon={require('../../../assets/icons/ic_email_hook.png')}
                title="Recognize scam emails"
              />
              <Box
                icon={require('../../../assets/icons/ic_chat_hook.png')}
                title="Recognize scam messages"
              />
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.wrapGrid}>
            <Text style={styles.h1}>Report something suspicious</Text>
            <Pressable style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
              <View style={styles.border}>
                <Text style={styles.p}>
                  Report a suspicious phone call, email or SMS/text message
                </Text>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/icons/ic_arrowRight.png')}
                />
              </View>
            </Pressable>
            <Pressable style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
              <View style={styles.border}>
                <Text style={styles.p}>
                  Report a fake website or app similar to New Fashion
                </Text>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/icons/ic_arrowRight.png')}
                />
              </View>
            </Pressable>
            <Pressable style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
              <View style={styles.border}>
                <Text style={styles.p}>
                  Report fake promotions, gift card fraud, fake job
                  opportunities, etc
                </Text>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/icons/ic_arrowRight.png')}
                />
              </View>
            </Pressable>
          </View>
          <View style={[styles.separator, {marginTop: 6}]} />
          <View style={styles.footer}>
            <Text style={styles.h1}>Safety partners</Text>
            <Text
              style={[
                styles.p,
                {
                  width: '100%',
                  paddingHorizontal: 10,
                  textAlign: 'justify',
                  paddingVertical: 6,
                },
              ]}>
              New Fashion is an e-commerce company for global users, we not only{' '}
              <Text style={{color: '#078809'}}>
                support multiple payment methods
              </Text>
              , but also have{' '}
              <Text style={{color: '#078809'}}>
                obtained multiple security certifications
              </Text>{' '}
              to ensure your information stays safe.
            </Text>
            <View style={styles.logos}>
              <Image source={require('../../../assets/icons/logo_momo.png')} />
              <Image
                source={require('../../../assets/icons/logo_zalopay.png')}
              />
              <Image
                source={require('../../../assets/icons/logo_paypal.png')}
              />
              <Image
                source={require('../../../assets/icons/logo_mastercard.png')}
              />
              <Image source={require('../../../assets/icons/logo_jcb.png')} />
              <Image source={require('../../../assets/icons/logo_visa.png')} />
            </View>
            <View style={styles.logos}>
              <Image source={require('../../../assets/icons/logo_js.png')} />
              <Image source={require('../../../assets/icons/logo_react.png')} />
              <Image source={require('../../../assets/icons/logo_mongo.png')} />
              <Image source={require('../../../assets/icons/logo_figma.png')} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SafetyCenterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapHeader: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  iconBack: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
    resizeMode: 'contain',
  },
  imageBg: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    position: 'absolute',
    right: -20,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 18,
  },
  innerHeader: {
    flexBasis: '74%',
    paddingStart: 25,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF',
  },
  pHeader: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  boxContainer: {
    width: 127,
    height: 120,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: '#E6E6E6',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  pBox: {
    width: 120,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  wrapGrid: {
    gap: 12,
    paddingVertical: 10,
  },
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    paddingStart: 10,
  },
  separator: {
    height: 10,
    backgroundColor: '#F4F4F4',
  },
  border: {
    width: '96%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 0.8,
    borderColor: '#E6E6E6',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  p: {
    width: 320,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#1E1E1E',
  },
  footer: {
    paddingVertical: 10,
    marginBottom: 30,
  },
  logos: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 10,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 104,
    gap: 6,
  },
  iconNav: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  titleNav: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});
