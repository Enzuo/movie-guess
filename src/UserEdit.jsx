import { useState } from "react"

export default function UserEdit () {
  return(
    <div>
      Age
      <Number>

      </Number>
      <GenderPicker>

      </GenderPicker>
    </div>
  )
}

function Number () {
  return (
    <div>num</div>
  )
}

function GenderPicker () {

  const choices = [{ label : '♀️' }, {label: '♂️'}, {label: '⚧️'}]
  const [selectedIndex, setSelected] = useState()

  function handleSelect(index) {
    setSelected(index)
  }

  return (
    <div>
      {choices.map((a, i) => (
        <Choice key={i} onSelect={() => handleSelect(i)} isSelected={selectedIndex === i} {...a}>

        </Choice>
      ))}
    </div>
  )
}

function Choice ({label, onSelect, isSelected}) {
  const style = isSelected ? {color : 'orange'} : {}

  return (
    <div className="choice" style={style} onClick={onSelect}>{label}</div>
  )
}