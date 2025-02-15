import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children, userId }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (userId) {
            console.log(userId)

            const newSocket = io("http://10.0.2.2:3000", {
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
