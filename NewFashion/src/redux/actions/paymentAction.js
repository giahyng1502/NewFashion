import axios from "../../service/axios";

export const createPayment = async (data) => {
    console.log('data',data);
    return await axios.post('/momo/payment', data)
}