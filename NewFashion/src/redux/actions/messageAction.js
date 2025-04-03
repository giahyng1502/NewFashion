import axios from "../../service/axios";

export const fetchMoreMessages = async (receiver, offset= 0) => {
    // Gửi yêu cầu lấy tin nhắn từ server
    const response = await axios(`/message/getMessages/${receiver}?offset=${offset}&limit=10`);
    return response.messages || [];
};
