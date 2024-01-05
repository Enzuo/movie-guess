import * as React from 'react'
import { useState, useRef, useEffect} from "react"


import {createUser, saveUser, removeUser} from '../logic/user'
import UserList from "./UserList"
import UserEdit from "./UserEdit"
import Game from "./Game"
import { useLocalStorage } from "../hooks/localStorage"
import Modal from "./presentation/Modal"


function AppMain() {

  // const [usersLS, setUsersLS] = useLocalStorage('users', [createUser()])
  // const [users, setUsers] = useState(usersLS)
  // TODO use id here instead of user object to avoid repeatition of data
  // const [editUser, setEditUser] = useState({})
  // const [currentDeleteUser, setCurrentDeleteUser] = useState({})
  const [gameState, setGameState] = useState({isStarted: false, round:0, timeEnd:0, movie:{title:''}, question: '', answer: '', phase : ''})
  const [isStarted, setIsStarted] = useState(false)
  // const userEditRef = useRef()

  // function startGame(user){
  //   // launch new game with selected user
  //   const ROUND_TIME = 10000
  //   if(!gameState.isStarted){
  //     setGameState({
  //       timeEnd: new Date().getTime() + ROUND_TIME, 
  //       isStarted: true, 
  //       round : gameState.round + 1
  //     })
  //   }

  //   // TODO maybe main loop should be here
  // }




  // function handleGameEnd(score){
  //   console.log('got score', score)
  //   gameState.user.score  = gameState.user.score ? gameState.user.score + score : score
  //   setGameState(Object.assign(gameState, {isStarted: false}))
  // }

  function handlePrepareGame() {
    prepareGame(gameState)
  }

  function handleStartGame() {
    // start a timer & video
    const state = startGame(gameState)
    setIsStarted(true)
    setGameState(state)
  }

  useEffect(() => {
    if(isStarted) {
      startGameClock(gameState, handleGameEnd)
    }
  },[isStarted])

  function handleGameEnd() {
    setGameState({...gameState, phase : 'answer'})
  }

  if(isStarted && gameState.phase === 'answer'){
    return (
      <>
      Showing answer
      {gameState.question}
      {gameState.answer}
      <button onClick={handleStartGame}>Continue</button>
      </>
    )
  }

  if(isStarted){
    return (
      <>
      Playing movie
      {gameState.question}
      {gameState.movie.title}
      </>
    )
  }

  return (
    <>
      <button autoFocus onClick={handleStartGame}>Start</button>
    </>
  )
}

export default AppMain

/*
 *
 * Game LOGIC
 *
 */
function prepareGame(gameState){
  // pick a movie
  const moviePool = [{title : test}]
  const movie = pickMovieClip(moviePool)
  const question = pickQuestion(movie)
  return gameState = {...gameState, movie, question}
}

function pickMovieClip(data){
  const nb = data.length
  const index = Math.floor(Math.random() * nb) // Generates a random integer from 0 to (nb-1)
  return data[index]
}

function pickQuestion(movie){
  return {question : 'Quel est le titre de film ?', answer : movie.title}
}

function startGame(gameState){
    // start a timer & launch video
    const ROUND_TIME = 10000
    const timeEnd = new Date().getTime() + ROUND_TIME
    const isStarted = true

    return {...gameState, isStarted, timeEnd}
}

function startGameClock(gameState, cb){
  const timeEnd = gameState.timeEnd
  const currentTime = new Date().getTime()
  const clock = setTimeout(() => {
    console.log('timeout')
    cb()
    clearTimeout(clock)
  }, timeEnd-currentTime)
  return {...gameState, clock}
}

function showAnswer(){

}