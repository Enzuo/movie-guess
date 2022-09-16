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

export function saveUser(user, users){
  let indexUser = users.findIndex(u => u.id === user.id)
  if(indexUser >= 0){
    users[indexUser] = user
  }
  else {
    users.push(user)
  }
  
  return users
}