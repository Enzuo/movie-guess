export default function PromptHistory({ prompts }) {

  return (
    <div>
      History
      <ul>
        { prompts.map( (a, index) => <li key={index}>{a.text} {a.score}</li>)}
      </ul>
    </div>
  )
}
