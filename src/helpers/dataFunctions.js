export const cleanUpData = function (object) {
    return Object.keys(object).map((id) => object[id]);
};
