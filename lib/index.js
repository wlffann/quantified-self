$('document').ready(function() {
  totalsTable();

  $(".redirect").on('click', function(){
    window.location.replace('foods.html')
  })
})


function totalsTable(){
  var breakfast = parseInt($('.breakfast-table').find('#total').text());
  var lunch     = parseInt($('.lunch-table').find('#total').text());
  var dinner    = parseInt($('.dinner-table').find('#total').text());
  var snacks    = parseInt($('.snack-table').find('#total').text());
  var total     = breakfast + lunch + dinner + snacks
  var totalCalories = $('.total-table').find('#grand-total');
  totalCalories.text(total)
  remainingTotal();
}

function remainingTotal(){
  var remaining = parseInt($('.total-table').find('#goal-total').text()) - parseInt($('.total-table').find('#grand-total').text())
  if(remaining < 0){
    $('.total-table').find("#remaining").text(remaining).css('color', 'red');
  } else if(remaining > 0){
    $('.total-table').find('#remaining').text(remaining).css('color', 'green');
  };
}
