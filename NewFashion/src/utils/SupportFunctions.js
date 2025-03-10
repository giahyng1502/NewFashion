class SupportFunctions {
    static convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    }
}

export default SupportFunctions

