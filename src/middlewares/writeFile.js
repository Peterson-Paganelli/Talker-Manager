const fs = require('fs/promises');

async function writeFile(data) {
  try {
    await fs.writeFile('./src/talker.json', JSON.stringify(data));
  } catch (error) {
    console.error(`Erro ao ler: ${data}`);
  }
}

module.exports = writeFile;