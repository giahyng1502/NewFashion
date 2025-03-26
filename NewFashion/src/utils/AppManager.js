import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";

class AppManager {
  constructor() {
      if (!AppManager.instance) {
          this.currentUser = null
          AppManager.instance = this;
      }
      return AppManager.instance;
  }

  static shared = new AppManager();

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
        const userInfoFromToken = jwtDecode(token);
        this.userInfo = userInfoFromToken;
        console.log('userInfo:', this.userInfo);
        
      } else {
        this.userInfo = null;
      }
    } catch (error) {
      console.log('loadUserInfo error: ', error);
    }
  }

  async removeUserInfo() {
    try {
      await AsyncStorage.removeItem('token');
      this.userInfo = null;
    } catch (error) {
      console.log('removeUserInfo error: ', error);
    }
  }

  isUserLoggedIn() {    
    return this.userInfo !== null;
  }
  
}

export default AppManager;
