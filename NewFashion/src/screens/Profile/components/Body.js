import {Image, Pressable, Text, View} from 'react-native';
import Hr from './Hr';
import styles from '../styles';

export default function Body({user, onHandleOpenSheet}) {
  function Content({title, textValue, isImageValue, type}) {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={({pressed}) => ({opacity: pressed ? 0.8 : 1})}
          onPress={() => onHandleOpenSheet(type)}>
          <View style={styles.contentWrapper}>
            {isImageValue ? (
              <Image
                style={{width: 50, height: 50, borderRadius: 50}}
                source={{uri: user ? user.avatar : null}}
              />
            ) : (
              <Text style={styles.textValue}>{textValue}</Text>
            )}
            <Image
              source={require(`../../../assets/icons/ic_arrow_right.png`)}
            />
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.bodyContainer}>
      <Content title="Ảnh đại diện" isImageValue={true} type="avatar" />
      <Hr height={1} backgroundColor="#EEEEEE" marginStart={14} />
      <Content
        title="Tên người dùng"
        textValue={user?.name || 'đang cập nhật...'}
        type="name"
      />
    </View>
  );
}
