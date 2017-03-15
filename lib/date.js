$('document').ready(function(){
var currentDate = moment().format("MMMM Do, YYYY");
  $(".current-date").append(currentDate);
})