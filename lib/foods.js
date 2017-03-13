$('document').ready(function() {

  loadTheFoodItems()
  
  $("#add-food").on('click', function() {
    clear_errors();

    var name = get_name();
    var calories = get_calories();
    
    check_for_name(name)
    check_for_calories(calories)
    
    if (valid_food(name, calories)){return;}

    add_food_to_table(name, calories);
  })
})

  function loadTheFoodItems() {
    for (var i = 0; i < localStorage.length; i++){
      $("tbody").append(localStorage.getItem(localStorage.key(i)));
      add_delete_functionality();
    }
  }

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

function valid_food(name, calories){
  check_for_name(name)
  check_for_calories(calories)
  return (name == "" || calories == "");
}

  function clear_text(){
    $('#name-field input').val(null);
    $('#calories-field input').val(null);
  }

  function add_delete_functionality(){
    $("td.food-delete button").on('click', function(){
      $(localStorage.removeItem(this));
    })
  }

function create_food(name, calories)  {
  return `<tr class='food-row'>
    <td class='food-name'>` + name + `</td>
    <td class='food-calories'>` + calories + `</td>
    <td class='food-delete'><button>-</button></td>
  </tr>`
}

function get_name(){
  return $('#name-field input').val();
}

function get_calories(){
  return $('#calories-field input').val();
}

function add_food_to_table(name, calories){
  var foodRow = create_food(name, calories)
  localStorage.setItem(name, foodRow);
  $("tbody").prepend(foodRow);
  add_delete_functionality();
  clear_text();
}
