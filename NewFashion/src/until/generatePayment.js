const generatePaymentCode = () => {
    const timestamp = Date.now().toString().slice(-7); // 5 số cuối timestamp
    const randomNum = Math.floor(1000 + Math.random() * 9000).toString(); // 4 số ngẫu nhiên
    return timestamp + randomNum; // Tổng cộng 10 số
};
module.exports = generatePaymentCode;