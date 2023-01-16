import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AvatarPicker.css'




export function AvatarPicker (props) {
  return (<Picker {...props} itemComponent={AvatarChoice}></Picker>)
}

export const GenderPicker = (props) => (<Picker {...props} itemComponent={GenderChoice}></Picker>)



export function Picker ({ options, value, onPick, itemComponent }) {

  function handleSelect(index){
    onPick(index)
  }

  return (
    <div>
      <div>
        {options.map((a, i) => 
          itemComponent({
            id:i,
            onSelect:() => handleSelect(i),
            isSelected:value === i,
            ...a,
        }))}
      </div>
    </div>
  )
}

function GenderChoice ({id, icon, label, onSelect, isSelected}) {
  const style = isSelected ? {color : 'orange'} : {}

  return (
    <div key={id} className="picker-choice">
      <label htmlFor={"gender-" + id}>
        <input type="radio" className="choice-radio" checked={isSelected} name="gender-choice" id={"gender-" + id} value={id} onChange={() => onSelect(id)} />
        <div className="gender-choice" style={style} onClick={onSelect}>
          <FontAwesomeIcon style={style} icon={icon}></FontAwesomeIcon>
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
