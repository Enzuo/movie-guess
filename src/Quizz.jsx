import { useState, useEffect } from 'react'

import VideoFile from './components/VideoFile'


export default function Quizz() {

  const [file, setFile] = useState()

  useEffect(() => {
    fetch('api/getQuestion')
      .then(res => res.json())
      .then(res => {
        setFile(res.file)
        console.log(res)
      })
  })

  if (file) {
    return (
      <VideoFile file={file}></VideoFile>
    )
  }

  return (
    <div>
    </div>
  )

}

