import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "http://160.30.21.59:3000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Thêm Interceptor
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("Lỗi API:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || "Lỗi server!");
    }
);

export default api;
