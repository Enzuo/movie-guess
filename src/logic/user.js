let uniqueId = 0;

export const GENDERS = [{ label : '♀️' }, {label: '♂️'}, {label: '⚧️'}]

export function createUser() {
  return {
    id : uniqueId++,
    name : '',
    gender : null,
    age : null,
  }
}