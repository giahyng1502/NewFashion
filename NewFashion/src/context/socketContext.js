import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {baseUrl} from "../service/axios";
import {useDispatch} from "react-redux";
import {setNotification} from "../redux/reducer/notificationReducer";

const SocketContext = createContext();

export const SocketProvider = ({ children, userId,setNotification }) => {
    const [socket, setSocket] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        if (userId) {
            const newSocket = io(baseUrl, {
                transports: ["websocket"],
                auth: { userId: userId }
            });
            console.log(newSocket);
            setSocket(newSocket);
            return () => newSocket.disconnect(); // Ngắt kết nối khi đăng xuất
        }
    }, [userId]); // Chỉ chạy khi userId thay đổi
    useEffect(() => {
        // Kiểm tra nếu socket đã được khởi tạo trước khi lắng nghe sự kiện
        if (socket) {
            socket.on('orderStatusUpdate', (notification) => {
                console.log("Nhận thông báo từ server: ", notification);
                setNotification(notification)
                dispatch(setNotification(notification));
            });

            // Cleanup khi component unmount
            return () => {
                socket.off('orderStatusUpdate');
            };
        }
    }, [socket]); // Lắng nghe sự thay đổi của socket
    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
