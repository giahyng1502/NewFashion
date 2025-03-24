import axios from "axios";
import AppManager from "../utils/AppManager";
// baseURL: "http://160.30.21.59:3000",
// baseURL: "https://b79c-42-119-222-88.ngrok-free.app",
// https://3737-42-114-151-175.ngrok-free.app
export const baseUrl = 'https://d0b6-42-114-151-175.ngrok-free.app'
const api = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Thêm Interceptor
api.interceptors.request.use(
    async (config) => {
        const token = await AppManager.shared.getToken();
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
