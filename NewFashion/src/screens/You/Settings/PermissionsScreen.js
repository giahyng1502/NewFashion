import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BaseHeader from '../../../components/BaseHeader';

const PermissionsAllowed = ({title, description}) => {
  return (
    <View style={styles.permissionContainer}>
      <View style={styles.wrapTitle}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.boxStatus}>
          <Text style={styles.status}>Allowed</Text>
        </View>
      </View>
      <View>
        <Text style={styles.description}>{description}</Text>
        <Pressable
          style={({pressed}) => [
            {opacity: pressed ? 0.5 : 1},
            styles.btnGoToSetting,
          ]}>
          <Text style={styles.goToSetting}>go to settings</Text>
          <Image
            style={{
              tintColor: '#FA7806',
              position: 'absolute',
              left: 105,
              top: 2,
            }}
            source={require('../../../assets/icons/ic_arrowRight1.png')}
          />
        </Pressable>
      </View>
    </View>
  );
};

const DoNotAccess = ({icon, title, description}) => {
  const hasDescription = !!description;

  return (
    <View style={styles.border}>
      <View style={styles.inner}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Image source={icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Image source={require('../../../assets/icons/ic_do_not.png')} />
      </View>
      {hasDescription && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const PermissionsScreen = ({navigation}) => {
  const descriptions = [
    'You can allow access to your camera in order to take photos and videos for item reviews, image searches, and customer service feedback. If you want to turn off access to these device features, you can',
    'Enable notifications to get updates on your orders, learn about promotions, etc. You can view and edit notifications on the notifications page. If you want to turn off access to these device features, you can',
    "Live Activies are a type of real-time push notification. It's an IOS feature that provide real-time updates from the lock screen and the dynamic island. You can enable it to get order updates, view payment statuses, etc. All Live Activity features are enabled by default. If you want to turn off access to these device features, you can",
    'In most countries/regions, such as the US, the UK, etc., we do not request access to your location. We only request location access from users in Vietnam to make it easier for users to accurately fill in their shipping address.',
    "We do not access your photos. You can still use the IOS system's built-in image picker when leaving a review, searching for items, etc., without New Fashion accessing your photos.",
    'In addition to the above device features, we will not request access to any other device features, such as your calendar, reminders, etc.',
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
        }}>
        <BaseHeader
          title="Permissions"
          showLeftButton={true}
          onLeftButtonPress={() => navigation.goBack()}
        />
        <View style={styles.lineHeader} />
      </View>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.circleContainer, {marginTop: 76}]}>
            <Image
              style={styles.iconHeading}
              source={require('../../../assets/icons/ic_shieldKey.png')}
            />
          </View>
          <Text style={styles.h1}>
            Access certain device features with your permission
          </Text>
          <View style={styles.line} />
          <PermissionsAllowed title="Camera" description={descriptions[0]} />
          <View style={styles.line} />
          <PermissionsAllowed
            title="Notifications"
            description={descriptions[1]}
          />
          <View style={styles.line} />
          <PermissionsAllowed
            title="Live Activities"
            description={descriptions[2]}
          />
          <View style={styles.separator} />
          <View style={styles.circleContainer}>
            <Image source={require('../../../assets/icons/ic_lockGreen.png')} />
          </View>
          <Text style={[styles.h1, {fontSize: 17.5}]}>
            We DO NOT access the following device features
          </Text>
          <DoNotAccess
            icon={require('../../../assets/icons/ic_microphone.png')}
            title="Microphone"
          />
          <DoNotAccess
            icon={require('../../../assets/icons/ic_contact.png')}
            title="Contacts"
          />
          <DoNotAccess
            icon={require('../../../assets/icons/ic_bluetooth.png')}
            title="Bluetooth"
          />
          <DoNotAccess
            icon={require('../../../assets/icons/ic_clipboard.png')}
            title="Clipboard"
          />
          <DoNotAccess
            icon={require('../../../assets/icons/ic_location_regular.png')}
            title="Location"
            description={descriptions[3]}
          />
          <DoNotAccess
            icon={require('../../../assets/icons/ic_photo.png')}
            title="Photos"
            description={descriptions[4]}
          />
          <DoNotAccess
            icon={require('../../../assets/icons/ic_dots.png')}
            title="Others"
            description={descriptions[5]}
          />
          <Text
            style={[
              styles.description,
              {marginHorizontal: 14, marginBottom: 30},
            ]}>
            New Fashion believes in being transparent and requesting a minimal
            amount of permissions. You can also learn more about how we operate
            to protect our user's privacy in the{' '}
            <Text style={{textDecorationLine: 'underline', color: '#1E1E1E'}}>
              Privacy policy
            </Text>
            , which includes details about how we handle information that does
            not involve requesting permissions or personal privacy.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  lineHeader: {
    width: '100%',
    height: 0.8,
    backgroundColor: '#BBBBBB',
  },
  line: {
    width: '93%',
    height: 0.8,
    backgroundColor: '#BBBBBB',
    alignSelf: 'center',
  },
  circleContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#F3FBEE',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 14,
  },
  iconHeading: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
  h1: {
    fontSize: 18,
    fontWeight: '700',
    color: '#078809',
    marginTop: 6,
    marginBottom: 14,
    textAlign: 'center',
  },
  permissionContainer: {
    padding: 14,
    gap: 6,
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxStatus: {
    backgroundColor: '#FA7806',
    borderRadius: 3,
    paddingHorizontal: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  status: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#737373',
    textAlign: 'justify',
    lineHeight: 22,
    marginTop: 2,
  },
  goToSetting: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FA7806',
  },
  btnGoToSetting: {
    width: 120,
    flexDirection: 'row',
  },
  separator: {
    height: 10,
    backgroundColor: '#F4F4F4',
  },
  border: {
    borderWidth: 0.8,
    borderColor: '#EFEFEF',
    borderRadius: 6,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    padding: 14,
    marginHorizontal: 14,
    marginBottom: 14,
  },
  inner: {
    width: '99.9%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
