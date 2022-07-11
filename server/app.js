import express from 'express'

const app = express()
const port = 5000

app.get('/api/hi', (req, res) => {
  res.json({ text: 'hello world' });
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

export const handler = app