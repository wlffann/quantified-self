describe("#date-carousel", function() {
  var $;

  before(function(){
    $ = document.getElementById("diary-frame").contentWindow.$;
  });

  beforeEach(function() {
    var currentDate = moment().format("MMMM Do, YYYY");
    $('.current-date').html(currentDate);
    console.log($('.current-date').html());
  });

  context("When a user visits the index page", function(){
    it ("they see todays date", function(){
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });

    it ("a date is added to foods_by_days_and_meals in localStorage", function(){
      var expectedCurrentDate = moment().format("MMMM Do, YYYY");
      var datesJSON = localStorage.getItem(foods_by_days_and_meals);
      var dates = JSON.parse(datesJSON);
      var meals = dates[expectedCurrentDate];
      var breakfast = meals["breakfast"];

      assert.equal(dates.length, 1);
      assert.equal(meals.length, 4);
      assert.equal(meals.length, 4);
      assert.equal(breakfast.length, 0);
    });
  });

  context("When a user visits clicks on the foreward button", function(){
    it ("they see tommorows date", function(){
      $(".day-foreward").click();
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().add(1, 'days').format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });

    xit ("a date is added to foods_by_days_and_meals in localStorage", function(){
      var expectedCurrentDate = moment().add(1, 'days').format("MMMM Do, YYYY");
      var datesJSON = localStorage.getItem(foods_by_days_and_meals)
      var dates = JSON.parse(datesJSON);
    });


    it ("they can see 2 days ahead", function(){
      $(".day-foreward").click();
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().add(2, 'days').format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });

  });

  context("When a user visits clicks on the backward button", function(){
    it ("they see the prevous days date", function(){
      $(".day-backward").click();
      $(".day-backward").click();
      $(".day-backward").click();
      
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().add(-1, 'days').format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });

    it ("they can see 2 days behind", function(){
      $(".day-backward").click();
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().add(-2, 'days').format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });
  });

  // context("When a user clicks on the foreward button", function(){
  //   it("they see the foods they will eat on the next day", function(){
  //     var currentDate = moment().add(1, 'days').format("MMMM Do, YYYY")
  //     var datesJSON = localStorage.getItem("foods_by_days_and_meals");
  //     var dates = 
  //     if(foodItemsJSON === null){
  //   foodItemsJSON = '[]';
  // }
  // var currentFoodItems = JSON.parse(foodItemsJSON)
  //     var foods = dates.
  //   })
  // });
});
