$('document').ready(function() {
  $("#add-food").on('click', function() {
    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();
    var foodRow = `<tr class='food-row'>
                      <td class='food-name'>` + name + `</td>
                      <td class='food-calories'>` + calories + `</td>
                      <td class='food-delete'><button>-</button></td>
                    </tr>`
    $("tbody").append(foodRow);
    console.log(calories);
    $('#name-field .validation-error').html('Please Enter a Name');
    $('#calories-field .validation-error').html('Please Enter Calories');
  })
})
