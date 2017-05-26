$(document).ready(function(){

  $('#editor').bind('keydown keyup keypress', function (){
    if (!this.value) {
      $('.charCounter').text('0 characters')
    }
    if (this.value) {
      $('.charCounter').text(this.value.match(/\S/g).length + ' characters')
    }
    $('#preview').html(marked(this.value))
  })

  $('.saveMarkdown').bind('click', function() {
    const example = $('#editor').val().match(/\w+/)
    const markdownText = $('#editor').val()
    const fileName = window.prompt('Save file as...', example)
    if (fileName === '') {
      window.alert('invalid file name')
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
    $('.fileName').text(file)
    $('.file').removeClass('current-file')
    $(this).toggleClass('current-file')
    if (file === 'mmmarkdown.md') {
      $('#editor').val('')
      $('#preview').empty()
      $('.charCounter').text('0 characters')
    } else {
      $.ajax({
        method: 'GET',
        url: `/server/data/${file}`,
        dataType: 'json',
        success: function(responseJson){
          $('#editor').val(responseJson.data)
          $('#preview').html(marked(responseJson.data))
          $('.charCounter').text($('#editor').val().match(/\S/g).length + ' characters')
        }
      })
    }
  })



})
