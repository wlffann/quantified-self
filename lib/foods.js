$('document').ready(function() {
  $("#add-food").on('click', function() {
    clear_errors();

    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();
    
    
    check_for_name(name)
    check_for_calories(calories)
    if (name == "" || calories == "") {
      return 1;
    }

    var foodRow = `<tr class='food-row'>
                      <td class='food-name'>` + name + `</td>
                      <td class='food-calories'>` + calories + `</td>
                      <td class='food-delete'><button>-</button></td>
                    </tr>`
    $("tbody").prepend(foodRow);
    clear_text();
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

