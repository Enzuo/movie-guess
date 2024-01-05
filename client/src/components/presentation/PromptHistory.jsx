import './PromptHistory.css'
import { reverseMap } from '../../logic/utils'


export default function PromptHistory({ history }) {

  return (
    <div className="prompt-history">
      <ul>
        { reverseMap(history, (a, index) => <li key={index}>{a.text} {a.score}</li>)}
      </ul>
      <div className="prompt-history-background"></div>
    </div>
  )
}
