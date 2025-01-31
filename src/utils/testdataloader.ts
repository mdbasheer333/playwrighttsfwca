import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import XLSX from 'xlsx';


export async function createJsonObjectFromFolder(folderPath) {
    const jsonObject = {};

    // Read all files in the folder
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
        const fullPath = path.join(folderPath, file);

        // Check if the file is a JSON file
        if (path.extname(file) === '.json') {
            const fileNameWithoutExt = path.basename(file, '.json');

            // Read and parse the JSON file
            const fileData = fs.readFileSync(fullPath, 'utf-8');
            jsonObject[fileNameWithoutExt] = JSON.parse(fileData);
        }
    }

    return jsonObject;
}

export async function createCsvDataFromFolder(folderPath) {
    const csvData = {};
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const ext = path.extname(file);
        if (ext === '.csv') {
            const filePath = path.join(folderPath, file);
            const data = await parseCsv(filePath);
            const fileName = path.basename(file, ext);
            csvData[fileName] = data;
        }
    }
    return csvData;
}

function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

export async function createExcelDataFromFolder(folderPath) {
    const excelData = {};
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const ext = path.extname(file);
        if (ext === '.xlsx' || ext === '.xls') {
            const filePath = path.join(folderPath, file);
            const fileName = path.basename(file, ext);
            const data = parseExcel(filePath);
            excelData[fileName] = data;
        }
    }
    return excelData;
}

function parseExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    const sheetsData = {};

    sheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        sheetsData[sheetName] = XLSX.utils.sheet_to_json(sheet);
    });

    return sheetsData;
}
