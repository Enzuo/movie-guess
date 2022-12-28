import { useState, useEffect } from 'react'


function AnswerStatus ({answers}) {

  let [isVisible, setVisible] = useState(true)
  
  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [answers.length])
  if(!isVisible || !answers || !answers.length){
    return <div> no status </div>
  }
  return (
    <div>{answers[answers.length -1].score}</div>
  )
}

export default AnswerStatus