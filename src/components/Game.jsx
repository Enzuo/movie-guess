import { useState, useEffect, useReducer, useRef} from 'react'

import VideoFile from './VideoFile'
import Prompt from './presentation/Prompt'
import AnswerStatus from './AnswerStatus'
import PromptHistory from './presentation/PromptHistory'
import CountdownTimer from './CountDownTimer'
import RoundHistory from './presentation/RoundHistory'

import './Game.css'



export default function Game({user, round, onGameEnd, timeEnd}) {

  const [question, setQuestion] = useState({})
  const [isGameOver, setOver] = useState(false)
  const promptRef = useRef(null)
  // const [answer, setAnswer] = useState({})
  // const [clockTick, setClockTick] = useState(0)
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
        setOver(false)
        setScore(0)
        console.log('got new question', res)
      })
    promptRef.current.focus()
  },[round])

  useEffect(() => {
    console.log('setup game clock')
    const clock = setInterval(() => {
      const currentTime = new Date().getTime()
      if(currentTime >= timeEnd){
        fetch('api/getAnswer?id='+question.id)
          .then(res => res.json())
          .then(res => {
            addRoundToHistory(res)
          })
        setOver(true)
        clearInterval(clock)
      }
    }, 1000)
    return () => clearInterval(clock)
  }, [question])

  useEffect(() => {
    if(isGameOver){
      onGameEnd(score)
    }
  }, [isGameOver])

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
      <div className="layout">
        <div className="question">
          <div>What&apos;s this movie ?</div>
          <VideoFile file={question.file}></VideoFile>
          <CountdownTimer targetTime={timeEnd}></CountdownTimer>
          <RoundHistory history={roundsHistory}></RoundHistory>
        </div>
        <div className="prompt">
          <Prompt onSubmit={handleSubmit} ref={promptRef}></Prompt>
          <AnswerStatus answers={promptsHistory}></AnswerStatus>
          <PromptHistory history={promptsHistory}></PromptHistory>
        </div>
      </div>
    )
  }

  return (
    <div>
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
