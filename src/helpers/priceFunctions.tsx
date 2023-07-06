export const calculatePrice = function (number: number): string {
    let result = '';
    for (let i = 0; i < number; i++) {
        result += '$';
    }
    return result;
};
