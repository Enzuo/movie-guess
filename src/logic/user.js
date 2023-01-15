let uniqueId = 0;

export const GENDERS = [{ label : '♀️' }, {label: '♂️'}, {label: '⚧️'}]

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