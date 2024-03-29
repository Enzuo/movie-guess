import * as React from 'react'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import logo from './logo.svg'
import './reset.css'
import './App.css'
import Quizz from './components/Game'
import UserEdit from './components/UserEdit'
import AppMain from './components/AppMain'
import AppSimple from './components/AppSimple'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // fetch('api/getQuestion').then(res => res.json()).then(res => console.log(res))
    var socket = io(); // defaults trying to connect to the host that serves the page.
  })

  return (
    <div className="App">
      <AppSimple></AppSimple>
    </div>
  )
}

export default App
