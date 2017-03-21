$(document).ready(function(){
  redirectToFoodPage();
  var todayDate = moment();
  $(".current-date").append(todayDate.format("MMMM Do, YYYY"));
  localStorage.setItem("currentDate", JSON.stringify(todayDate.format("MMMM Do, YYYY")));
  currentDate = todayDate;
  addDay();
  addCaloriesToTable();
  addCaloriesToTotalTable();


  $(".day-forward").on("click", function(){
    currentDate = currentDate.add(1, 'days');
    localStorage.setItem("currentDate", JSON.stringify(currentDate.format("MMMM Do, YYYY")));
    $(".current-date").html(currentDate.format("MMMM Do, YYYY"));
    addDay();
    addCaloriesToTable();
    addCaloriesToTotalTable();
    loadMeals();
  });

  $(".day-backward").on("click", function(){
    currentDate = currentDate.add(-1, 'days');
    localStorage.setItem("currentDate", JSON.stringify(currentDate.format("MMMM Do, YYYY")));
    $(".current-date").html(currentDate.format("MMMM Do, YYYY"));
    addDay();
    addCaloriesToTable();
    addCaloriesToTotalTable();
    loadMeals();
  });
})

function addDay(){
  var date = setDate();
  var dates = setDates();
  if (!dates[date]) {
    dates[date] = new Meal();
    localStorage.setItem("foodsByDaysAndMeals", JSON.stringify(dates));
  }
}

function setDate(){
  var dateJSON = localStorage.getItem("currentDate");
  return JSON.parse(dateJSON);
}

function setDates(){
  var dates = localStorage.getItem("foodsByDaysAndMeals");
  if (dates == null){
    dates = {};
  }
  else {
    dates = JSON.parse(dates);
  }
  return dates;
}


class Meal {
  constructor(){
    this.breakfast  = [];
    this.lunch      = [];
    this.snacks      = [];
    this.dinner     = [];
  }
}