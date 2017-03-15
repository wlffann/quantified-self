$(document).ready(function() {
  $('tbody').on('click', '.food-row td', function() { 
    var $td = $(this);
    var dataName = $td.attr('class');
    var currentFoods = JSON.parse(localStorage.getItem( "food-items" ));
    var food = findEditedFood(currentFoods, $td.text());
    currentFoods = pullOutEditedFood(currentFoods, food);
    var $input = replaceTdWithInput($td); 
    
    var save = function() {
      updateFood(food, dataName, $input.val());
      currentFoods.push(food);
      localStorage.setItem('food-items', JSON.stringify(currentFoods)); 
      $input.parent().remove();
      formatFoodItemTable(food.name, food.calories);
    };
    
    $input.one('blur', save).focus();
  });

});

function updateFood(food, dataName, newData){
  if (dataName === 'food-name') {  
    food.name = newData 
  } else {
    food.calories = newData
  }
};

function replaceTdWithInput($td) {
  var $input = $('<input/>').val($td.text());
  $td.replaceWith( $input ); 
  return $input;
};

function findEditedFood(currentFoods,foodData) {
  return $.grep(currentFoods, function(food) { 
    return food.name === foodData || food.calories === foodData; 
  })[0];
};

function pullOutEditedFood(currentFoods,food){
  return $.grep(currentFoods, function(notFood) {
    return notFood != food;
  });
};

