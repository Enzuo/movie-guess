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



export function evaluateProposition(proposition, rightAnswer){
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
  const { matchScore } = result
  const matchLength = answerWords.map(a => a.length)
  let totalLength = matchLength.reduce((l, a) => l + a, 0)
  let totalScore = matchLength.reduce((score, a, i) => score + a * matchScore[i], 0)
  const RIGHTSCORE = 0.7
  return {
    proposition,
    score : totalScore/totalLength,
    matchScore: matchScore,    
    matchLength: answerWords.map(a => a.length),
    rightWords: result.matchScore.reduce((str, score, i) => score >= RIGHTSCORE ? str.concat(answerWords[i]) : str, []).join(' '),
    missingWords: result.matchScore.reduce((str, score, i) => score < RIGHTSCORE ? str.concat(answerWords[i]) : str, []).join(' '),
  }
}

/**
 * 
 * @param {*} proposition 
 * @param {*} answers 
 * @returns {number} 0 really far
 *          1 some similarity
 *          2 similar
 *          3 correct
 */
export function checkProposition(proposition, answers){
  let possibleAnswers 
  let answer = answers[0]
  const { score } = evaluateProposition(proposition, answer)
  console.log(proposition, score)
  if(score > 0.8) {
    return 3
  }
  if(score > 0.2){
    return 2
  }
  return 0
}

export default { checkProposition }