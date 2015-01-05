/*global require, requirejs */

/*
https://developer.salesforce.com/blogs/developer-relations/2014/07/building-single-page-app-angularjs-salesforce-rest-api.html?d=70130000000llMA&elq_mid=6929&elq_cid=3310046
http://www.artima.com/articles/dci_vision.html
*/

'use strict';

//
//requirejs.config({
//  baseUrl: "../lib",
//  paths: {
//    'angular': ['angularjs/angular'],
//    'angular-route': ['angularjs/angular-route']/*,
//    'jquery': ['../lib/jquery/jquery'],
//    'three.js': ['../lib/three.js/three.js'],
//    'three.js': ['../lib/three.js/three.js'],*/
//  },
//  shim: {
//    'angular': {
//      exports : 'angular'
//    },
//    'angular-route': {
//      deps: ['angular'],
//      exports : 'angular'
//    }
//  }
//});

// https://github.com/cubicleDowns/webgl-code-samples/tree/master/ng-3D-TTT
// https://medium.com/@dickeyxxx/best-practices-for-building-angular-js-apps-266c1a4a6917

require(['angular', './controllers', /*'jquery',*/'scene/main',
  './directives', './filters', './services','angular-route'
  ],
  function(angular, controllers) {

    // Declare app level module which depends on filters, and services

    angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.scene', 'ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/view1', {templateUrl: '/assets/partials/partial1.html', controller: controllers.MyCtrl1});
            $routeProvider.when('/view2', {templateUrl: '/assets/partials/partial2.html', controller: controllers.MyCtrl2});
            $routeProvider.otherwise({redirectTo: '/view1'});
        }])
    ;
    angular.bootstrap(document, ['myApp']);


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

});


