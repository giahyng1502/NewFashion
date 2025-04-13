const generatePaymentCode = () => {
    const code = `${Date.now().toString().slice(-6)}${Math.floor(1000 + Math.random() * 9000)}`;
    return `momo_${code}`;
};

module.exports = generatePaymentCode;
