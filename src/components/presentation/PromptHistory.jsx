export default function PromptHistory({ history }) {

  return (
    <div>
      History
      <ul>
        { history.map( (a, index) => <li key={index}>{a.text} {a.score}</li>)}
      </ul>
    </div>
  )
}
