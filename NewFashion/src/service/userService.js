import axios from './axios';

export const login = async ({ email, password }) => {
        return await axios.post('/users/login', { email, password });
};
