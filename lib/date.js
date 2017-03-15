$('document').ready(function(){
  var currentDate = moment();
  $(".current-date").append(currentDate.format("MMMM Do, YYYY"));
  $(".day-foreward").on("click", function(){
    currentDate = currentDate.add(1, 'days');
    $(".current-date").html(currentDate.format("MMMM Do, YYYY"));
  });
})