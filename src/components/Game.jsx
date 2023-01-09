import { useState, useEffect, useReducer} from 'react'

import VideoFile from './VideoFile'
import Prompt from './Prompt'
import Poster from './Poster'
import AnswerStatus from './AnswerStatus'
import AnswerHistory from './presentation/AnswerHistory'



export default function Game({user, round, onGameEnd}) {

  const [question, setQuestion] = useState({})
  const [answer, setAnswer] = useState({})
  const [score, setScore] = useState(0)
  const [answersHistory, addAnswerToHistory] = useReducer((state, a) => state.concat(a), [])

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
          setAnswer(res)
        })
      // TODO debug old state
      onGameEnd(score)
    }, 10000)
    return () => clearTimeout(timer)
  }, [question])

  function handleSubmit(answer){
    console.log(answer)
    postData('api/answer', { id : question.id, answer })
      .then((data) => {
        console.log(data)
        if(data.score > score){
          setScore(data.score)
        }
        addAnswerToHistory({text: answer, score: data.score})
      });
  }




  if (question) {
    return (
      <div>
        <div className="question">
          <VideoFile file={question.file}></VideoFile>
          <Answer d={answer}></Answer>
        </div>
        <div className="answer">
          <Prompt onSubmit={handleSubmit}></Prompt>
          <AnswerStatus answers={answersHistory}></AnswerStatus>
          <AnswerHistory answers={answersHistory}></AnswerHistory>
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
