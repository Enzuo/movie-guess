import { useState } from "react"

export default function UserEdit ({user, onEdit}) {
  if(!user){
    return null
  }
  return(
    <div>
      User
      <Number value={user.age} onChange={(age) => onEdit({...user, age})}>

      </Number>
      <GenderPicker onPick={(gender) => onEdit({...user, gender})}>

      </GenderPicker>
    </div>
  )
}

function Number ({value, onChange}) {
  return (
    <input type="number" value={value} onChange={(e) => onChange(parseInt(e.target.value))}>
    
    </input>
  )
}

function GenderPicker ({onPick}) {

  const choices = [{ label : '♀️' }, {label: '♂️'}, {label: '⚧️'}]
  const [selectedIndex, setSelected] = useState()

  function handleSelect(index) {
    setSelected(index)
    onPick(index)
  }

  function handleKeyDown(e){
    console.log('key down', e.keyCode)
  }

  return (
    <div tabIndex="0" onKeyDown={handleKeyDown}>
      {choices.map((a, i) => (
        <GenderChoice key={i} onSelect={() => handleSelect(i)} isSelected={selectedIndex === i} {...a}>

        </GenderChoice>
      ))}
    </div>
  )
}

function GenderChoice ({label, onSelect, isSelected}) {
  const style = isSelected ? {color : 'orange'} : {}

  return (
    <div className="gender-choice" style={style} onClick={onSelect}>{label}</div>
  )
}