$(document).ready(function(){

  $('#editor').bind('keydown keyup keypress', function (){
    $('#preview').html(marked(this.value) || 'markdown preview')
  })

  $('.saveMarkdown').bind('click', function() {
    const example = document.getElementById('editor').value.match(/\w+/)
    
    const markdownText = document.getElementById('editor').value
    const fileName = window.prompt('Save file as...', example)
    if (fileName === '' || !example) {
      window.alert('invalid file name')
    } else {
      const headers = new Headers({'Content-Type':'application/json'})
      fetch('/api/savingMarkdown', {
        method: 'post',
        headers,
        body: JSON.stringify({ fileData: markdownText, fileName })
      })
      window.location.reload()
    }
  })

})
