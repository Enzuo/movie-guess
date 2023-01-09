import { useState } from "react"

import {createUser, saveUser} from '../logic/user'
import UserList from "./UserList"
import UserEdit from "./UserEdit"
import Game from "./Game"
import { useLocalStorage } from "../hooks/localStorage"


function AppMain() {

  const [users, setUsers] = useLocalStorage('users', [createUser()])
  const [editUser, setEditUser] = useState(null)
  const [gameState, setGameState] = useState({isStarted: false, round:0})

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
    // launch new game with selected user
    if(!gameState.isStarted){
      setGameState({user, isStarted: true, round : gameState.round + 1})
    }
  }

  function handleGameEnd(score){
    console.log('got score', score)
    gameState.user.score  = gameState.user.score ? gameState.user.score + score : score
    setUsers(saveUser(gameState.user, users))
    setGameState(Object.assign(gameState, {isStarted: false}))
  }

  let userEdit = editUser !== null ? <UserEdit user={editUser} onEdit={handleUserSave}></UserEdit> : null


  return (
    <div>
      <UserList users={users} onAddClick={handleUserAddClick} onEditClick={handleUserEditClick} onSelect={handleUserSelect}></UserList>
        {userEdit}
      <Game user={gameState.user} round={gameState.round} onGameEnd={handleGameEnd}></Game>
    </div>
  )
}

export default AppMain