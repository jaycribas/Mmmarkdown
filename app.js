require('dotenv').config({path: './config/.env'})
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/routes')
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.port || 3000
app.listen(port, () => {
  console.log(`on port ${port}`)
})

app.use('/', routes)
app.use('/', express.static(path.join(__dirname, 'public')))
