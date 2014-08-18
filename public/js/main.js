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

require(['angular', './controllers', './scene/main', './directives', './filters', './services','angular-route'],
  function(angular, controllers, scene) {

    // Declare app level module which depends on filters, and services

    angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngRoute']).
      config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: controllers.MyCtrl1});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: controllers.MyCtrl2});
        $routeProvider.otherwise({redirectTo: '/view1'});
      }]);

    angular.bootstrap(document, ['myApp']);
    window.OtherBrane = window.OtherBrane || {};
    window.OtherBrane.moduleList = ['skybox/main','floor/main','models/main','charts/main'];
    window.OtherBrane.mediaPath = '..';
    scene.animate();
});
