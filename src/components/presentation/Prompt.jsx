import { useState, useEffect, forwardRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './Prompt.css'

export default forwardRef(function Prompt({ onSubmit }, ref) {
  const answer = useFormInput('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(answer.value)
  }

  return (
    <div className="prompt">
      <form onSubmit={handleSubmit}>
        <input {...answer} ref={ref}></input>
        <button type='submit'>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
    </div>
  )
})

function useFormInput(defaultValue) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return { value, onChange: handleChange }
}