// const Fs = require('fs');
const fs = require('fs/promises');

// let db = {};
const database = './public/db.txt';

const getKeyValueObject = (fileName, audioTitle, text) => {
  const url = `http://localhost:3001/audio/${fileName}.mp3`
  return { fileName, audioTitle, url, text };
}

async function readDbFile() {
  try {
    const data = await fs.readFile(database, { encoding: 'utf8' });
    console.log('data => ',data);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.log(err);
  }
  return [];
}

// async function writeDbFile() {
//   try {
//     await fs.writeFile(database, db);
//   } catch (err) {
//     console.log(err);
//   }
// }

async function addToDatabase(fileName, audioTitle, text) {
  const entrant = getKeyValueObject(fileName, audioTitle, text);
  const data = await readDbFile();
  console.log('addToDatabase data', data);
  data.unshift(entrant);
  try {
    await fs.writeFile(database, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

module.exports.addToDatabase = addToDatabase;
module.exports.getKeyValueObject = getKeyValueObject;
module.exports.readDbFile = readDbFile;