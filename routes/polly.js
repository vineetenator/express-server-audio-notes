var express = require('express');
var router = express.Router();
var polly = require('../scripts/convertToAudio');
var DB = require('../scripts/dbManager');


router.post('/', function (req, res, next) {
  console.log(req.body);
  const date = new Date();
  const textNotes = req.body.textNotes;
  const audioTile = req.body.noteName || date.toISOString();
  const fileName = date.getTime().toString();
  DB.addToDatabase(fileName, audioTile, textNotes.substr(0, 25))
  polly.convertToAudio(textNotes, fileName);
  res.send({"success": "ok"});
});

router.get('/', function (req, res, next) {
  polly.convertToAudio('Hi, my name is July and I am going to present your audio notes', 'vin1');
  res.send('success');
});


module.exports = router;
