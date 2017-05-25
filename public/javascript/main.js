$(document).ready(function(){

  $('#editor').bind('keydown keyup keypress', function (){
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
    }
  })

  $('.file').click(function(){
    const file = $(this).attr('id')
    $('.fileName').text(file)
    $('.file').removeClass('current-file')
    $(this).toggleClass('current-file')
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
