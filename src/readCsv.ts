import csv from 'fast-csv';
const { Readable } = require('stream');



function readCsv(csvBuffer: any, rowProcessor = (row: string) => row) {
    return new Promise((resolve, reject) => {
        const stream = Readable.from(csvBuffer);

        const data: string[] = [];

        csv.parseStream(stream)
            .on("error", reject)
            .on("data", (row: string) => {
                const obj = rowProcessor(row);
                if (obj) data.push(obj);
            })
            .on("end", () => {
                resolve(data);
            });
    });
}

export default readCsv