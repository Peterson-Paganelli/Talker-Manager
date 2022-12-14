const fs = require('fs/promises');

async function readFile() {
    try {
      const file = await fs.readFile('./src/talker.json', 'utf-8');
      const data = JSON.parse(file);
      return data;
    } catch (error) {
      console.error(`Erro ao ler o arquivo: ${error.message}`);
    }
  }

module.exports = readFile;