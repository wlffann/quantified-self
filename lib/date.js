$('document').ready(function(){
  var currentDate = moment();
  $(".current-date").append(currentDate.format("MMMM Do, YYYY"));
  var foods_by_days_and_meals = new Day(currentDate.format("MMMM Do, YYYY"));
  localStorage.setItem("foods_by_days_and_meals", JSON.stringify(foods_by_days_and_meals));

  $(".day-foreward").on("click", function(){
    currentDate = currentDate.add(1, 'days');
    $(".current-date").html(currentDate.format("MMMM Do, YYYY"));
  });
  $(".day-backward").on("click", function(){
    currentDate = currentDate.add(-1, 'days');
    $(".current-date").html(currentDate.format("MMMM Do, YYYY"));
  });
})

class Day {
  constructor(currentDate) {
    this[currentDate] = new Meal();
  }
}

class Meal {
  constructor(){
    this.breakfast  = [];
    this.lunch      = [];
    this.snack      = [];
    this.dinner     = [];
  }
}