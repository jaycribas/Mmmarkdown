const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.render('index')
})

app.set('view engine', 'pug')

app.listen(3000)

app.use('/', express.static('public'))
app.use('/scripts', express.static(__dirname + '/node_modules/marked/lib/'))
