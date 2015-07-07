'use strict';

// Declare app level module which depends on views, and components
angular.module('IATA', [
    'ngRoute',
    'ngStorage',
    'IATA.index',
    'IATA.search',
    'IATA.edit',
    'IATA.searchService',
    'IATA.parseService',
    'ui.bootstrap.alerts'

])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}]);
