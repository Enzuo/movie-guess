import { GENDERS } from "../logic/user"

export default function UserList ({users, onAdd, onEdit}) {

  function handleAdd(){
    onAdd()
  }

  function handleEdit(index){
    onEdit(index)
  }



  return (
    <div>
      {users.map((u, i) => <User onClick={() => handleEdit(i)} key={i} user={u}></User>)}
      <button onClick={handleAdd}>Add</button>
    </div>
  )



}

function User({user, onClick}) {
  return (
    <div>
      Name : {user.name}
      Age : {user.age}
      <Gender value={user.gender}></Gender>
      <button onClick={() => onClick()}>Edit</button>
    </div>
  )
}

function Gender({value}) {
  if(value === null) return null
  return (
    <div>{GENDERS[value].label}</div>
  )
}