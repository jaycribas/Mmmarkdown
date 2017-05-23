const express = require('express')
const router = express.Router()
const fs = require('fs')

router.post('/api/savingMarkdown' ,(request, response) => {
  const { fileData, fileName } = request.body
  fs.writeFile('../server/data/' + fileName + '.md', function(error) {
    if (error) throw error
  })
})

module.exports = router
