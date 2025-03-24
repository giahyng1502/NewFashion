class SupportFunctions {
    static convertPrice = (price) => {
        const roundedPrice = Math.round(price);
        return roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    }
}

export default SupportFunctions

