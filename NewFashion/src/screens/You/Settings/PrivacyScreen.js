import {Pressable, StyleSheet, Text, View} from 'react-native';
import BaseHeader from '../../../components/BaseHeader';

const PressableText = ({children, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          opacity: pressed ? 0.5 : 1,
          paddingHorizontal: 3,
        },
      ]}
      onPress={onPress}>
      <Text style={styles.p}>{children}</Text>
    </Pressable>
  );
};

const PrivacyScreen = ({navigation}) => {
  const handleNavigation = label => navigation.navigate(label);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BaseHeader
          title="Privacy"
          showLeftButton={true}
          onLeftButtonPress={() => navigation.goBack()}
        />
        <View style={styles.lineHeader} />
        <View style={styles.wrapHeader}>
          <Text style={styles.h1}>Required cookies & technologies</Text>
          <Text style={styles.h2}>Always on</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.paraphrase}>
          For details on how we use your data, see our{' '}
          <PressableText onPress={() => handleNavigation('PrivacyPolicy')}>
            Privacy Policy
          </PressableText>
          and{' '}
          <PressableText>Cookie and Similar Technologies Policy</PressableText>.
        </Text>
      </View>
    </View>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  wrapper: {
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
    marginStart: 14,
  },
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  h2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#737373',
  },
  paraphrase: {
    textAlign: 'justify',
    padding: 14,
    fontWeight: 'bold',
    color: '#B7B7B7',
  },
  p: {
    color: '#737373',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
    position: 'relative',
    top: 3,
  },
});
