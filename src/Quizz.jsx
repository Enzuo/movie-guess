import { useState, useEffect, useReducer} from 'react'

import VideoFile from './components/VideoFile'
import Answer from './Answer'
import AnswerHistory from './components/presentation/AnswerHistory'
import {createUser} from './logic/user'
import { UserList } from './components/UserList'
import UserEdit from './components/UserEdit'



export default function Quizz() {

  const [question, setQuestion] = useState({})
  const [answers, addAnswer] = useReducer((state, a) => state.concat(a), [])
  const [users, setUsers] = useState([createUser()])
  const [userEditIndex, setUserEdit] = useState()


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
        addAnswer({text: answer, score: data.score})
      });
  }

  function handleAddUser(){
    setUsers((state) => state.concat(createUser()))
  }

  function handleEditUser(index){
    console.log('edit user', index)
    setUserEdit(index)
  }


  function handleUserEdit(user){
    console.log('user got edited', user)
    users[userEditIndex] = user
    setUsers(users)
  }

  let userEdit = userEditIndex !== null ? <UserEdit user={users[userEditIndex]} onEdit={handleUserEdit}></UserEdit> : null


  if (question) {
    return (
      <div>
        <VideoFile file={question.file}></VideoFile>
        <Answer onSubmit={handleSubmit}></Answer>
        <AnswerHistory answers={answers}></AnswerHistory>
        <UserList users={users} onAdd={handleAddUser} onEdit={handleEditUser}></UserList>
        {userEdit}
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
