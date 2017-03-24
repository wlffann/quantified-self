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
  var id = storeFoodItems(name, calories, tableName);
  formatFoodItemTable(id, name, calories, tableName, meal);
  clearText();
}

function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

function storeFoodItems(name, calories, tableName){
  if (tableName != "#foods-list"){return;}
  $.ajax({
    url: 'http://localhost:3000/foods',
    method: 'POST',
    data: {'food': {'name': name, 'calories': calories}}
  }).done(function(data){
    return data.id;
  }).fail(function(error){
    console.error(error);
  });
}

function loadTheFoodItems(tableName) {
  $.ajax({
    url: 'http://localhost:3000/foods',
    method: 'GET'
  }).done(function(data){
    data.forEach(function(element){
      formatFoodItemTable(element.id, element.name, element.calories, tableName)
    })
  }).fail(function(error){
    console.error(error); 
  });
};

function getPagePath(){
  return document.location.href.match(/[^\/]+$/)[0]
}

function formatFoodItemTable(id, name, calories, tableName, meal) {
  var checkbox = `<td><input type="checkbox" class="food-checkbox" value=""></td>`
  if (tableName != "#foods-list" || getPagePath() != "index.html"){ checkbox = "";}
  var foodRow = `<tr class='food-row'> 
  ` + checkbox + `
  <td class='food-id'>` + id + `</td>
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
    var day = setDate(); 
    var foodName = findFoodNameFromRow(this);
    var datesJSON = localStorage.getItem("foodsByDaysAndMeals");
    var dates = JSON.parse(datesJSON);
    for(var i = 0; i < dates[day][meal].length ; i++){
      if (dates[day][meal][i].name == foodName){
        dates[day][meal].splice(i, 1);
      }
    }
    localStorage.setItem("foodsByDaysAndMeals", JSON.stringify(dates));
    $(this).parentsUntil("tbody").remove();
  })
}

function findFoodIdFromRow(that){
  var row = $(that).parentsUntil("tbody");
  return row[1].firstElementChild.innerHTML; 
}

function addDeleteFunctionality(){
  $("td.food-delete button").on('click', function(){
    var id = findFoodIdFromRow(this);
    console.log(id)
    $.ajax({
      url: 'http://localhost:3000/foods/' + id,
      method: 'DELETE'
    }).done(function(data){
      console.log(data)
    }).fail(function(error){
      console.error(error);
    });
    $(this).parentsUntil("tbody").remove();
  })
}
