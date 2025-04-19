import axios from "../service/axios";

export const uploadImageForImageCrop = async (image) => {
    const formData = new FormData();

    formData.append('files', {
        name: image.filename || `photo.jpg`,
        type: image.mime,
        uri: image.path,
    });
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
