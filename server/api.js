var express = require('express');
var router = express.Router();


const dataClips = [
    {title: "jibaro", file : "jibaro2_nqjs1w"},
    {title: "mr bean ultimate disaster", file : "ultimatedisaster"},
    {title: "idiocracy", file : "idiocracyiq"},
]

router.get('/', function (req, res) {
  res.send('Api Home page');
})

router.get('/getQuestion', function (req, res) {
    const question = getAQuestion(dataClips)
    res.json({id: question.id, file: question.file })
})

router.post('/answer', function (req, res) {
    const {id, answer} = req.body
    console.log(req.body)
    res.json({test: 'test'})
})

// Logic 

function getAQuestion(data){
    let id = Math.floor(Math.random()*data.length)
    return {id: id, file: data[id].file }
}

module.exports = router;