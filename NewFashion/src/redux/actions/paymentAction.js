import axios from "../../service/axios";

export const createPayment = async (data) => {
    return await axios.post('/momo/payment', data)
}