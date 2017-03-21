function getPage(page, onLoad) {
  document.getElementById("foods-frame").src = page;

  document.getElementById("foods-frame").onload = onLoad;
};

describe('#edit-foods', function() {
  var $;

  before(function(){
    $ = document.getElementById("foods-frame").contentWindow.$;
    localStorage.clear();
    localStorage.setItem('food-items', JSON.stringify([new Food('apple', 10)]))
  })

  after(function(){
    localStorage.removeItem('food-items');
  })
  
  it ('foods name can be edited inline', function() {
    getPage('./foods.html', function() {
      $('.food-row .food-name').click();
      $('.food-row input').val('banana').blur();

      assert.equal($('.food-row .food-name').text(), 'banana');
    });
  });

  it ('foods calories can be edited inline', function() {
    getPage('./foods.html', function() {
      $('.food-row .food-calories').click();
      $('.food-row input').val('35').blur();

      assert.equal($('.food-row .food-calories').text(), '35');
    });
  });
});

