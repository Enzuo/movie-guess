import { useState, useEffect } from 'react'

import VideoFile from './components/VideoFile'
import Answer from './Answer'


export default function Quizz() {

  const [file, setFile] = useState()

  useEffect(() => {
    fetch('api/getQuestion')
      .then(res => res.json())
      .then(res => {
        setFile(res.file)
        console.log(res)
      })
  },[])

  function handleSubmit(answer){
    console.log(answer)
  }

  if (file) {
    return (
      <div>
        <VideoFile file={file}></VideoFile>
        <Answer onSubmit={handleSubmit}></Answer>
      </div>
    )
  }

  return (
    <div>
    </div>
  )

}
