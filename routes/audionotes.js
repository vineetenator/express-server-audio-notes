var express = require('express');
var router = express.Router();
var DB = require('../scripts/dbManager');

/* GET audionotes listing. */
router.get('/', async function (req, res, next) {
  const data = await DB.readDbFile();
  res.send(data);
});

module.exports = router;
