import axios from "../../service/axios";

export const getCommentsByPostId = async (postId, page = 1, limit = 10) => {
    try {
        const res = await axios.get(`/comment/${postId}?page=${page}&limit=${limit}`);
        return res; // Trả về dữ liệu JSON từ API
    } catch (error) {
        console.log("Lỗi khi lấy bình luận:", error);
        return { comments: [], totalPages: 1, currentPage: 1 }; // Tránh lỗi khi API thất bại
    }
};
