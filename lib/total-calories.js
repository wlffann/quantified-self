$(document).ready( function() {
  var today = "2/14/2007";
  var todaysMeals = loadTodaysMeals(today);
  
  $.map(todaysMeals, function(mealFoods, mealName) {
    addTotalCaloriesToMeal(mealFoods, mealName);
    addRemainingCaloriesToMeal(mealFoods, mealName);
  });
});

function findTable(mealName) {
  var tableName = '.' + mealName + '-list table tfoot';
  return $(tableName);
};

function addTotalCaloriesToMeal(mealFoods, mealName) {
  var $table = findTable(mealName);
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

function calculateMealsRemainingCalories(totalCalories) {
  return 200 - totalCalories;
};


function addRemainingCaloriesToMeal(mealFoods, mealName) {
  var $table = findTable(mealName);
  var totalCalories = calculateMealsTotalCalories(mealFoods);
  var remainingCalories = calculateMealsRemainingCalories(totalCalories);
  $table.find('.remaining-calories .value').text(remainingCalories);
};

function loadTodaysMeals(today) {
  var currentMeals = loadMealItems();
  return currentMeals[today];
};

function loadMealItems() {
  var meals = localStorage.getItem('food_by_days_and_meal');
  return JSON.parse(meals)
};
