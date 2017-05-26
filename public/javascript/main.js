$(document).ready(function(){

  $('#editor').bind('keydown keyup keypress', function (){
    if (!this.value) {
      $('.wordCounter').text('0 words')
    }
    if (this.value) {
      $('.wordCounter').text(this.value.match(/\S+/g).length + ' words')
    }
    $('#preview').html(marked(this.value))
  })

  $('.saveMarkdown').bind('click', function() {
    let example = $('.fileName').text().match(/\w+/)
    const markdownText = $('#editor').val()
    const fileName = window.prompt('Save file as...', example)
    if (example === 'mmmarkdown') {
      example = $('#editor').val().match(/\w+/)
    }
    if (fileName === '') {
      window.alert('invalid file name')
    } else if (!fileName) {
      return
    } else {
      $.ajax({
        url: '/api/savingMarkdown',
        method: 'post',
        data: { fileData: markdownText, fileName },
        dataType: 'html'
      })
      window.location.reload()
    }
  })

  $('.file').click(function(){
    const file = $(this).attr('id') || 'mmmarkdown.md'
    document.cookie = 'most-recent='+file
    $('.fileName').text(file)
    $('.file').removeClass('current-file')
    $(this).toggleClass('current-file')
    if (file === 'mmmarkdown.md') {
      $('#editor').val('')
      $('#preview').empty()
      $('.wordCounter').text('0 words')
    } else {
      $.ajax({
        method: 'GET',
        url: `/server/data/${file}`,
        dataType: 'json',
        success: function(responseJson){
          $('#editor').val(responseJson.data)
          $('#preview').html(marked(responseJson.data))
          $('.wordCounter').text($('#editor').val().match(/\S+/g).length + ' words')
        }
      })
    }
  })

})
