import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { AVATARS, GENDERS } from "../logic/user"
import Gender from './presentation/Gender'
import {UserButton} from "./presentation/User"

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
    else {
      setHiglighted(index)
    }
  }



  return (
    <div className="user-list">
      {users.map((u, i) => <UserButton key={i} user={u} index={i} isSelected={highlightedIndex === i} onClick={() => handleClick(i)} onEditClick={() => handleEdit(i)} avatars={AVATARS}/>)}
      <button onClick={handleAdd}>Add user</button>
    </div>
  )
}

