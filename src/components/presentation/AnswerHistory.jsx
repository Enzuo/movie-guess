export default function AnswerHistory({ answers }) {

  return (
    <div>
      History
      <ul>
        { answers.map( (a, index) => <li key={index}>{a.text} {a.score}</li>)}
      </ul>
    </div>
  )
}
