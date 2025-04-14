const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Nime is Runnnig!')
})

app.listen(port, () => {
  console.log(`Nime app listening on port ${port}`)
})