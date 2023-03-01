var express = require('express');
var bodyParser = require('body-parser')
const dataClips = require('./movies.json')
const { checkAnswer, checkProposition } = require('./answer');
var router = express();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())


// const dataClips = [
//     {title: ["men in black"], file : "mib1", poster : "mib1"},
//     {title: ["Knight and day"], file : "knightandday3", poster : "knightandday"},
//     // {title: ["idiocracy"], file : "idiocracyiq", poster : "idiocracy"},
// ]

router.get('/', function (req, res) {
  res.send('Api Home page');
})

router.get('/getQuestion', function (req, res) {
    const question = pickAQuestion(dataClips)
    res.json({id: question.id, file: question.file })
})

// TODO shouldn't be able to get answer unless quizz is over
router.get('/getAnswer', function (req, res) {
  let clipId = req.query.id
  console.log("clipId ?", clipId, typeof clipId)
  if(clipId === 'undefined'){
    return res.status(400).send()
  }
  const clip = dataClips[clipId] // dataClips.find((clip) => clip.id === clipId)
  res.json({id: clipId, title: clip.title, poster : clip.poster, year : clip.year })
})

router.post('/answer', function (req, res) {
    const {id, answer} = req.body
    const title = dataClips[id].title
    let score = checkProposition(answer, title)


    res.json({score})
})

// Logic 

function pickAQuestion(data){
    let id = Math.floor(Math.random()*data.length)
    return {id: id, file: data[id].filename }
}

module.exports = router;