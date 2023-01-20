import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { AVATARS, GENDERS } from "../logic/user"
import Gender from './presentation/Gender'
import {UserButton} from "./presentation/User"

export default function UserList ({users, onAddClick, onEditClick, onSelect}) {

  const [selectedId, setSelected] = useState(null)

  function handleAdd(){
    onAddClick()
  }

  function handleEdit(index){
    onEditClick(index)
  }

  function handleSelect(index){
    if(selectedId === index){
      onSelect(users[index])
    }
    else {
      setSelected(index)
    }
  }

  function handleSubmit(e){
    console.log('handleSubmit')
    e.preventDefault()
    handleSelect(selectedId)
  }



  return (
    <form onSubmit={handleSubmit}>
      <div className="user-list">
        {users.map((u, i) => <UserButton key={i} user={u} index={i} isSelected={selectedId === i} onSelect={() => handleSelect(i)} onEditClick={() => handleEdit(i)} avatars={AVATARS}/>)}
          <button type="button" className="add-user" onClick={handleAdd}>+</button>
      </div>
      <input type="submit"/>
    </form>
  )
}

