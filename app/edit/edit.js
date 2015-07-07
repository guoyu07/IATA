'use strict';

angular.module('IATA.edit', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/edit/:code', {
            templateUrl: 'edit/edit.html',
            controller: 'EditCtrl'
        });
    }])

    .controller('EditCtrl', ['$scope', '$location', '$routeParams', 'SearchService', 'AlertService',
        function ($scope, $location, $routeParams, SearchService, AlertService) {
            var code = $routeParams.code;

            //getting all the available airports and assign one for edit by code
            SearchService.all().then(function(data) {
                if(data[code]){
                    $scope.airport = data[code];
                }else{
                    AlertService.error('There is no such airport!');
                }
            });

            //submit handler
            $scope.submit = function(){
                SearchService.edit(code,$scope.airport).then(function(){
                    $location.path('/search');
                }, function(err){
                    AlertService.error(err);
                });
            }
    }]);