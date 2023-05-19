const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const csvFilePath = path.join(__dirname, 'data-eatery.csv');
const jsonData = [];

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
        const [latitude, longitude] = row.coordinates
            .split(',')
            .map((coord) => parseFloat(coord.trim()));
        const jsonRow = {
            name: row.name,
            type: row.type,
            rating: parseInt(row.rating),
            dollarSign: Number(row.dollarSign),
            address: row.address,
            zipCode: Number(row.zipCode),
            note: row.note,
            latitude,
            longitude
        };
        jsonData.push(jsonRow);
    })
    .on('end', () => {
        const jsonFilePath = './src/data/data-eatery.json'; // Replace with the desired path for the output JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
        console.log('CSV to JSON conversion completed successfully!');
    });
