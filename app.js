const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send('blah')
})

app.listen(3000)
