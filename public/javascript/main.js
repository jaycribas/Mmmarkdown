$(document).ready(function(){
  $('#editor').bind('keydown keyup keypress', function (){
    $('#preview').html(marked(this.value) || 'markdown preview')
  })

  $('.saveMarkdown').bind('click', function() {
    const example = document.getElementById('editor').value.match(/\w+/)
    const markdownText = document.getElementById('editor').value
    const fileName = window.prompt('Save file as...', example)
    if (fileName === '') {
      window.alert('invalid file name')
    } else {
      const headers = new Headers({'Content-Type':'application/json'})
      $.ajax('/api/savingMarkdown', {
        method: 'post',
        headers,
        body: JSON.stringify({ fileData: markdownText, fileName })
      })
      window.location.reload()
    }
  })

  $('.file').click(function(){
    const file = $(this).attr('id')
    $('.fileName').text(file)
    $.ajax({
      method: 'GET',
      url: `/server/data/${file}`,
      dataType: 'json',
      success: function(responseJson){
        $('#editor').val(responseJson.data)
        $('#preview').html(marked(responseJson.data))
      }
    })
  })

})
