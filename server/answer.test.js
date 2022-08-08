
// import strCompare from "str-compare"
let similarity = require('sentence-similarity')
let similarityScore = require('similarity-score')
const { PerformanceObserver, performance } = require('node:perf_hooks');

// const obs = new PerformanceObserver((items) => {
//   console.log(items.getEntries()[0].duration);
//   performance.clearMarks();
// });
// obs.observe({ type: 'measure' });


let winkOpts = { f: similarityScore.winklerMetaphone, options : {threshold: 0} }



function checkAnswer(proposition, rightAnswer, previousPropositions){
  // performance.mark('A')
  let answerWords = rightAnswer.split(' ')
  let propositionWords = proposition.split(' ')

  let result = similarity(answerWords,propositionWords,winkOpts)
  // let result = similarity(propositionWords,answerWords,winkOpts)
  // console.log(result)
  // performance.measure('check Answer end', 'A')
  // console.log(performance.getEntriesByType('measure')[0].duration)
  // performance.clearMarks()
  // performance.clearMeasures()
  return {
    proposition,
    matchScore: result.matchScore,
    matchLength: answerWords.map(a => a.length),
    rightWords: result.matchScore.reduce((str, score, i) => score >= 0.5 ? str.concat(answerWords[i]) : str, []).join(' '),
    // wrongWords: ,
    missingWords: result.matchScore.reduce((str, score, i) => score < 0.5 ? str.concat(answerWords[i]) : str, []).join(' '),
  }
  
  // answerWords.forEach(word => {
  //   for (let i=0; i<)
  // });
}

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