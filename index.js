
$("#searchInfo").keyup(function(event) {
  if (event.keyCode === 13) {
      $("#myBtn").click();
  }
});

function loadData() {

  let theSearch = $('#searchInfo').val();
  let wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + theSearch + '&format=json&callback=wikiCallback';
  let $wikiElem = $('#wiki-articles');
  
  $wikiElem.html('');

  $.ajax({
    url: wikiUrl,
    dataType: 'jsonp',
    success: function(data) {
      if (data[1].length > 1) {
        $wikiElem.html('Articles about ' + theSearch + '<br/>');
        let results = data[1];

        // Loop for creating list of articles
        for (let n = 0; n < results.length; n++) {
          let moreResults = results[n];
          let anotherUrl = 'http://en.wikipedia.org/wiki/' + moreResults;
          $wikiElem.append('<a href="' + anotherUrl +'" target="_blank">' + moreResults + '</a><br/>');
        };
      } else {
        $wikiElem.html('<div>Whoops! Please try another search.</div>');
      }
    },
    error: function(data) {
      $wikiElem.html('<div>Something went wrong</div>');
    }
  });
};