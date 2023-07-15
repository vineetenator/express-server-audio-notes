// const Fs = require('fs');
const fs = require('fs/promises');

// let db = {};
const database = './public/db.txt';

const getKeyValueObject = (fileName, audioTile) => { return { [fileName]: audioTile }; }

async function readDbFile() {
  try {
    const data = await fs.readFile(database, { encoding: 'utf8' });
    console.log(data);
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
  return {};
}

// async function writeDbFile() {
//   try {
//     await fs.writeFile(database, db);
//   } catch (err) {
//     console.log(err);
//   }
// }

async function addToDatabase(fileName, audioTile) {
  const entrant = getKeyValueObject(fileName, audioTile);
  const data = await readDbFile();
  console.log('db', typeof data);
  const entries = JSON.stringify({...data, ...entrant})
  try {
    await fs.writeFile(database, entries);
  } catch (err) {
    console.log(err);
  }
}

module.exports.addToDatabase = addToDatabase;
module.exports.getKeyValueObject = getKeyValueObject;
module.exports.readDbFile = readDbFile;