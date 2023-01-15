import { useState } from "react"
import { GENDERS, AVATARS } from "../logic/user"
import AvatarPicker from "./presentation/AvatarPicker"

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
      Gender : <GenderPicker value={user.gender} onPick={(gender) => onEdit({...user, gender})}>

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

function GenderPicker ({value, onPick}) {

  const choices = GENDERS
  // const [selectedIndex, setSelected] = useState()

  function handleSelect(index) {
    // setSelected(index)
    onPick(index)
  }

  return (
    <div>
      <div>
        {choices.map((a, i) => (
          <GenderChoice id={i} key={i} onSelect={() => handleSelect(i)} isSelected={value === i} {...a}>

          </GenderChoice>
        ))}
      </div>
    </div>
  )
}

function GenderChoice ({id, label, onSelect, isSelected}) {
  const style = isSelected ? {color : 'orange'} : {}

  return (
    <label htmlFor={"gender-" + id}>
      <input type="radio" className="choice-radio" checked={isSelected} name="gender-choice" id={"gender-" + id} value={id} onChange={() => onSelect(id)} />
      <div className="gender-choice" style={style} onClick={onSelect}>
        {label}
      </div>
    </label>
  )
}

function CountryPicker () {

}