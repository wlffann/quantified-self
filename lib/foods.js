$('document').ready(function() {

  loadTheFoodItems()

  $("#add-food").on('click', function() {
    clearErrors();

    var name = getName();
    var calories = getCalories();

    checkForName(name)
    checkForCalories(calories)

    if (validName(name, calories)){return;}

    addFoodToTable(name, calories);
  });
})

function checkForName(name) {
  if (name == ""){
    $('#name-field .validation-error').html('Please Enter a Name');
  }
}

function checkForCalories(calories) {
  if (calories == ""){
    $('#calories-field .validation-error').html('Please Enter Calories');
  }
}

function validName(name, calories){
  checkForName(name)
  checkForCalories(calories)
  return (name == "" || calories == "");
}

function clearText(){
  $('#name-field input').val(null);
  $('#calories-field input').val(null);
}

function clearErrors(){
  $('#name-field .validation-error').empty();
  $('#calories-field .validation-error').empty();
}

function addDeleteFunctionality(){
  $("td.food-delete button").on('click', function(){
    var row = $(this).parentsUntil("tbody")
    var item = row[1].firstElementChild.innerHTML
    var foodItems = JSON.parse(localStorage.getItem("food-items"))
  for (var i = 0; i < foodItems.length; i++) {
    var foodItem = foodItems[i];
      if(foodItem.name === item) {
        foodItems.splice(i, 1);
      }
    }
    foodItemsJSON = JSON.stringify(foodItems);
    localStorage.setItem('food-items', foodItemsJSON);
    $(this).parentsUntil("tbody").remove();
  })
}

function getName(){
  return $('#name-field input').val();
}

function getCalories(){
  return $('#calories-field input').val();
}

function addFoodToTable(name, calories){
  formatFoodItemTable(name, calories)
  storeFoodItems(name, calories)
  clearText();
}

function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

function storeFoodItems(name,calories){
  var foodItemsJSON = localStorage.getItem("food-items");
  if(foodItemsJSON === null){
    foodItemsJSON = '[]';
  }
  var currentFoodItems = JSON.parse(foodItemsJSON);
  var data = new Food(name, calories)
  currentFoodItems.push(data);

  foodItemsJSON = JSON.stringify(currentFoodItems);
  localStorage.setItem('food-items', foodItemsJSON);
}

function loadTheFoodItems() {
  var foodItems = JSON.parse(localStorage.getItem("food-items"));
  if(foodItems != null) {
    foodItems.forEach(function(element){
      formatFoodItemTable(element.name, element.calories)
      return true;
    });
  };
};

function formatFoodItemTable(name, calories) {
  var foodRow = `<tr class='food-row'>
  <td class='food-name'>` + name + `</td>
  <td class='food-calories'>` + calories + `</td>
  <td class='food-delete'><button>-</button></td>
  </tr>`

  $("tbody").prepend(foodRow);
  addDeleteFunctionality();
}
