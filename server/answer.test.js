
import { checkAnswer } from "./answer"

const titles = ['mr bean', 'Ultimate disaster', 'Bean: The Movie']

test('wrong proposition', () => {
  let result = checkAnswer('hi world',titles[0])
  console.log(result)
});

test('proposition with small typo', () => {
  let result = checkAnswer('mr baen',titles[0])
  console.log(result)
});

test('proposition with small typo on a small word', () => {
  let result = checkAnswer('m bean',titles[0])
  console.log(result)
});

test('proposition with small typo on a small word', () => {
  let result = checkAnswer('rm bean',titles[0])
  console.log(result)
});

test('proposition with twice a word', () => {
  let result = checkAnswer('mr mr mr bean',titles[0])
  console.log(result)
});

test('right proposition', () => {
  let result = checkAnswer('mr bean',titles[0])
  console.log(result)
});