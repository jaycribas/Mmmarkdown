const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (request, response) => {
  fs.readdir('./server/data', (error, files) => {
    response.render('index', {files: files})
  })
})

router.get('/server/data/:file', (request, response) => {
  const { file } = request.params
  fs.readFile(`./server/data/${file}`, 'utf8', (error, data) => {
    response.json({data})
  })
})

router.post('/api/savingMarkdown', (request, response) => {
  const { fileData, fileName } = request.body
  fs.appendFile(`./server/data/${fileName}.md`, fileData, (error) => {
    if (error) throw error
  })
})

router.post('/api/delete/:file', (request, response) => {
  const { file } = request.params
  fs.unlink(`./server/data/${file}`, (error) => {
    if (error) throw error
  })
  response.redirect('/')
})

module.exports = router
