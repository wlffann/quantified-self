function totalsTable(){
  var breakfast = parseInt($('.breakfast-table .total').text());
  var lunch     = parseInt($('.lunch-table .total').text());
  var dinner    = parseInt($('.dinner-table .total').text());
  var snacks    = parseInt($('.snack-table .total').text());
  var total     = breakfast + lunch + dinner + snacks
  var totalCalories = $('.total-table').find('#grand-total');
  totalCalories.text(total);
  remainingTotal();
}

function remainingTotal(){
  var remaining = parseInt($('.total-table').find('#goal-total').text()) - parseInt($('.total-table').find('#grand-total').text())
  styleRemainingGrandTotal(remaining);
};

function styleRemainingGrandTotal(remaining) {
  if(remaining < 0){
    $('.total-table').find("#remaining").text(remaining).css('color', 'red');
  } else if(remaining > 0){
    $('.total-table').find('#remaining').text(remaining).css('color', 'green');
  };
};
