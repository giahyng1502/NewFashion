import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export const signInWithGoogle = async () => {
    try {
        // Mở màn hình đăng nhập Google
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();

        // Tạo credential từ token Google
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Đăng nhập với Firebase
        const userCredential = await auth().signInWithCredential(googleCredential);
        console.log("Đăng nhập thành công:", userCredential.user);
    } catch (error) {
        console.log("Lỗi đăng nhập Google:", error);
    }
};
