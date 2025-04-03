
// Hàm upload ảnh lên server
import axios from "../service/axios";

export const uploadImage = async (files, onProgress) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append("files", {
            uri: file.uri,
            name: file.fileName || `photo_${Date.now()}.jpg`,
            type: file.type || "image/jpeg"
        });
    });

    try {
        const response = await axios.post("upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        return response.url; // Giả sử API trả về danh sách URL ảnh ở response.data.url
    } catch (error) {
        console.error("Lỗi upload ảnh:", error);
        return [];
    }
};


