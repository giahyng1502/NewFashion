// tạo class singleton để lưu trữ thông tin về kích th
import {Dimensions} from 'react-native';

class ScreenSize {
  static width = Dimensions.get('window').width;
  static height = Dimensions.get('window').height;
}

export default ScreenSize;
