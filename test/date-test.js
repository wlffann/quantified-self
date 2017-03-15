describe("#date-carousel", function() {
  var $;

  before(function(){
    $ = document.getElementById("diary-frame").contentWindow.$;
  });

  context("When a user visits the index page", function(){
    it ("they see todays date", function(){
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });
  });
});
