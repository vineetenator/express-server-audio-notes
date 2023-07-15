var express = require('express');
var router = express.Router();
var polly = require('../scripts/convertToAudio');


router.post('/', function (req, res, next) {
  console.log(req.body);
  polly.convertToAudio('Hi, my name is Post and I am going to present your audio notes', 'vin2');
  res.send({"success": "ok"});
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  polly.convertToAudio('Hi, my name is July and I am going to present your audio notes', 'vin1');
  res.send('success');
});


module.exports = router;
