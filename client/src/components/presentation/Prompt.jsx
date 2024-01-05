import { useState, useEffect, forwardRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './Prompt.css'

export default forwardRef(function Prompt({ onSubmit, disabled}, ref) {
  const promptInput = useFormInput('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(promptInput.value)
    promptInput.setValue('')
  }

  return (
    <div className="prompt">
      <form onSubmit={handleSubmit} disabled={disabled}>
        <input type="text" {...promptInput} ref={ref}></input>
        <button type='submit' disabled={disabled}>
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

  return { value, onChange: handleChange, setValue }
}