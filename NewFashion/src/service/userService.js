import axios from './axios';

export const login = async ({ email, password }) => {
        return await axios.post('/users/login', { email, password });
};
export const loginWithGoogle = async (user) => {
        return await axios.post('/users/loginWithGoogle', {
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                picture: user.photoURL,
        });
};
