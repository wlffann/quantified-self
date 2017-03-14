$(document).ready(function() {
  $('body').on('click', '.food-row td', function() { 
    var $td = $(this);
    var food = localStorage.getItem( $td.text() );
    var $input = $('<input/>').val( $td.text() );
    $td.replaceWith( $input );
    
    var save = function() {
      localStorage.setItem($input.val(), `<tr class='food-row'>
                <td class='food-name'>` + $input.val() + `</td>
                <td class='food-calories'>` + $input.siblings().first().text()  + `</td>
                <td class='food-delete'><button>-</button></td>
              </tr>`); 
      var $td = localStorage.getItem($input.val());
      $input.parent().remove();
      $('#food-list tbody').prepend($td);
    };
    
    $input.one('blur', save).focus();
    localStorage.removeItem($td.text());
  });
});

