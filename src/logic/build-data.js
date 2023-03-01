const path = require('path')
let csvToJson = require('convert-csv-to-json');

let fileInputName = path.join(__dirname, 'movies.csv'); 
let fileOutputName = path.join(__dirname, '../../server/movies.json');

csvToJson
  .fieldDelimiter(',')
  .supportQuotedField(true)
  .generateJsonFileFromCsv(fileInputName,fileOutputName);