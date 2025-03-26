import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {baseUrl} from "../service/axios";

const SocketContext = createContext();

export const SocketProvider = ({ children, userId }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (userId) {
            const newSocket = io(baseUrl, {
                transports: ["websocket"],
                auth: { userId: userId }
            });

            setSocket(newSocket);
            return () => newSocket.disconnect(); // Ngắt kết nối khi đăng xuất
        }
    }, [userId]); // Chỉ chạy khi userId thay đổi

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
