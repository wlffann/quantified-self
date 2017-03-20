$('document').ready(function() {
  var filter = new FilterFoods();
  filter.byName();
})

class FilterFoods {
  byName(){
    var that = this;
    $("#food-filter input").on('keyup', function(){
    var filter = that.getFilter();
    var foods = getFoods();
      for (var i = 0; i< foods.length; i++) {
        filterFoods(foods[i], filter);
      }
    })
  }

  getFilter(){
    return $("#food-filter input").val().toLowerCase();
  }
}


function getFoods(){
  return $("tbody").children();
}

function getFoodName(food){
  return $(food).find('.food-name').text().toLowerCase();
}

function filterFoods(food, filter){
  var foodName = getFoodName(food);
  if (foodName.contains(filter)) {
    $(food).slideDown();
  }
  else  {
    $(food).slideUp();
  }
}