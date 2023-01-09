import { useState, useEffect, useReducer} from 'react'

import VideoFile from './VideoFile'
import Prompt from './Prompt'
import Poster from './Poster'
import AnswerStatus from './AnswerStatus'
import PromptHistory from './presentation/PromptHistory'
import CountdownTimer from './CountDownTimer'



export default function Game({user, round, onGameEnd, timeEnd}) {

  const [question, setQuestion] = useState({})
  // const [answer, setAnswer] = useState({})
  const [score, setScore] = useState(0)
  const [promptsHistory, addPromptToHistory] = useReducer((state, a) => state.concat(a), [])
  const [roundsHistory, addRoundToHistory] = useReducer((state, a) => state.concat(a), [])

  useEffect(() => {
    if(!round){
      return
    }
    fetch('api/getQuestion')
      .then(res => res.json())
      .then(res => {
        setQuestion(res)
        setScore(0)
        console.log('got new question', res)
      })
  },[round])

  useEffect(() => {
    console.log('fetch answer after 45s')
    const timer = setTimeout(() => {
      fetch('api/getAnswer?id='+question.id)
        .then(res => res.json())
        .then(res => {
          addRoundToHistory(res)
        })
      // TODO fix stale closure
      gameEnd()
    }, 10000)
    return () => clearTimeout(timer)
  }, [question])

  function gameEnd(){
    onGameEnd(score)
  }

  function handleSubmit(answer){
    console.log(answer)
    postData('api/answer', { id : question.id, answer })
      .then((data) => {
        console.log(data)
        if(data.score > score){
          setScore(data.score)
        }
        addPromptToHistory({text: answer, score: data.score})
      });
  }




  if (question) {
    return (
      <div>
        <div className="question">
          <VideoFile file={question.file}></VideoFile>
          <CountdownTimer targetTime={timeEnd}></CountdownTimer>
          <RoundHistory history={roundsHistory}></RoundHistory>
        </div>
        <div className="answer">
          <Prompt onSubmit={handleSubmit}></Prompt>
          <AnswerStatus answers={promptsHistory}></AnswerStatus>
          <PromptHistory history={promptsHistory}></PromptHistory>
        </div>
        <TestNull></TestNull>
      </div>
    )
  }

  return (
    <div>
    </div>
  )
}

function RoundHistory({history}){
  return (
    <div>
      Answers
      <ul>
        { reverseMap( history, (d, index) => (<li key={index}><Answer d={d}></Answer></li>) )}
      </ul>
    </div>
  )
}

function Answer({d}){
  if(!d.title){
    return null
  }
  return (
    <div>
      <Poster file={d.poster}></Poster>
      <div>Title : {d.title}</div>
    </div>
  )
}

function TestNull(){
  let [myVal, setMyVal] = useState(2)
  return (
    <div>
      Test null
      <input value={myVal}></input>
      <button onClick={() => setMyVal(null)}>set null</button>
    </div>
  )
}

/*
 * 
 * Helpers 
 * 
 * 
 */

function reverseMap(array, cb){
  let output = []
  for(let i=array.length-1; i >= 0; i--){
    let result = cb(array[i], i)
    output.push(result)
  }
  return output
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
