import AsyncStorage from '@react-native-async-storage/async-storage';

class AppManager {
  static instance = null;
  userInfo = null;

  constructor() {
    if (!AppManager.instance) {
      AppManager.instance = this;
    }
    return AppManager.instance;
  }

  //hàm save userInfor vào storage 
  async saveUserInfo(userInfo) {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.userInfo = userInfo;
    } catch (error) {
      console.log('saveUserInfo error: ', error);
    }
  }

  //hàm get userInfo từ storage
  async getUserInfo() {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      this.userInfo = JSON.parse(userInfo);
      return this.userInfo;
    } catch (error) {
      console.log('getUserInfo error: ', error);
    }
  }

  //hàm remove userInfo khỏi storage
  async removeUserInfo() {
    try {
      await AsyncStorage.removeItem('userInfo');
      this.userInfo = null;
    } catch (error) {
      console.log('removeUserInfo error: ', error);
    }
  }

  //hàm check xem user đã login chưa
  isUserLoggedIn() {
    return this.userInfo !== null;
  }
  
}

const instance = new AppManager();
Object.freeze(instance);

export default instance;
