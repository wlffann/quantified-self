function addCaloriesToTable() {
  var date = $('.current-date').text().trim();
  var todaysMeals = loadTodaysMeals(date);
  $.map(todaysMeals, function(mealFoods, mealName) {
    addTotalCaloriesToMeal(mealFoods, mealName);
    addRemainingCaloriesToMeal(mealFoods, mealName);
  })
}

function findTable(mealName) {
  var tableName = '.' + mealName + '-list table tfoot';
  return $(tableName);
};

function addTotalCaloriesToMeal(mealFoods, mealName) {
  var $table = findTable(mealName);
  var totalCalories = calculateMealsTotalCalories(mealFoods);
  $table.find('.total').empty().text(totalCalories);
};

function calculateMealsTotalCalories(meal) {
  var totalCalories = 0
  $.grep(meal, function(foodData) {
    totalCalories += Number(foodData.calories);
  });
  return totalCalories;
};

function calculateMealsRemainingCalories(totalCalories, mealName) {
  var goalTotal = findGoalTotal(mealName);
  return goalTotal - totalCalories;
};

function findGoalTotal(mealName) {
  switch(mealName) {
    case 'breakfast':
      return 400;
    case 'lunch':
      return 600;
    case 'dinner':
      return 800;
    case 'snacks':
      return 200;
  }
};

function addRemainingCaloriesToMeal(mealFoods, mealName) {
  var $table = findTable(mealName);
  var totalCalories = calculateMealsTotalCalories(mealFoods);
  var remainingCalories = calculateMealsRemainingCalories(totalCalories, mealName);
  $table.find('.difference').empty().text(remainingCalories);
  styleRemainingTotal(remainingCalories, $table);
};

function styleRemainingTotal(remaining, $table) {
  if(remaining < 0){
    $table.find('.difference').text(remaining).css('color', 'red');
  } else if(remaining > 0){
    $table.find('.difference').text(remaining).css('color', 'green');
  }; 
};

function loadTodaysMeals(date) {
  var currentMeals = loadMealItems();
  return currentMeals[date];
};

function loadMealItems() {
  var meals = localStorage.getItem('food_by_days_and_meal');
  return JSON.parse(meals)
};
