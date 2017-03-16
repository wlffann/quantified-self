describe('#total-calories', function() {
  var $;

  before(function() {
    $ = document.getElementById("diary-frame").contentWindow.$;
    localStorage.clear();
    var mealDay = createMealDay();
    var currentDate = $('.current-date').text().trim();
    var foodDays = {};
    foodDays[currentDate] = mealDay;
    localStorage.setItem("food_by_days_and_meal", JSON.stringify(foodDays));
  })
  
  context('meal with food', function() {
    it ('calculates the total calories for a meal', function () {
      var totalBreakfastCalories = $('.breakfast-list tfoot .total').text();
      assert.equal(totalBreakfastCalories, "136")
    });
    it ('calculates the remaining calories for a meal', function() {
      var remainingBreakfastCalories = $('.breakfast-list tfoot .difference').text();
      assert.equal(remainingBreakfastCalories, "264")
    });
  });
})
