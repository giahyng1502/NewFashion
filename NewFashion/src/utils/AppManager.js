import { AsyncStorage } from 'react-native';

export default class AppManager {

    static instance = null;

    static shared() {
        if (AppManager.instance == null) {
            AppManager.instance = new AppManager();
        }

        return this.instance;
    }

    constructor() {
        this._isLogin = false;
        this._userInfo = null;
    }

    async setUserInfo(userInfo) {
        this._userInfo = userInfo;
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    async getUserInfo() {
        if (this._userInfo == null) {
            this._userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
        }

        return this._userInfo;
    }

    async isLogin() {
        if (this._isLogin == false) {
            this._isLogin = await AsyncStorage.getItem('isLogin');
        }

        return this._isLogin;
    }

    async login() {
        this._isLogin = true;
        await AsyncStorage.setItem('isLogin', 'true');
    }

    async logout() {
        this._isLogin = false;
        this._userInfo = null;
        await AsyncStorage.removeItem('isLogin');
        await AsyncStorage.removeItem('userInfo');
    }
} 