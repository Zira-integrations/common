import csv from 'fast-csv';
const { Readable } = require('stream');

/**
 *
 * @param csvBuffer parsedEmail.attachments[0].content from simpleParser
 * @param options optional, csv.parseStream options object
 * @param rowProcessor optional, callback function to manipulate each row
 * @returns Promise<string[]>
 */
function readCsv (
  csvBuffer: Buffer,
  options: csv.ParserOptionsArgs = { headers: true },
  rowProcessor = (row: string) => row
) {
  return new Promise((resolve, reject) => {
    const stream = Readable.from(csvBuffer);

    const data: string[] = [];

    csv
      .parseStream(stream, options)
      .on('error', reject)
      .on('data', (row: string) => {
        const obj = rowProcessor(row);
        if (obj) data.push(obj);
      })
      .on('end', () => {
        resolve(data);
      });
  });
}

export default readCsv;
