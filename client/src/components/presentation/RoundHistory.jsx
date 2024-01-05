import * as React from 'react'
import Poster from '../assets/Poster'
import { reverseMap } from '../../logic/utils'
import './RoundHistory.css'


export default function RoundHistory({history}){
  return (
    <div className="game-history">
      <ul>
        { reverseMap( history, (d, index) => (<li key={index}><RoundResult d={d}></RoundResult></li>) )}
      </ul>
      <div className="game-history-background"></div>
    </div>
  )
}

function RoundResult({d}){
  if(!d.title){
    return null
  }
  return (
    <div className="game-round">
      <Poster file={d.poster}></Poster>
      <div className="movie-title">{d.title}</div>
    </div>
  )
}

