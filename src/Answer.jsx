import { useState, useEffect } from 'react'


export default function Answer({ onSubmit }) {

  const answer = useFormInput('')

  return (
    <input {...answer} onSubmit={onSubmit}></input>
  )
}

function useFormInput(defaultValue) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return { value, onChange: handleChange }
}