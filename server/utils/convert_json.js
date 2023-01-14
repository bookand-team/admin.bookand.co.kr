let dataToConvert;

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'report.json');
fs.writeFileSync(filePath, JSON.stringify(dataToConvert, null, 2));