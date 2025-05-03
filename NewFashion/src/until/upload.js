import axios from "../service/axios";

export const uploadImageForImageCrop = async (image,type = "SEARCH_IMAGES") => {
    const formData = new FormData();

    if (type === "SEARCH_IMAGES") {
        formData.append('files', {
            name: image.filename || `photo.jpg`,
            type: image.mime,
            uri: image.path,
        });
    }
    if (type === "AVATAR") {
        formData.append('files', {
            uri: image,
            type: 'image/jpeg', // hoặc image/png
            name: `avatar_${Date.now().toString().slice(-4)}.jpg`,
        });
    }
    console.log(formData);
    try {
        const response = await axios.post('upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Upload success:', response.data);
        return response.url
    } catch (error) {
        console.error('Upload failed:', error);
    }
};
