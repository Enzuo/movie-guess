export function reverseMap(array, cb){
  let output = []
  for(let i=array.length-1; i >= 0; i--){
    let result = cb(array[i], i)
    output.push(result)
  }
  return output
}