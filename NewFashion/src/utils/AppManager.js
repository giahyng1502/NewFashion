import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";

class AppManager {
  static instance = null;
  userInfo = null;

  constructor() {
    if (!AppManager.instance) {
      AppManager.instance = this;
    }
    return AppManager.instance;
  }

  async getToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('getToken error: ', error);
    }
  }
  
  async saveUserInfo(token) {
    try {
      await AsyncStorage.setItem('token', token)
      const userInfo = jwtDecode(token);
      this.userInfo = userInfo;
    } catch (error) {
      console.log('saveUserInfo error: ', error);
    }
  }

  getUserInfo() {
    return this.userInfo;
  }

  async loadUserInfo() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const userInfo = jwtDecode(token);
        this.userInfo = userInfo;
      } else {
        this.userInfo = null;
      }
    } catch (error) {
      console.log('loadUserInfo error: ', error);
    }
  }

  async removeUserInfo() {
    try {
      await AsyncStorage.removeItem('userInfo');
      this.userInfo = null;
    } catch (error) {
      console.log('removeUserInfo error: ', error);
    }
  }

  isUserLoggedIn() {
    return this.userInfo !== null;
  }
  
}

const instance = new AppManager();
Object.freeze(instance);

export default instance;
