  describe('#total-calories', function() {
    var $;

    before(function() {
      $ = document.getElementById("diary-frame").contentWindow.$;
      localStorage.clear();
      var mealDay = createMealDay();
      localStorage.setItem("food_by_days_and_meal", JSON.stringify({"2/14/2007": mealDay}));
    })
    
    context('meal with food', function() {
      it ('calculates the total calories for a meal', function () {
        var totalBreakfastCalories = $('.breakfast-list tfoot .total-calories .value').text();
        assert.equal(totalBreakfastCalories, "136")
      });
      it ('calculates the remaining calories for a meal', function() {
        var remainingBreakfastCalories = $('.breakfast-list tfoot .remaining-calories .value').text();
        assert.equal(remainingBreakfastCalories, "64")
      });
    });
  })
