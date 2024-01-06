import * as React from 'react'
import { useState, useEffect} from "react"

import movieClips from '../data/movies.json'
import VideoFile from './assets/VideoFile'

console.log('movieClips', movieClips)

function AppMain() {

  const [gameState, setGameState] = useState({isStarted: false, round:0, timeEnd:0, movie:{title:''}, question: '', answer: '', phase : ''})
  const [isStarted, setIsStarted] = useState(false)


  function handlePrepareGame() {
    const state = prepareGame(gameState)
    setGameState(state)
  }

  function handleStartGame() {
    // start a timer & video
    const state = startGame(gameState)
    setIsStarted(true)
    setGameState(state)
  }

  function handleShowAnswer(){
    const phase = 'answer'
    setGameState({...gameState, phase})
  }

  function handleResetGame() {
    setIsStarted(false)
    setGameState({...gameState, phase: 'start'})
  }

  useEffect(() => {
    if(!isStarted){
      handlePrepareGame()
    }
    if(isStarted) {
      startGameClock(gameState, handleGameEnd)
    }
  },[isStarted])

  function handleGameEnd() {
    setGameState({...gameState, phase : 'goToAnswer'})
  }

  if(isStarted && gameState.phase === 'answer'){
    return (
      <>
      Showing answer
      {gameState.question}
      {gameState.answer}
      <button autoFocus onClick={handleResetGame}>Continue</button>
      </>
    )
  }

  if(isStarted){
    return (
      <>
      Playing movie
      {gameState.question}
      <VideoFile file={gameState.movie.filename}/>
      {gameState.phase === 'goToAnswer' && <button autoFocus onClick={handleShowAnswer}>Voir la réponse</button>}
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
  const moviePool = movieClips
  const movie = pickMovieClip(moviePool)
  const {question, answer} = pickQuestion(movie)
  return gameState = {...gameState, movie, question, answer}
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