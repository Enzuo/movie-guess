import { useState } from "react"
import { GENDERS } from "../logic/user"

export default function UserList ({users, onAddClick, onEditClick, onSelect}) {

  const [highlightedIndex, setHiglighted] = useState(null)

  function handleAdd(){
    onAddClick()
  }

  function handleEdit(index){
    onEditClick(index)
  }

  function handleClick(index){
    if(highlightedIndex === index){
      onSelect(users[index])
    }
    setHiglighted(index)
  }



  return (
    <div>
      {users.map((u, i) => <User selected={highlightedIndex === i} onClick={() => handleClick(i)} onEditClick={() => handleEdit(i)} key={i} user={u}></User>)}
      <button onClick={handleAdd}>Add user</button>
    </div>
  )



}

function User({user, selected, onEditClick, onClick}) {
  let className = selected ? "user selected" : "user"

  function handleEditClick(e) {
    e.stopPropagation()
    onEditClick()
  }

  return (
    <div className={className} onClick={onClick}>
      Name : {user.name}
      Age : {user.age}
      Score : {user.score}
      <Gender value={user.gender}></Gender>
      <button onClick={handleEditClick}>Edit user</button>
    </div>
  )
}

function Gender({value}) {
  if(value === null) return null
  return (
    <div>{GENDERS[value].label}</div>
  )
}