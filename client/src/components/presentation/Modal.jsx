import { useRef } from "react"
import "./Modal.css"

export default function Modal({children, onExit}) {

  const exitButtonRef = useRef()


  function handleExit(){
    console.log('exit modal')
    onExit()
  }

  function handleBlur(e){
    const hasLostFocus = !e.currentTarget.contains(e.relatedTarget)
    if(hasLostFocus){
      // e.preventDefault()
      exitButtonRef.current.focus()
      // handleExit()
    }
    // console.log(e, modalRef.current.contains(e.relatedTarget))

  }


  return (
    <div className="modal-container" onBlur={handleBlur}>
      <div className="modal">
        <button ref={exitButtonRef} onClick={handleExit}>exit</button>
        {children}
      </div>
      <div className="modal-bg" onClick={handleExit}></div>
    </div>
  )

}