$(document).ready(function(){

$('#editor').bind('keydown keyup keypress', function(){
  $('#preview').html(marked(this.value) || 'markdown preview')
})

})
