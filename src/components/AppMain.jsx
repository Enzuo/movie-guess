import { useState } from "react"

import {createUser, saveUser} from '../logic/user'
import UserList from "./UserList"
import UserEdit from "./UserEdit"
import Quizz from "./Quizz"



function AppMain() {

  const [users, setUsers] = useState([createUser()])
  const [editUser, setEditUser] = useState(null)

  function handleAddUser(){
    setUsers((state) => state.concat(createUser()))
  }

  function handleEditUser(index){
    console.log('edit user', index)
    setEditUser(users[index])
  }


  function handleSaveUser(user){
    console.log('user got edited', user)
    setEditUser(user)
    // users[userEditIndex] = user
    setUsers(saveUser(user, users))
  }

  let userEdit = editUser !== null ? <UserEdit user={editUser} onEdit={handleSaveUser}></UserEdit> : null


  return (
    <div>
      <UserList users={users} onAdd={handleAddUser} onEdit={handleEditUser}></UserList>
        {userEdit}
      <Quizz></Quizz>
    </div>
  )
}

export default AppMain