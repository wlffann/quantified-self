$(document).ready( function() {
  var today = "2/14/2007";
  var todaysMeals = loadTodaysMeals(today);
  
  $.map(todaysMeals, function(mealFoods, mealName) {
    addTotalCaloriesToMeal(mealFoods, mealName);
  });
});

function addTotalCaloriesToMeal(mealFoods, mealName) {
  var tableName = '.' + mealName + '-list table tfoot';
  var $table = $(tableName);
  var totalCalories = calculateMealsTotalCalories(mealFoods);
  $table.find('.total-calories .value').text(totalCalories);
};

function calculateMealsTotalCalories(meal) {
  var totalCalories = 0
  $.grep(meal, function(foodData) {
    totalCalories += Number(foodData.calories);
  });
  return totalCalories;
};

function loadTodaysMeals(today) {
  var currentMeals = loadMealItems();
  return currentMeals[today];
};

function loadMealItems() {
  var meals = localStorage.getItem('food_by_days_and_meal');
  return JSON.parse(meals)
};
