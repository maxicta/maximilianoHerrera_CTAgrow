const path = require('path');
const fs = require('fs');

function readFile(filePath) {
    // Asegurarnos de que la ruta sea absoluta y normalizada
    const absolutePath = path.resolve(__dirname, filePath);
    
    
    try {
        const data = fs.readFileSync(absolutePath, 'utf8');
        return data;
    } catch (error) {
        console.error('Error al leer el archivo:', error.message);
        throw error;
    }
}

function writeFile(filePath, data) {
    // Validar que filePath no sea vacío
    if (!filePath) {
        throw new Error('El path del archivo es requerido');
    }
    
    // Usar __dirname para mantener consistencia con readFile
    const absolutePath = path.resolve(__dirname, filePath);
    console.log('Escribiendo archivo en:', absolutePath);
    
    try {
        return fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error al escribir el archivo:', error.message);
        throw error;
    }
}

module.exports = {
    readFile,
    writeFile
};