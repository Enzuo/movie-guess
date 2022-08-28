import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import logo from './logo.svg'
import './App.css'
import Quizz from './Quizz'
import UserEdit from './UserEdit'
import {createUser} from './logic/user'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(createUser())

  useEffect(() => {
    fetch('api/getQuestion').then(res => res.json()).then(res => console.log(res))
    var socket = io(); // defaults trying to connect to the host that serves the page.
  })

  return (
    <div className="App">
      <Quizz></Quizz>
      <UserEdit user={user} onEdit={(u) => setUser(u)}></UserEdit>
    </div>
  )
}

export default App
