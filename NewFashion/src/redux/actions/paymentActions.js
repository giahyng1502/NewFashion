import axios from '../../service/axios';

export const createPayment = (
  async ({priceProduct,rawOrderId,idOrder}) => {
    try {
      const response = await axios.post('/momo/payment', {priceProduct,rawOrderId,idOrder});
      return response;
    } catch (error) {
      console.log(error);      
    }
  }
)