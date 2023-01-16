import { useState } from "react"
import { GENDERS, AVATARS } from "../logic/user"
import {GenderPicker, AvatarPicker} from "./presentation/Picker"

export default function UserEdit ({user, onEdit}) {
  if(!user){
    return null
  }
  return(
    <div>
      Name : 
      <input type="text" value={user.name} onChange={(e) => onEdit({...user, name : e.target.value})}></input>
      Age : <Number value={user.age} onChange={(age) => onEdit({...user, age})}>

      </Number>
      Gender : <GenderPicker value={user.gender} options={GENDERS} onPick={(gender) => onEdit({...user, gender})}>

      </GenderPicker>
      <AvatarPicker value={user.avatar} options={AVATARS} onPick={(avatar) => onEdit({...user, avatar})}></AvatarPicker>
    </div>
  )
}

function Number ({value, onChange}) {
  console.log('number', value)
  let val = value !== null ? value : ''

  function handleChange (e) {
    onChange(parseInt(e.target.value))
    // val = e.target.value
  }

  return (
    <input min="0" max="100" type="number" value={val} onChange={handleChange}>
    
    </input>
  )
}



function CountryPicker () {

}