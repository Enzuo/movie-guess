import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import logo from './logo.svg'
import './App.css'
import Quizz from './components/Quizz'
import UserEdit from './components/UserEdit'
import AppMain from './components/AppMain'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('api/getQuestion').then(res => res.json()).then(res => console.log(res))
    var socket = io(); // defaults trying to connect to the host that serves the page.
  })

  return (
    <div className="App">
      <AppMain></AppMain>
    </div>
  )
}

export default App
