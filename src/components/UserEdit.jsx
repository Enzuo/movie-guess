import { useState, forwardRef } from "react"
import { GENDERS, AVATARS } from "../logic/user"
import {GenderPicker, AvatarPicker} from "./presentation/Picker"

export default forwardRef(function UserEdit ({user, onEdit}, ref) {
  if(!user){
    return null
  }
  return(
    <div>
      <p>
        <label htmlFor="name" >Name :</label> 
        <input ref={ref} label="name" type="text" value={user.name} onChange={(e) => onEdit({...user, name : e.target.value})}></input>
      </p>
      <p>
        <label htmlFor="age">Age:</label>
        <Number value={user.age} onChange={(age) => onEdit({...user, age})}/>
      </p>
      <GenderPicker value={user.gender} options={GENDERS} onPick={(gender) => onEdit({...user, gender})}/>
      <AvatarPicker value={user.avatar} options={AVATARS} onPick={(avatar) => onEdit({...user, avatar})}></AvatarPicker>
    </div>
  )
})

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