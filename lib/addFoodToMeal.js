$(document).ready(function() {
  loadMeals();
  $(".meal-buttons").on("click","#breakfast-button, #lunch-button, #dinner-button, #snacks-button", function(){
    var meal = this.firstChild.data.toLowerCase();
    addFoods(meal);
    $(".food-checkbox").prop("checked", false);
  })
})

function setDate(){
  var dateJSON = localStorage.getItem("currentDate");
  return JSON.parse(dateJSON);
}

function addFoods(meal){
  $("#foods-list").children().each(function() {
    var checked = $(this).find("input[type='checkbox']").is(":checked");
    if (checked) {
      var name      = $(this).find(".food-name").text();
      var calories  = $(this).find(".food-calories").text();
      storeFoodToMeal(name, calories, meal);
      refreshTotalsCount();
      addFoodToTable(name, calories, ("#" + meal + "-list"), meal);
    }
  })
}

function refreshTotalsCount(){
  addCaloriesToTable();
  addCaloriesToTotalTable();
}

function getMeals(){
  return ["breakfast", "lunch", "dinner", "snacks"];
}

function loadMeals(){
  var day = setDate();
  var dates = getDatesFromLocalStorage();
  var date = dates[day];
  var meals = getMeals();
  for(var i = 0; i < meals.length; i++){
    loadFoods(date, meals[i])
  }
}

function loadFoods(date, meal){
  clearMealTables(meal);
  var foods = date[meal];
  for(var i = 0; i < foods.length; i++){
    var name      = foods[i].name;
    var calories  = foods[i].calories;
    addFoodToTable(name, calories, ("#" + meal + "-list"), meal);
  }
}

function clearMealTables(meal){
  $("#" + meal + "-list").empty();
}

function storeFoodToMeal(name, calories, meal){
  var day = setDate();
  var food = new Food(name, calories)
  var dates = getDatesFromLocalStorage()
  dates[day][meal].push(food);
  setDatesToLocalStorage(dates);
}

function getDatesFromLocalStorage(){
  var datesJSON = localStorage.getItem("foodsByDaysAndMeals");
  return JSON.parse(datesJSON);
}

function setDatesToLocalStorage(dates){
  localStorage.setItem("foodsByDaysAndMeals", JSON.stringify(dates));
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
    refreshTotalsCount();
    $(this).parentsUntil("tbody").remove();
  })
}