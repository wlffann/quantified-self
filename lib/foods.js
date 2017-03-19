$('document').ready(function() {

  loadTheFoodItems("#foods-list")

  $("#add-food").on('click', function() {
    clearErrors();

    var name = getName();
    var calories = getCalories();

    if (validFood(name, calories)){return;}

    addFoodToTable(name, calories, "#foods-list");
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

function validFood(name, calories){
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

function getName(){
  return $('#name-field input').val();
}

function getCalories(){
  return $('#calories-field input').val();
}

function addFoodToTable(name, calories, tableName, meal = ""){
  formatFoodItemTable(name, calories, tableName, meal);
  storeFoodItems(name, calories, tableName);
  clearText();
}

function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

function storeFoodItems(name, calories, tableName){
  if (tableName != "#foods-list"){return;}
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

function loadTheFoodItems(tableName) {
  var foodItems = JSON.parse(localStorage.getItem("food-items"));
  if(foodItems != null) {
    foodItems.forEach(function(element){
      formatFoodItemTable(element.name, element.calories, tableName)
      return true;
    });
  };
};

function get_page(){
  return document.location.href.match(/[^\/]+$/)[0]
}

function formatFoodItemTable(name, calories, tableName, meal) {
  var checkbox = `<td><input type="checkbox" class="food-checkbox" value="" unchecked></td>`
  if (tableName != "#foods-list" || get_page() != "index.html"){ checkbox = "";}
  var foodRow = `<tr class='food-row'> 
  ` + checkbox + `
  <td class='food-name'>` + name + `</td>
  <td class='food-calories'>` + calories + `</td>
  <td class='food-delete'><button>-</button></td>
  </tr>`

  $("tbody" + tableName).prepend(foodRow);
  if (tableName == "#foods-list"){
    addDeleteFunctionality();
  }
  else {
    addDeleteFromMealFunctionality(meal);
  }
}

function addDeleteFromMealFunctionality(meal){
  $("td.food-delete button").on('click', function(){
    var day = set_date(); 
    var foodName = findFoodNameFromRow(this);
    var datesJSON = localStorage.getItem("foods_by_days_and_meals");
    var dates = JSON.parse(datesJSON);
    for(var i = 0; i < dates[day][meal].length ; i++){
      if (dates[day][meal][i].name == foodName){
        dates[day][meal].splice(i, 1);
      }
    }
    localStorage.setItem("foods_by_days_and_meals", JSON.stringify(dates));
    $(this).parentsUntil("tbody").remove();
  })
}

function findFoodNameFromRow(that){
  var row = $(that).parentsUntil("tbody");
  return row[1].firstElementChild.innerHTML; 
}

function addDeleteFunctionality(){
  $("td.food-delete button").on('click', function(){
    var foodName = findFoodNameFromRow(this);
    var foodItems = JSON.parse(localStorage.getItem("food-items"));
  for (var i = 0; i < foodItems.length; i++) {
    var foodItem = foodItems[i];
      if(foodItem.name === foodName) {
        foodItems.splice(i, 1);
      }
    }
    foodItemsJSON = JSON.stringify(foodItems);
    localStorage.setItem('food-items', foodItemsJSON);
    $(this).parentsUntil("tbody").remove();
  })
}
