$('document').ready(function() {
  var filter = new FilterFoods();
  filter.by_name();
})

class FilterFoods {
  by_name(){
    var that = this;
    $("#food-filter input").on('keyup', function(){
    var filter = that.get_filter();
    var foods = get_foods();
      for (var i = 0; i< foods.length; i++) {
        filter_foods(foods[i], filter);
      }
    })
  }

  get_filter(){
    return $("#food-filter input").val().toLowerCase();
  }
}


function get_foods(){
  return $("tbody").children();
}

function get_food_name(food){
  return $(food).find('.food-name').text().toLowerCase();
}

function filter_foods(food, filter){
  var food_name = get_food_name(food);
  if (food_name.contains(filter)) {
    $(food).slideDown();
  }
  else  {
    $(food).slideUp();
  }
}