import { read, utils } from 'xlsx';

/**
 *
 * @param attachmentContent parsedEmail.attachments[0].content from simpleParser
 * @param headerRow which row the headers are labeled (0-based index)
 * @param sheetNum optional, states which sheet should be read (0-based index)
 */
function readXls (attachmentContent: Buffer, headerRow: number, sheetNum = 0): Array<any> {
  const file = read(attachmentContent);
  const data = utils.sheet_to_json(file.Sheets[file.SheetNames[sheetNum]], {
    raw: false,
    blankrows: false,
    range: headerRow
  });
  return data;
}

export default readXls;
