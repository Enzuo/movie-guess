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



export function checkAnswer(proposition, rightAnswer){
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
    missingWords: result.matchScore.reduce((str, score, i) => score < 0.5 ? str.concat(answerWords[i]) : str, []).join(' '),
  }
}

export default { checkAnswer }