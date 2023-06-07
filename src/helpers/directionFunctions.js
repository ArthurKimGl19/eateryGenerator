export const showDirections = function (lat, long) {
    window.open(`https://maps.google.com?q=${lat},${long}`);
};
