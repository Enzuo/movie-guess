import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useId } from 'react'
import './Picker.css'




export function AvatarPicker (props) {
  return (<Picker {...props} itemComponent={PickerChoice}></Picker>)
}

export const GenderPicker = (props) => (<Picker {...props} itemComponent={PickerChoice}></Picker>)



export function Picker ({ options, value, onPick, itemComponent }) {
  const htmlId = useId()

  function handleSelect(index){
    onPick(index)
  }

  return (
    <div>
      <div>
        {options.map((a, i) => 
          itemComponent({
            id: i,
            pickerId: htmlId,
            onSelect: () => handleSelect(i),
            isSelected: value === i,
            ...a,
        }))}
      </div>
    </div>
  )
}

function PickerChoice ({id, pickerId, icon, label, onSelect, isSelected}) {
  const htmlid = useId()

  const style = isSelected ? {color : 'orange'} : {}

  return (
    <div key={id} className="picker-choice">
      <label htmlFor={htmlid}>
        <input type="radio" className="picker-choice-radio" checked={isSelected} name={pickerId} id={htmlid} value={id} onChange={() => onSelect(id)} />
        <div className="picker-choice-item" onClick={onSelect}>
          <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
          {label}
        </div>
      </label>
    </div>
  )
}


function AvatarChoice ({id, icon, isSelected, onSelect}) {
  const style = isSelected ? {color : 'orange'} : {}

  return (
    <div className="picker-choice" onClick={onSelect}>
      <FontAwesomeIcon style={style} icon={icon}></FontAwesomeIcon>
    </div>
  )
}
