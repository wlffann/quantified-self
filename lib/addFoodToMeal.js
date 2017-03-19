$(document).ready(function() {
  load_meals();
  $(".meal-buttons").on("click","#breakfast-button, #lunch-button, #dinner-button, #snacks-button", function(){
    var meal = this.firstChild.data.toLowerCase();
    add_foods(meal);
  })
})

function add_foods(meal){
  $("#foods-list").children().each(function() {
    var checked = $(this).find("input[type='checkbox']").is(":checked");
    if (checked) {
      var name      = $(this).find(".food-name").text();
      var calories  = $(this).find(".food-calories").text();
      storeFoodToMeal(name, calories, meal);
      addFoodToTable(name, calories, ("#" + meal + "-list"), meal);
    }
  })
}

function get_meals(){
  return ["breakfast", "lunch", "dinner", "snacks"];
}

function load_meals(){
  var day = set_date();
  var dates = getDatesFromLocalStorage()
  var date = dates[day];
  var meals = get_meals();
  for(var i = 0; i < meals.length; i++){
    load_foods(date, meals[i])
  }
}

function load_foods(date, meal){
  var foods = date[meal];
  for(var i = 0; i < foods.length; i++){
    var name      = foods[i].name;
    var calories  = foods[i].calories;
    addFoodToTable(name, calories, ("#" + meal + "-list"), meal);
  }
}

function storeFoodToMeal(name, calories, meal){
  var day = set_date();
  var food = new Food(name, calories)
  var dates = getDatesFromLocalStorage()
  dates[day][meal].push(food);
  setDatesToLocalStorage(dates);
}

function getDatesFromLocalStorage(){
  var datesJSON = localStorage.getItem("foods_by_days_and_meals");
  return JSON.parse(datesJSON);
}

function setDatesToLocalStorage(dates){
  localStorage.setItem("foods_by_days_and_meals", JSON.stringify(dates));
}