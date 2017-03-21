function getPage(page, onLoad) {
  document.getElementById("diary-frame").src = page;

  document.getElementById("diary-frame").onload = onLoad;
}

describe('#add-food-to-diary', function() {
  var $;

  before(function(){
    $ = document.getElementById("diary-frame").contentWindow.$;
    localStorage.clear();
  })

  after(function(){
    localStorage.removeItem('food-items');
  })

  context("When a user click a meal", function(){
    it("all foods with checked boxes get added to localStorage", function(){
      localStorage.setItem('food-items', JSON.stringify([new Food("apple", 10)]));
      
      getPage('../index.html', function() {
        var food = $("#foods-list").children().last();
        var expectedName      = $(food).find(".food-name").text();
        var expectedCalories  = $(food).find(".food-calories").text();
        $('.food-checkbox').prop('checked', true);
        
        $("#breakfast-button").click();
        var expectedCurrentDate = moment().format("MMMM Do, YYYY");
        var datesJSON = localStorage.getItem("foodsByDaysAndMeals");
        var dates = JSON.parse(datesJSON);
        var meals = dates[expectedCurrentDate];
        var breakfast = meals["breakfast"];
      
        var actualName = breakfast[0].name;
        var actualCalories = breakfast[0].calories;
        
        assert.equal(actualName, expectedName)
        assert.equal(actualCalories, expectedCalories)
      });  
    })
  })
})