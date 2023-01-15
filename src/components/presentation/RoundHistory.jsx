import Poster from '../assets/Poster'
import './RoundHistory.css'


export default function RoundHistory({history}){
  return (
    <div>
      Answers
      <ul>
        { reverseMap( history, (d, index) => (<li key={index}><RoundResult d={d}></RoundResult></li>) )}
      </ul>
    </div>
  )
}

function RoundResult({d}){
  if(!d.title){
    return null
  }
  return (
    <div className="round">
      <Poster file={d.poster}></Poster>
      <div>Title : {d.title}</div>
    </div>
  )
}

function reverseMap(array, cb){
  let output = []
  for(let i=array.length-1; i >= 0; i--){
    let result = cb(array[i], i)
    output.push(result)
  }
  return output
}