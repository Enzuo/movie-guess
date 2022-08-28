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
      <GenderPicker value={user.gender} onPick={(gender) => onEdit({...user, gender})}>

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

function GenderPicker ({value, onPick}) {

  const choices = [{ label : '♀️' }, {label: '♂️'}, {label: '⚧️'}]
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