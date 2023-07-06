const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const createFile = function (
    fileName = 'data-eatery',
    data = path.resolve(__dirname, './data-eatery.csv')
) {
    const jsonData = [];

    fs.createReadStream(data)
        .pipe(csv())
        .on('data', async (row) => {
            const [latitude, longitude] = row.coordinates
                .split(',')
                .map((coordinates) => parseFloat(coordinates.trim()));
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
};

module.exports = createFile;
