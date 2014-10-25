/*global require, requirejs */

/*
https://developer.salesforce.com/blogs/developer-relations/2014/07/building-single-page-app-angularjs-salesforce-rest-api.html?d=70130000000llMA&elq_mid=6929&elq_cid=3310046
*/

'use strict';

requirejs.config({
  paths: {
    'angular': ['../lib/angularjs/angular'],
    'angular-route': ['../lib/angularjs/angular-route']
  },
  shim: {
    'angular': {
      exports : 'angular'
    },
    'angular-route': {
      deps: ['angular'],
      exports : 'angular'
    }
  }
});

//function MyController($scope, greeter) {
//  $scope.sayHello = function() {
//    greeter.greet('Hello World');
//  };
//}

// https://github.com/cubicleDowns/webgl-code-samples/tree/master/ng-3D-TTT
// https://medium.com/@dickeyxxx/best-practices-for-building-angular-js-apps-266c1a4a6917

require(['angular', './controllers', /*'domReady!',*/ 'scene/main', './directives', './filters', './services','angular-route'],
  function(angular, controllers) {

    // Declare app level module which depends on filters, and services

    angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.scene', 'ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: controllers.MyCtrl1});
            $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: controllers.MyCtrl2});
            $routeProvider.otherwise({redirectTo: '/view1'});
        }])
        .factory('greeter',['$window',function($window){
            return {
                greet: function(text) {
                  $window.alert(text);
                }
              };
        }])
        .controller("MyController",['$scope','greeter',function($scope,greeter){
          $scope.sayHello = function() {
              greeter.greet('Dupa Biskupa');
            };
//          $scope.moduleList = ['skybox/main','floor/main','models/main','charts/main'];
        }])
//        .factory('scene',['$window',function($window){
//            return {
//              animate: function() {
//                scene.animate();
//              }
//            };
//        }])
;



    window.OtherBrane = window.OtherBrane || {};
    window.OtherBrane.moduleList = ['skybox/main','floor/main','models/main','charts/main'];
    window.OtherBrane.mediaPath = '..';
//    scene.animate();
    angular.bootstrap(document, ['myApp']);
});
