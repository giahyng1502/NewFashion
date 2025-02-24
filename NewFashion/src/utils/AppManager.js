import AsyncStorage from '@react-native-async-storage/async-storage';

class AppManager {
  static instance = null;

  constructor() {
    if (!AppManager.instance) {
      AppManager.instance = this;
    }
    return AppManager.instance;
  }

  // Hàm lưu userInfo vào AsyncStorage
  async saveUserInfo(userInfo) {
    try {
      const jsonValue = JSON.stringify(userInfo);
      await AsyncStorage.setItem('userInfo', jsonValue);
    } catch (error) {
      console.log('Error saving userInfo: ', error);
    }
  }

  // Hàm lấy userInfo từ AsyncStorage
  async getUserInfo() {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('Error getting userInfo: ', error);
    }
  }

  // Hàm check xem người dùng đã login chưa (kiểm tra userInfo)
  async isUserLoggedIn() {
    const userInfo = await this.getUserInfo();
    return userInfo != null;
  }

  // Hàm để xóa userInfo (logout)
  async logout() {
    try {
      await AsyncStorage.removeItem('userInfo');
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  }
}

const instance = new AppManager();
Object.freeze(instance);

export default instance;
