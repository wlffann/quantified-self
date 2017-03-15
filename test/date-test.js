describe("#date-carousel", function() {
  var $;

  before(function(){
    $ = document.getElementById("diary-frame").contentWindow.$;
  });

  beforeEach(function() {
    currentDate = moment().format("MMMM Do, YYYY");
    $('.current-date').html(currentDate);
    console.log($('.current-date').html());
  });

  context("When a user visits the index page", function(){
    it ("they see todays date", function(){
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });
  });

  context("When a user visits clicks on the foreward button", function(){
    it ("they see tommorows date", function(){
      $(".day-foreward").click();
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().add(1, 'days').format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });

    it ("they can see 2 days ahead", function(){
      $(".day-foreward").click();
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().add(2, 'days').format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });
  });

  context("When a user visits clicks on the backward button", function(){
    it ("they see the prevous days date", function(){
      $(".day-backward").click();
      $(".day-backward").click();
      $(".day-backward").click();
      
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().add(-1, 'days').format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });

    it ("they can see 2 days behind", function(){
      $(".day-backward").click();
      var actualCurrentDate = $(".current-date").text().trim();
      var expectedCurrentDate = moment().add(-2, 'days').format("MMMM Do, YYYY");
      assert.equal(actualCurrentDate, expectedCurrentDate)
    });
  });
});
