const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const eateryData = path.join(__dirname, 'data-eatery.csv');
const favoriteData = path.join(__dirname, 'favorite-eatery.csv');

const createFile =  (fileName, data) => {
  const jsonData = [];

  fs.createReadStream(data)
    .pipe(csv())
    .on('data', (row) => {
      const [latitude, longitude] = row.coordinates
        .split(',')
        .map((coord) => parseFloat(coord.trim()));
      const jsonRow = {
        name: row.name,
        type: row.type,
        rating: parseInt(row.rating),
        price: Number(row.price),
        address: row.address,
        zipCode: Number(row.zipCode),
        note: row.note,
        latitude,
        longitude
      };
      jsonData.push(jsonRow);
    })
    .on('end', () => {
      const jsonFilePath = `./src/data/${fileName}.json`; // Replace with the desired path for the output JSON file
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
      console.log(`${fileName} CSV to JSON conversion completed successfully!`);
    });
}

createFile('data-eatery', eateryData);
createFile('favorite-eatery', favoriteData);