import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import BaseHeader from '../../../components/BaseHeader';

const options = [
  {
    id: '1',
    title: 'English',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
  },
  {
    id: '2',
    title: 'Tiếng Việt',
    icon: require('../../../assets/icons/ic_arrowRight.png'),
  },
];

const Options = ({item, index, onPress}) => (
  <Pressable
    style={({pressed}) => getStyle(index, pressed)}
    onPress={() => {
      onPress(item);
    }}>
    <Text style={styles.optionTitle}>{item.title}</Text>
    <Image source={item.icon} style={styles.icon} />
  </Pressable>
);

const LanguageScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BaseHeader
        title="Language"
        showLeftButton={true}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <View style={styles.line} />
      <FlatList
        data={options}
        renderItem={({item, index}) => (
          <Options item={item} index={index} onPress={() => {}} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default LanguageScreen;

const getStyle = (index, pressed) => [
  styles.settingOptions,
  styles.withMargin,
  index === options.length - 1 && styles.lastItem,
  {opacity: pressed ? 0.5 : 1},
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  line: {
    width: '100%',
    height: 0.8,
    backgroundColor: '#BBBBBB',
  },
  settingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderColor: '#BBBBBB',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  withMargin: {
    marginLeft: 20,
    paddingLeft: 0,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  icon: {
    width: 10,
    height: 20,
  },
});
