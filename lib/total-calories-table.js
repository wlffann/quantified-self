function getMealTotals(){
    var date = setDate();
    var todaysMeals = loadTodaysMeals(date);
    var totalCalories = 0;
    $.map(todaysMeals, function(mealFoods){
      totalCalories += calculateMealsTotalCalories(mealFoods);
    })
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

function styleRemainingTotal(remainingCalories) {
  if(remainingCalories < 0){
    $('.total-table').find("#remaining").text(remaining).css('color', 'red');
  } else if(remainingCalories > 0){
    $('.total-table').find('#remaining').text(remaining).css('color', 'green');
  }
}