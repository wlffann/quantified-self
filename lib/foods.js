$('document').ready(function() {
  $("#add-food").on('click', function() {
    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();
    
    console.log(calories);
    $('#name-field .validation-error').html('Please Enter a Name');
    $('#calories-field .validation-error').html('Please Enter Calories');
  })
})
