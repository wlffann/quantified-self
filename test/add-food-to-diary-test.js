describe('#add-food-to-diary', function() {
  var $;

  before(function(){
    $ = document.getElementById("diary-frame").contentWindow.$;
    add_day();
  })

  after(function(){
    localStorage.removeItem('food-items');
  })

  context("When a user click a meal", function(){
    it("all foods with checked boxes get added to localStorage", function(){
      localStorage.setItem('food-items', JSON.stringify([new Food("apple", 10)]));
      
      var food = $("#foods-list").children().last()
      var expectedName      = $(food).find(".food-name").text();
      var expectedCalories  = $(food).find(".food-calories").text();
      
      
      $("#breakfast-button").click();
      var expectedCurrentDate = moment().format("MMMM Do, YYYY");
      var datesJSON = localStorage.getItem("foods_by_days_and_meals");
      var dates = JSON.parse(datesJSON);
      var meals = dates[expectedCurrentDate];
      var breakfast = meals["breakfast"];
      console.log(breakfast);
      
      var actualName = breakfast[0].name;
      var actualCalories = breakfast[0].calories;
      
      assert.equal(actualName, expectedName)
      assert.equal(actualCalories, expectedCalories)
    })
  })
})