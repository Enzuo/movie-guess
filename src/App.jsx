import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import logo from './logo.svg'
import VideoFile from './VideoFile'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('api/hi').then(res => res.json()).then(res => console.log(res))
    var socket = io(); // defaults trying to connect to the host that serves the page.
  })

  return (
    <div className="App">
      <VideoFile></VideoFile>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React + Express!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
