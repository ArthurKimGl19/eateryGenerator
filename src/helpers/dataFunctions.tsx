export const cleanUpData = function (object: object): object {
    console.log('object ', object);
    return Object.keys(object).map((id) => object[id]);
};
