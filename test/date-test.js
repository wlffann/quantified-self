describe("#date-carousel", function() {
  var $;

  before(function(){
    $ = document.getElementById("diary-frame").contentWindow.$;
  });

  context("When a use clicks on the date foreward button", function(){
    it ("their diary moves a day foreward", function(){
      var actualCurrentDate = $("#current-date").text();
      var expectedCurrentDate = moment().format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });
  });
});
