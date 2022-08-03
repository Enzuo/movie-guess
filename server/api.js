var express = require('express');
var router = express.Router();


const data = [
    {title: "jibaro", file : "jibaro2_nqjs1w"}
]

router.get('/', function (req, res) {
  res.send('Api Home page');
})

router.get('/getQuestion', function (req, res) {
    let id = 0
    res.json({file: data[id].file });
})

module.exports = router;