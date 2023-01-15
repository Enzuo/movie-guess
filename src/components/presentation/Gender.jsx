import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Gender({options, index}) {
  if(index === null) return null
  return (
    <div><FontAwesomeIcon icon={options[index].icon}></FontAwesomeIcon>{options[index].label}</div>
  )
}