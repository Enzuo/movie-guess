import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AvatarPicker.css'


export default function AvatarPicker ({ options, value, onPick }) {

  function handleSelect(index){
    onPick(index)
  }

  return (
    <div>
      <div>
        {options.map((a, i) => (
          <AvatarChoice id={i} key={i} onSelect={() => handleSelect(i)} isSelected={value === i} {...a}>

          </AvatarChoice>
        ))}
      </div>
    </div>
  )
}


function AvatarChoice ({icon, isSelected, onSelect}) {
  const style = isSelected ? {color : 'orange'} : {}

  return (
    <div className="avatar-choice" onClick={onSelect}>
      <FontAwesomeIcon style={style} icon={icon}></FontAwesomeIcon>
    </div>
  )
}
