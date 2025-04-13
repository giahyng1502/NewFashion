import {View} from 'react-native';

export default function Hr({height, backgroundColor, marginStart}) {
  return (
    <View
      style={{
        height: height,
        backgroundColor: backgroundColor,
        marginStart: marginStart,
      }}
    />
  );
}
