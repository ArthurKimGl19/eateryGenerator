export const showDirections = function (lat: number, long: number): void {
    window.open(`https://maps.google.com?q=${lat},${long}`);
};
