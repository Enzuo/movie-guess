let uniqueId = 0;

export function createUser() {
  return {
    id : uniqueId++,
    name : '',
    gender : null,
    age : null,
  }
}