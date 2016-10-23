/* eslint-disable */
var express = require('express');
var router = express.Router();

router.get('/data', (req, res) => {
  setTimeout(() => {
    res.json({
      status: 0,
      msg: 'ok',
      data: {
        name: 'qiutc'
      }
    })
  }, 200);
});

module.exports = router;
