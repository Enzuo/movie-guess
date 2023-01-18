import { useState, useRef, useEffect} from "react"

import {createUser, saveUser} from '../logic/user'
import UserList from "./UserList"
import UserEdit from "./UserEdit"
import Game from "./Game"
import { useLocalStorage } from "../hooks/localStorage"


function AppMain() {

  const [users, setUsers] = useLocalStorage('users', [createUser()])
  // const [usersLS, setUsersLS] = useLocalStorage('users', [createUser()])
  // const [users, setUsers] = useState(usersLS)
  const [editUser, setEditUser] = useState(null)
  const [gameState, setGameState] = useState({isStarted: false, round:0})
  const userEditRef = useRef()

  useEffect(() => {
    console.log("use effect relaunch on editUser", editUser)
    if(editUser){
      userEditRef.current.focus()
    }
  }, [editUser.id])

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
  }

  function handleGameEnd(score){
    console.log('got score', score)
    gameState.user.score  = gameState.user.score ? gameState.user.score + score : score
    setUsers(saveUser(gameState.user, users))
    setGameState(Object.assign(gameState, {isStarted: false}))
  }

  function testScore(){
    gameState.user.score  = gameState.user.score + 1
    setUsers(saveUser(gameState.user, users))
  }

  let userEdit = editUser !== null ? <UserEdit ref={userEditRef} user={editUser} onEdit={handleUserSave}></UserEdit> : null


  return (
    <div>
      <UserList users={users} onAddClick={handleUserAddClick} onEditClick={handleUserEditClick} onSelect={handleUserSelect}></UserList>
        {userEdit}
      <Game timeEnd={gameState.timeEnd} user={gameState.user} round={gameState.round} onGameEnd={handleGameEnd}></Game>
      <button onClick={testScore}>Add score</button>
    </div>
  )
}

export default AppMain