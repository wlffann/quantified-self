describe('#total-calories', function() {
  var $;

  before(function() {
    localStorage.clear();
    $ = document.getElementById("diary-frame").contentWindow.$;
    var mealDay = createMealDay();
    var currentDate = $('.current-date').text().trim();
    var foodDays = {};
    foodDays[currentDate] = mealDay;
    localStorage.setItem("foodsByDaysAndMeals", JSON.stringify(foodDays));
  })

  after(function(){
    localStorage.clear();
  })

  context('meal with food', function() {
    it ('calculates the total calories for a meal', function () {
      getPage("../index.html", function(){
        var totalBreakfastCalories = $('.breakfast-list tfoot .total').text();
        assert.equal(totalBreakfastCalories, "136")
      });
    });
    it ('calculates the remaining calories for a meal', function() {
      getPage("../index.html", function(){
        var remainingBreakfastCalories = $('.breakfast-list tfoot .difference').text();
        assert.equal(remainingBreakfastCalories, "264")
      });
    });
  });
})
