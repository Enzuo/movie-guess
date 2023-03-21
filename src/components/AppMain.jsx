import { useState, useRef, useEffect} from "react"

import {createUser, saveUser, removeUser} from '../logic/user'
import UserList from "./UserList"
import UserEdit from "./UserEdit"
import Game from "./Game"
import { useLocalStorage } from "../hooks/localStorage"
import Modal from "./presentation/Modal"


function AppMain() {

  const [users, setUsers] = useLocalStorage('users', [createUser()])
  // const [usersLS, setUsersLS] = useLocalStorage('users', [createUser()])
  // const [users, setUsers] = useState(usersLS)
  // TODO use id here instead of user object to avoid repeatition of data
  const [editUser, setEditUser] = useState({})
  const [currentDeleteUser, setCurrentDeleteUser] = useState({})
  const [gameState, setGameState] = useState({isStarted: false, round:0})
  const userEditRef = useRef()

  useEffect(() => {
    console.log("use effect relaunch on editUser", editUser)
    if(editUser.id){
      userEditRef.current.focus()
    }
  }, [editUser.id])

  function handleUserAddClick(){
    setUsers(saveUser(createUser(), users))
  }

  function handleUserEditClick(index){
    console.log('edit user', index)
    setEditUser(users[index])
  }

  function handleUserDeleteClick(index){
    console.log('delete user', index)
    setCurrentDeleteUser(users[index])
  }


  function handleUserSave(user){
    console.log('user got edited', user)
    setEditUser(user)
    // users[userEditIndex] = user
    setUsers(saveUser(user, users))
  }

  function handleUserDelete(user){
    console.log('user got deleted', user)
    setCurrentDeleteUser({})
    setUsers(removeUser(user, users))
  }

  function handleUserSelect(user){
    startGame(user)
  }

  function startGame(user){
    // launch new game with selected user
    const ROUND_TIME = 10000
    if(!gameState.isStarted){
      setGameState({
        user, 
        timeEnd: new Date().getTime() + ROUND_TIME, 
        isStarted: true, 
        round : gameState.round + 1
      })
    }

    // TODO maybe main loop should be here
  }

  function handleGameEnd(score){
    console.log('got score', score)
    gameState.user.score  = gameState.user.score ? gameState.user.score + score : score
    setUsers(saveUser(gameState.user, users))
    setGameState(Object.assign(gameState, {isStarted: false}))
  }



  let userEdit = editUser.id ? (
    <Modal onExit={() => {setEditUser({})}}>
      <UserEdit ref={userEditRef} user={editUser} onEdit={handleUserSave}></UserEdit>
    </Modal>) 
  : null

  let userDelete = currentDeleteUser.id ? (
    <Modal onExit={() => {setCurrentDeleteUser({})}}>
      <div>
        Delete user {currentDeleteUser.name} ? 
        <button onClick={() => handleUserDelete(currentDeleteUser)}>Delete</button>
      </div>
    </Modal>) 
  : null

  return (
    <>
      {userEdit}
      {userDelete}
      <UserList users={users} onAddClick={handleUserAddClick} onEditClick={handleUserEditClick} onDeleteClick={handleUserDeleteClick} onSelect={handleUserSelect}></UserList>
      <Game timeEnd={gameState.timeEnd} user={gameState.user} round={gameState.round} onGameEnd={handleGameEnd}></Game>
    </>
  )
}

export default AppMain