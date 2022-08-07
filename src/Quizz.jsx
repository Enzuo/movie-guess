import { useState, useEffect } from 'react'

import VideoFile from './components/VideoFile'
import Answer from './Answer'


export default function Quizz() {

  const [question, setQuestion] = useState({})

  useEffect(() => {
    fetch('api/getQuestion')
      .then(res => res.json())
      .then(res => {
        setQuestion(res)
        console.log('got new question', res)
      })
  },[])

  function handleSubmit(answer){
    console.log(answer)
    postData('api/answer', { id : question.id, answer })
      .then((data) => {
        console.log(data)
      });
  }

  if (question) {
    return (
      <div>
        <VideoFile file={question.file}></VideoFile>
        <Answer onSubmit={handleSubmit}></Answer>
      </div>
    )
  }

  return (
    <div>
    </div>
  )

}


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
