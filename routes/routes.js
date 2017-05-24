const express = require('express')
const router = express.Router()
const fs = require('fs')

router.post('/api/savingMarkdown' ,(request, response) => {
  const { fileData, fileName } = request.body
  fs.appendFile(`./server/data/${fileName}.md`, fileData,function(error) {
    if (error) throw error
  })
})

module.exports = router
