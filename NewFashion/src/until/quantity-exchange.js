
const convert = (number) => {
    if (number < 1000) {
        return number.toString();
    }
    number = Math.floor(number / 1000)
    return `${number}K`;
}

export default convert;