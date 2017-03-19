function getMealTotals(){
    var date = set_date();
    console.log(date);
    var todaysMeals = loadTodaysMeals(date);
    console.log(todaysMeals);
    var totalCalories = 0;
    $.map(todaysMeals, function(mealFoods){
      totalCalories += calculateMealsTotalCalories(mealFoods);
    })
    console.log(totalCalories);
    return totalCalories;
  }

function addCaloriesToTotalTable(){
  var consumedCalories = getMealTotals();
  addRemainingCaloriesToTotalsTable(consumedCalories);
  addConsumedCaloriesToTotalsTable(consumedCalories)
}

function addRemainingCaloriesToTotalsTable(consumedCalories){
  var startingCalories  = 2000;
  var remainingCalories = startingCalories - consumedCalories;
  $("#remaining").empty().text(remainingCalories);
}

function addConsumedCaloriesToTotalsTable(consumedCalories){
  $("#consumed").empty().text(consumedCalories);
}