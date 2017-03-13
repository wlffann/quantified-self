$('document').ready( function() {
  $('body').on('click', '.food-row td', function() { 
    var $el = $(this);
    var $input = $('<input/>').val( $el.text() );
    $el.replaceWith( $input );
    
    var save = function() {  
      var $td = $('<td />').text($input.val() );
      $input.replaceWith($td);
    };

    $input.one('blur', save).focus();
  });
})
