$('document').ready(function() {

  loadTheFoodItems()

  $("#add-food").on('click', function() {
    clear_errors();

    var name = get_name();
    var calories = get_calories();

    check_for_name(name)
    check_for_calories(calories)

    if (valid_food(name, calories)){return;}

    add_food_to_table(name, calories);
  });
})

function check_for_name(name) {
  if (name == ""){
    $('#name-field .validation-error').html('Please Enter a Name');
  }
}

function check_for_calories(calories) {
  if (calories == ""){
    $('#calories-field .validation-error').html('Please Enter Calories');
  }
}

function clear_errors(){
  $('#name-field .validation-error').empty();
  $('#calories-field .validation-error').empty();
}

function valid_food(name, calories){
  check_for_name(name)
  check_for_calories(calories)
  return (name == "" || calories == "");
}

function clear_text(){
  $('#name-field input').val(null);
  $('#calories-field input').val(null);
}

function clear_errors(){
  $('#name-field .validation-error').empty();
  $('#calories-field .validation-error').empty();
}

function add_delete_functionality(){
  $("td.food-delete button").on('click', function(){
    $(this).parentsUntil("tbody").remove();
  })
}

function get_name(){
  return $('#name-field input').val();
}

function get_calories(){
  return $('#calories-field input').val();
}

function add_food_to_table(name, calories){
  formatFoodItemTable(name, calories)
  storeFoodItems(name, calories)
  clear_text();
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
  add_delete_functionality();
}
