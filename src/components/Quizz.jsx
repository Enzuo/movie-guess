import { useState, useEffect, useReducer} from 'react'

import VideoFile from './VideoFile'
import Answer from './Answer'
import AnswerHistory from './presentation/AnswerHistory'



export default function Quizz({user}) {

  const [question, setQuestion] = useState({})
  const [answersHistory, addAnswerToHistory] = useReducer((state, a) => state.concat(a), [])
  const [answerStatus, setAnswerStatus] = useState()
  const [answerId, gotAnswer] = useReducer((state) => state + 1, 0)

  useEffect(() => {
    fetch('api/getQuestion')
      .then(res => res.json())
      .then(res => {
        setQuestion(res)
        console.log('got new question', res)
      })
  },[])

  function handleSubmit(answer){
    console.log(answer)
    postData('api/answer', { id : question.id, answer })
      .then((data) => {
        console.log(data)
        gotAnswer(1)
        setAnswerStatus(data.score)
        addAnswerToHistory({text: answer, score: data.score})
      });
  }




  if (question) {
    return (
      <div>
        <VideoFile file={question.file}></VideoFile>
        <Answer onSubmit={handleSubmit}></Answer>
        <AnswerStatus key={answerId} status={answerStatus}></AnswerStatus>
        <AnswerHistory answers={answersHistory}></AnswerHistory>
        <TestNull></TestNull>
      </div>
    )
  }

  return (
    <div>
    </div>
  )
}

function AnswerStatus ({status}) {

  let [isVisible, setVisible] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)
    return () => clearTimeout(timer)
  })
  if(!isVisible){
    return <div> no status </div>
  }
  return (
    <div>{status}</div>
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
