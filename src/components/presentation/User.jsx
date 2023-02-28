import { faClose, faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './User.css'

export default function User({user, isSelected, avatars, onEditClick, onClick, onDeleteClick}) {
  let className = isSelected ? "user selected" : "user"

  function handleEditClick(e) {
    console.log('edit click')
    e.stopPropagation()
    e.preventDefault()
    onEditClick()
  }

  function handleDeleteClick(e){
    console.log('delete click')

    onDeleteClick()
  }

  return (
    <div className={className} onClick={onClick}>
      <div className="user-avatar">
        <Avatar options={avatars} index={user.avatar}></Avatar>
      </div>
      <div className="user-name">{user.name}</div>
      <div className="user-score">{user.score}</div>
      <button type="button" className="user-edit-button" onClick={handleEditClick}><FontAwesomeIcon icon={faPencil}/></button>
      <button type="button" className="user-delete-button" onClick={handleDeleteClick}><FontAwesomeIcon icon={faClose}/></button>
    </div>
  )
}


function Avatar({options, index}){
  if(!index) return null
  return (
    <FontAwesomeIcon icon={options[index].icon}></FontAwesomeIcon>
  )
}

export function UserButton({user, index, isSelected, onSelect, onEditClick, onDeleteClick, avatars}) {
  return (
    <div className="user-button">
      <label htmlFor={"user"+index}>
        <input
          id={"user"+index} 
          type="radio" 
          name="user" 
          className="user-button-radio" 
          checked={isSelected} 
          onChange={(e) => onSelect(e.currentTarget.value)}
          onClick={(e) => onSelect(e.currentTarget.value)}
        />
        <User avatars={avatars} onEditClick={onEditClick} onDeleteClick={onDeleteClick} user={user}></User>
      </label>
    </div>
  )
}