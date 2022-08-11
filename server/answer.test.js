
import { checkProposition } from "./answer"

const titles = ['mr bean', 'Ultimate disaster', 'Bean: The Movie']

test('wrong proposition', () => {
  let result = checkProposition('hi world',titles)
  expect(result).toBe(0)
});

test('proposition with small typo', () => {
  let result = checkProposition('mr baen',titles)
  expect(result).toBe(3)
});

test('proposition with small typo on a small word', () => {
  let result = checkProposition('m bean',titles)
  expect(result).toBe(3)
});

test('proposition with small typo on a small word 2', () => {
  let result = checkProposition('rm bean',titles)
  expect(result).toBe(2)
});

test('proposition with twice a word', () => {
  let result = checkProposition('mr mr mr bean',titles)
  expect(result).toBe(3)
});

test('right proposition', () => {
  let result = checkProposition('mr bean',titles)
  expect(result).toBe(3)
});

test('alternative title right', () => {
  let result = checkProposition('ultimate disaster',titles)
  expect(result).toBe(3)
});

test('alternative title with typo', () => {
  let result = checkProposition('ultimate defender',titles)
  expect(result).toBe(2)
});