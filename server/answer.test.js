
import { checkProposition } from "./answer"

const titles = ['mr bean', 'Ultimate disaster', 'Bean: The Movie']

test('wrong proposition', () => {
  let result = checkProposition('hi world',titles)
  console.log(result)
});

test('proposition with small typo', () => {
  let result = checkProposition('mr baen',titles)
  console.log(result)
});

test('proposition with small typo on a small word', () => {
  let result = checkProposition('m bean',titles)
  console.log(result)
});

test('proposition with small typo on a small word', () => {
  let result = checkProposition('rm bean',titles)
  console.log(result)
});

test('proposition with twice a word', () => {
  let result = checkProposition('mr mr mr bean',titles)
  console.log(result)
});

test('right proposition', () => {
  let result = checkProposition('mr bean',titles)
  console.log(result)
});