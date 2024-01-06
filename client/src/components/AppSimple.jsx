import * as React from 'react'
import { useState, useEffect} from "react"

import movieClips from '../data/movies.json'
import VideoFile from './assets/VideoFile'
import CountdownTimer from './CountDownTimer'
import Poster from './assets/Poster'

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
      <div className="game-layout">
        <h1>{gameState.question}</h1>
        <h2>{gameState.answer}</h2>
        <div class="movie-detail">
          <ul>
            <li>{gameState.movie.title}</li>
            <li>{gameState.movie.year}</li>
          </ul>
          <Poster file={gameState.movie.poster}></Poster>
        </div>
        <button autoFocus onClick={handleResetGame}>Continue</button>
      </div>
    )
  }

  if(isStarted){
    return (
      <div className="game-layout">
        <h1>{gameState.question}</h1>
        <VideoFile file={gameState.movie.filename}/>
        <CountdownTimer targetTime={gameState.timeEnd}></CountdownTimer>
        {gameState.phase === 'goToAnswer' && <button autoFocus onClick={handleShowAnswer}>Voir la réponse</button>}
      </div>
    )
  }

  return (
    <>
      <VideoFile isHidden={true} file={gameState.movie.filename}/>
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
  const questionIndex = Math.floor(Math.random() * 10)
  if(questionIndex <= 2) {
    return {question : 'Qui a réalisé ce film ?', answer : movie.realisteur}
  }
  if(questionIndex <= 3) {
    return {question : 'Quel sont les acteurs que l\'on apercoit dans cet extrait ?', answer : movie.actors}
  }
  return {question : 'De quelle oeuvre est tirée cet extrait ?', answer : movie.title}
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