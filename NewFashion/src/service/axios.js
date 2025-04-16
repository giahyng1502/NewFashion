import axios from "axios";
import AppManager from "../utils/AppManager";
// baseURL: "http://160.191.245.3:3000",
// baseURL: "https://ce7f-58-186-78-252.ngrok-free.app",
// https://3737-42-114-151-175.ngrok-free.app
// https://backend-newfashion-328609313507.asia-southeast1.run.app
export const baseUrl = 'https://backend-newfashion-328609313507.asia-southeast1.run.app'

const api = axios.create({
    baseURL: baseUrl,
    timeout: 50000,
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
