let uniqueId = 0;

import { faGenderless, faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { faCameraRetro, faClapperboard, faWhiskeyGlass, faFilm } from '@fortawesome/free-solid-svg-icons'


export const GENDERS = [{ 
  label : 'male', 
  icon : faMars,
},{
  label: 'female',
  icon: faVenus,
},{
  label: 'other',
  icon: faGenderless,
}]

export const AVATARS = [{
  icon : faCameraRetro,
}, {
  icon : faClapperboard,
}, {
  icon : faWhiskeyGlass,
}, {
  icon : faFilm,
}]

export function createUser() {
  return {
    id : uniqueId++,
    name : 'username',
    gender : null,
    age : null,
  }
}


/**
 * Update or Create user
 * https://beta.reactjs.org/learn/updating-arrays-in-state
 * @param {*} user 
 * @param {*} users 
 * @returns 
 */
export function saveUser(user, users){
  let indexUser = users.findIndex(u => u.id === user.id)
  if(indexUser >= 0){
    return users.map((u) => u.id === user.id ? {...user} : u)
    // users[indexUser] = {...user}
  }
  else {
    users.push(user)
  }
  
  return users
}