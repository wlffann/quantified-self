function createMealDay() {
  var mealDay = {}
  mealDay.breakfast = [{"name": "banana", "calories": "100"}, {"name": "apple", "calories": "10"}, {"name": "ham", "calories": "26"}]
  mealDay.lunch = [{"name": "banana", "calories": "100"}, {"name": "apple", "calories": "25"}];
  return mealDay;
};

function get_length(obj){
  return Object.keys(obj).length
}
