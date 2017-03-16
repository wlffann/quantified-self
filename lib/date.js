$('document').ready(function(){
  var todayDate = moment();
  $(".current-date").append(todayDate.format("MMMM Do, YYYY"));
  localStorage.setItem("currentDate", JSON.stringify(todayDate.format("MMMM Do, YYYY")));
  currentDate = todayDate;
  add_day();

  $(".day-forward").on("click", function(){
    currentDate = currentDate.add(1, 'days');
    localStorage.setItem("currentDate", JSON.stringify(currentDate.format("MMMM Do, YYYY")));
    $(".current-date").html(currentDate.format("MMMM Do, YYYY"));
    add_day();
  });

  $(".day-backward").on("click", function(){
    currentDate = currentDate.add(-1, 'days');
    localStorage.setItem("currentDate", JSON.stringify(currentDate.format("MMMM Do, YYYY")));
    $(".current-date").html(currentDate.format("MMMM Do, YYYY"));
    add_day();
  });
})

function add_day(){
  var date = set_date();
  var dates = set_dates();
  if (!dates[date]) {
    dates[date] = new Meal();
    localStorage.setItem("foods_by_days_and_meals", JSON.stringify(dates));
  }
}

function set_date(){
  var dateJSON = localStorage.getItem("currentDate");
  return JSON.parse(dateJSON);
}

function set_dates(){
  var dates = localStorage.getItem("foods_by_days_and_meals");
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
    this.snack      = [];
    this.dinner     = [];
  }
}