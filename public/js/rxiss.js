
        // https://github.com/Reactive-Extensions/rxjs-jquery
        // http://www.dnnsoftware.com/community-blog/cid/155106/using-reative-extensions-rxjs
        var throttledInput = $('#textInput');
        var keyup = Rx.Observable.fromEvent(throttledInput, 'keyup')

//        throttledInput
//        .keyupAsObservable()
        var massaged = keyup
        .map( function (ev) {
            return $(ev.target).val();
        })
        .filter( function (text) {
            return text.length > 2;
        })
        .throttle(500)
        .distinctUntilChanged();

        function searchWikipedia(term) {
          return $.ajaxAsObservable({
              url: 'http://en.wikipedia.org/w/api.php',
              data: { action: 'opensearch',
                      search: term,
                      format: 'json' },
              dataType: 'jsonp'
          });
        }

//        var suggestions = throttledInput.flatMapLatest( function (text) {
        var suggestions = massaged.flatMapLatest( function (text) {
            return searchWikipedia(text);
            });

        var selector = $('#results');

        var subscription = suggestions.subscribe(
          function (data) {
              selector.empty();
              $.each(data.data[1], function (_, text) {
                  $('<li>' + text + '</li>').appendTo(selector);
              });
          },
          function (e) {
              selector.empty();
              $('<li>Error: ' + e + '</li>').appendTo('#results');
          });
