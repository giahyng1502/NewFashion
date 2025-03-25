export const ConvertMoney = (number) => {
    if (number < 1000) {
        return number.toString();
    }
    number = Math.floor(number / 1000)
    return `${number}K`;
}