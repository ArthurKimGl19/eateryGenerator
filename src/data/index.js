const createFile = require('./convertCsvToJson');
const path = require('path');

const eateryData = path.resolve(__dirname, './data-eatery.csv');
const favoriteData = path.resolve(__dirname, './favorite-eatery.csv');

createFile('data-eatery', eateryData);
createFile('favorite-eatery', favoriteData);
