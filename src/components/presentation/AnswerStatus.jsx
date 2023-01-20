import { useState, useEffect } from 'react'
import './AnswerStatus.css'


const MESSAGES = [[
  "Hmm... no", "Not your best guess", "Wrong", "You might have to rethink this"
],[

],[
  "You're onto something", "Keep going"
],[
  "Correct !"
]
]


function AnswerStatus ({answer}) {

  let [isVisible, setVisible] = useState(true)
  
  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [answer])

  if(!isVisible || !answer){
    return <div className="status-container"></div>
  }

  let score = answer.score
  const MESSAGE_TYPES = ["wrong", "", "almost", "success"]
  let messageStyle = "message-"+MESSAGE_TYPES[score]

  return (
    <div className="status-container">
      <div className={`status-message ${messageStyle}`}>
        {MESSAGES[score][0]}
      </div>
    </div>
  )
}

export default AnswerStatus