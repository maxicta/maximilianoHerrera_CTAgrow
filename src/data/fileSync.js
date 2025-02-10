const path = require('path');
const fs = require('fs');

const readFile = (file = "") => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf-8'));
}

const writeFile = (file = "", data = []) => {
    return fs.writeFileSync(path.join(__dirname, file), JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
    readFile,
    writeFile
}