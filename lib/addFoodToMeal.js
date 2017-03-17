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

function load_meals(){
  var day = set_date();
  var datesJSON = localStorage.getItem("foods_by_days_and_meals");
  var dates = JSON.parse(datesJSON);
  var date = dates[day];
  load_foods(date["breakfast"], "breakfast");
  load_foods(date["lunch"], "lunch");
  load_foods(date["dinner"], "dinner");
  load_foods(date["snacks"], "snacks");
}

function load_foods(foods, meal){
  for(var i = 0; i < foods.length; i++){
    var name      = foods[i].name;
    var calories  = foods[i].calories;
    addFoodToTable(name, calories, ("#" + meal + "-list"), meal);
  }
}

function storeFoodToMeal(name, calories, meal){
  var date = set_date();
  var food = new Food(name, calories)
  var datesJSON = localStorage.getItem("foods_by_days_and_meals");
  var dates = JSON.parse(datesJSON);
  
  dates[date][meal].push(food);
  localStorage.setItem("foods_by_days_and_meals", JSON.stringify(dates));
}