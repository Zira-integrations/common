import xlsx from 'node-xlsx';

function readXls(buffer: any) {
    return xlsx.parse(buffer)
}

export default readXls
