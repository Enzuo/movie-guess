import { useState, useEffect } from 'react'
import { css } from '@linaria/core'


const prompt = css`
  text-size:32px;
`


export default function Prompt({ onSubmit }) {

  const answer = useFormInput('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(answer.value)
  }

  return (
    <div className={prompt}>
      <form onSubmit={handleSubmit}>
        <input {...answer}></input>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

function useFormInput(defaultValue) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return { value, onChange: handleChange }
}