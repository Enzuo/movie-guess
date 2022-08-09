var express = require('express');
const { checkAnswer } = require('./answer');
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
    const title = dataClips[id].title
    const result = checkAnswer(answer, title)

    let score = answerScore(result)


    res.json({score})
})

function answerScore(result){
  if(result.missingWords == ''){
    return 2
  }
  if(result.rightWords != ''){
    return 1
  }
  return 0
}

// Logic 

function getAQuestion(data){
    let id = Math.floor(Math.random()*data.length)
    return {id: id, file: data[id].file }
}

module.exports = router;