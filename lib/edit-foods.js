$(document).ready(function() {
  $('tbody').on('click', '.food-row td.food-name', function() { 
    var $td = $(this);
    var currentFoods = JSON.parse(localStorage.getItem( "food-items" ));
    var food = $.grep(currentFoods, function(food) { 
      return food.name === $td.text() || food.calories === $td.text(); 
    })[0];
    currentFoods = $.grep(currentFoods, function(notFood) {
      return notFood != food;
    });
    var $input = $('<input/>').val( $td.text() );
    $td.replaceWith( $input );
    
    var save = function() {
      food.name = $input.val();
      currentFoods.push(food);
      localStorage.setItem('food-items', JSON.stringify(currentFoods)); 
      $input.parent().remove();
      formatFoodItemTable(food.name, food.calories);
    };
    
    $input.one('blur', save).focus();
  });
});

