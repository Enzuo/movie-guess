import { useState } from "react"
import { GENDERS } from "../logic/user"

export default function UserList ({users, onAdd, onEdit, onSelect}) {

  const [selectedIndex, setSelected] = useState(null)

  function handleAdd(){
    onAdd()
  }

  function handleEdit(index){
    onEdit(index)
  }

  function handleSelect(index){
    setSelected(index)
    onSelect()
  }



  return (
    <div>
      {users.map((u, i) => <User selected={selectedIndex === i}onClick={() => handleSelect(i)} onEditClick={() => handleEdit(i)} key={i} user={u}></User>)}
      <button onClick={handleAdd}>Add</button>
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
      <Gender value={user.gender}></Gender>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  )
}

function Gender({value}) {
  if(value === null) return null
  return (
    <div>{GENDERS[value].label}</div>
  )
}