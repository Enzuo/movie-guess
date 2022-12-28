import { useState, useEffect } from 'react'


export default function Answer({ onSubmit }) {

  const answer = useFormInput('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(answer.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input {...answer}></input>
      <input type="submit" value="Submit" />
    </form>
  )
}

function useFormInput(defaultValue) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return { value, onChange: handleChange }
}