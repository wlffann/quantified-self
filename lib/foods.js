$('document').ready(function() {

  loadTheFoodItems()
  $("#add-food").on('click', function() {
    clear_errors();

    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();


    check_for_name(name)
    check_for_calories(calories)
    if (name == "" || calories == "") {
      return 1;
    }

    formatFoodItemTable(name, calories);
    storeFoodItems(name, calories);
    add_delete_functionality();
    clear_text();




    $("#food-filter input").on('keyup', function(){
      var filter = $("#food-filter input").val().toLowerCase();
      var foods = $("tbody").children();
      for (var i = 0; i< foods.length; i++) {
        var food = $(foods[i]).find('.food-name').text().toLowerCase();
        if (!food.contains(filter)) {
          $(foods[i]).slideUp();
        }
        else  {
          $(foods[i]).slideDown();
        }
      }
    })
  })

  function check_for_name(name) {
    if (name == ""){
      $('#name-field .validation-error').html('Please Enter a Name');
    }
  }

  function check_for_calories(calories) {
    if (calories == ""){
      $('#calories-field .validation-error').html('Please Enter Calories');
    }
  }

  function clear_errors(){
    $('#name-field .validation-error').empty();
    $('#calories-field .validation-error').empty();
  }

  function clear_text(){
    $('#name-field input').val(null);
    $('#calories-field input').val(null);
  }

  function add_delete_functionality(){
    $("td.food-delete button").on('click', function(){
      $(this).closest("tr").remove();
      console.log(this.parent.parent)
      $(localStorage.removeItem(name));
    })
  }

  function Food(name, calories) {
    this.name = name;
    this.calories = calories;
  }

  function storeFoodItems(name,calories){
    var foodItemsJSON = localStorage.getItem("food-items");
    if(foodItemsJSON === null){
      foodItemsJSON = '[]';
    }
    var currentFoodItems = JSON.parse(foodItemsJSON);
    var data = new Food(name, calories)
    currentFoodItems.push(data);

    foodItemsJSON = JSON.stringify(currentFoodItems);
    localStorage.setItem('food-items', foodItemsJSON);
  }

  function loadTheFoodItems() {
    var foodItems = JSON.parse(localStorage.getItem("food-items"));
    if(foodItems != null) {
      foodItems.forEach(function(element){
        console.log(element)
        formatFoodItemTable(element.name, element.calories)
        return true;
      });
    };
  };

  function formatFoodItemTable(name, calories) {
    var foodRow = `<tr class='food-row'>
    <td class='food-name'>` + name + `</td>
    <td class='food-calories'>` + calories + `</td>
    <td class='food-delete'><button>-</button></td>
    </tr>`

    $("tbody").prepend(foodRow);
  }

})
