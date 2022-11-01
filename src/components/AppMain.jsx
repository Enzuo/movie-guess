import { useState } from "react"

import {createUser, saveUser} from '../logic/user'
import UserList from "./UserList"
import UserEdit from "./UserEdit"
import Quizz from "./Quizz"


function AppMain() {

  const [users, setUsers] = useState([createUser()])
  const [editUser, setEditUser] = useState(null)
  const [gameState, setGameState] = useState({})

  function handleUserAddClick(){
    setUsers((state) => state.concat(createUser()))
  }

  function handleUserEditClick(index){
    console.log('edit user', index)
    setEditUser(users[index])
  }


  function handleUserSave(user){
    console.log('user got edited', user)
    setEditUser(user)
    // users[userEditIndex] = user
    setUsers(saveUser(user, users))
  }

  function handleUserSelect(user){
    // launch quizz with selected user
    setGameState({user, quizz: true})
  }

  let userEdit = editUser !== null ? <UserEdit user={editUser} onEdit={handleUserSave}></UserEdit> : null


  return (
    <div>
      <UserList users={users} onAddClick={handleUserAddClick} onEditClick={handleUserEditClick} onSelect={handleUserSelect}></UserList>
        {userEdit}
      {gameState.quizz === true && <Quizz user={gameState.user}></Quizz>}
    </div>
  )
}

export default AppMain