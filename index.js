function loadData() {

  let theSearch = $('#searchInfo').val();
  let wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + theSearch + '&format=json&callback=wikiCallback';
  let $wikiElem = $('#wiki-articles');

  let wikiRequestTimeout = setTimeout (function() {
    $wikiElem.text("Oops! Articles failed to load. Try again!");
  }, 2000);

  $.ajax({
    url: wikiUrl,
    dataType: 'jsonp',
    success: function(data) {
      $wikiElem.html('Articles about ' + theSearch + '<br/>');
      let results = data[1];
      for (let n = 0; n < results.length; n++) {
        let moreResults = results[n];
        let anotherUrl = 'http://en.wikipedia.org/wiki/' + moreResults;
        $wikiElem.append('<a href="' + anotherUrl +'" target="_blank">' + moreResults + '</a><br/>');
      };
      clearTimeout(wikiRequestTimeout);
    }
  });
};
