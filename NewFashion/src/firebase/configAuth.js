import {GoogleSignin} from "@react-native-google-signin/google-signin";

export const configureGoogleSignIn = () => {
    GoogleSignin.configure({
        webClientId: "992734735800-k5foef7j2vkd0l9segpogtc99siinq8g.apps.googleusercontent.com", // Thay thế bằng Web Client ID từ Firebase
        offlineAccess: true,
    });
};
