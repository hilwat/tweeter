$(document).ready(function() {
  $('form textarea').on('input', function () {
    var length = $(this).val().length
    var displaylength = 140 - length;
    $(this).siblings('.counter').text(displaylength);
    if(displaylength < 0){
      $(this).siblings('.counter').css({ 'color': 'red'});
    } else {
       $(this).siblings('.counter').css({ 'color': 'black'});
    }
  });
});