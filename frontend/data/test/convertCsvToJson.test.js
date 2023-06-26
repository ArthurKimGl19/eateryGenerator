const fs = require('fs');

const createFile = require('../convertCsvToJson');

jest.mock('fs');

describe('Test convertCsvToJson function', () => {
    test('Check to see if function was called with relevant data', () => {
        const mockRow = {
            name: 'example eatery 1',
            type: 'example type 1',
            rating: 1,
            price: 1,
            address: 'example address 1',
            zipCode: 90001,
            note: 'example note 1',
            coordinates: '1.00, -1.00'
        };
        const jsonData = [
            {
                name: mockRow.name,
                type: mockRow.type,
                rating: parseInt(mockRow.rating),
                price: Number(mockRow.price),
                address: mockRow.address,
                zipCode: Number(mockRow.zipCode),
                note: mockRow.note,
                latitude: 1.0,
                longitude: -1.0
            }
        ];
        const mReadStream = {
            pipe: jest.fn().mockReturnThis(),
            on: jest.fn().mockImplementation(function (event, handler) {
                if (event === 'data') {
                    handler(mockRow);
                }
                if (event === 'end') {
                    handler();
                }
                return this;
            })
        };
        jest.spyOn(console, 'log').mockImplementation();
        fs.createReadStream.mockReturnValueOnce(mReadStream);
        const fileName = 'test-file-name';
        createFile(fileName);
        expect(fs.createReadStream).toBeCalledTimes(1);
        expect(mReadStream.pipe).toBeCalledTimes(1);
        expect(mReadStream.on).toBeCalledWith('data', expect.any(Function));
        expect(mReadStream.on).toBeCalledWith('end', expect.any(Function));
        // Check that fs.writeFileSync was called with the expected arguments
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            `./src/data/${fileName}.json`,
            JSON.stringify(jsonData, null, 2)
        );
    });
});
