'use strict';

angular.module('IATA.search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/search.html',
            controller: 'SearchCtrl'
        });
    }])
    .controller('SearchCtrl', ['$scope', 'SearchService', 'AlertService',
        function ($scope, SearchService, AlertService) {
        //init before load to check if something stored in localStorage
        var initPage = function(){
            SearchService.all().then(function(data){
                $scope.airports = data;
            });
        };
        initPage();

        //submit form handler
        $scope.submit = function(){
            SearchService.search($scope.q).then(function(data){
                $scope.airports = data;
            }, function(err){
                AlertService.error(err);
            });
        };

        //delete button handler
        $scope.delete = function(code){
            var conf = confirm('Are you sure want to do that?');
            if (conf == false){
                return false;
            }

            SearchService.remove(code).then(function(data){
                $scope.airports = data;
            }, function(err){
                AlertService.error(err);
            });
        }

    }]);

