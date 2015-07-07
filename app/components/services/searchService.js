'use strict';

angular.module('IATA.searchService', ['ngStorage'])

    .factory('SearchService', function ($localStorage, $http, $q, ParseService) {

        // search function, validates the code and get the page
        // uses ParseService for parsing html page
        // return promise
        var search = function (code) {

            var deffered = $q.defer();

            //using YQL for as proxy for page downloading
            var url = "http://query.yahooapis.com/v1/public/yql?q=select * from html where url=" +
                "'http://www.gcmap.com/airport/" + code + "'&format=xml&callback=JSON_CALLBACK";

            //three letters calidator for IATA code
            var res = /^[A-Z]{3}$/gmi.exec(code);

            if(res == null){
                deffered.reject('Please dont cheat with code');
                return deffered.promise;
            }

            if (!$localStorage.airports){
                $localStorage.airports = {};
            }

            if ($localStorage.airports[code]){
                deffered.resolve($localStorage.airports);
            }else {
                var airport = {};
                $http.jsonp(url).
                    success(function (data) {
                        var html = data.results[0];

                        airport = ParseService.parse(html);
                        if (!airport){
                            deffered.reject('Problems with parsing');
                            return deffered.promise;
                        }


                        $localStorage.airports[code] = airport;

                        deffered.resolve($localStorage.airports);
                    }).
                    error(function () {
                        deffered.reject('API error!');
                    });
            }

            return deffered.promise;
        };

        // return all airports stored in localStorage
        var all = function(){
            var deffered = $q.defer();
            if ($localStorage.airports){
                deffered.resolve($localStorage.airports);
            }else{
                deffered.resolve({});
            }

            return deffered.promise;
        };

        // remove airport  by the code
        var remove = function(code){
            var deffered = $q.defer();

            if($localStorage.airports){
                if($localStorage.airports[code]){
                    delete $localStorage['airports'][code];
                    deffered.resolve($localStorage.airports);
                }else{
                    deffered.reject('No such airport');
                }
            }else{
                deffered.reject('No such airport');
            }

            return deffered.promise;
        };

        var edit = function(key,newObj){
            var deffered = $q.defer();


            //form validation - name
            if (newObj.name.search(/^[a-zA-Z\s]+$/) === -1){
                deffered.reject('Please use only letter in name!');
                return deffered.promise;
            }

            //form validation - tz
            if (newObj.tz.search(/^[a-zA-Z\+\d\s\(\)]+$/) === -1){
                deffered.reject('Please use only letters numbers and +,(,)!');
                return deffered.promise;
            }

            //form validation - lat
            if (newObj.lat.search(/^\d{1,2}°\d{1,2}'\d{1,2}"[NWES]{1} \(\d{1,2}\.\d{6}\)$/) === -1){
                deffered.reject('Please use only such format 50°24\'06"N (50.401694)');
                return deffered.promise;
            }

            //form validation - lon
            if (newObj.lon.search(/^\d{1,2}°\d{1,2}'\d{1,2}"[NWES]{1} \(\d{1,2}\.\d{6}\)$/) === -1){
                deffered.reject('Please use only such format 50°24\'06"N (50.401694)');
                return deffered.promise;
            }

            $localStorage.airports[key] = newObj;
            deffered.resolve();
            return deffered.promise;
        };

        return {
            search: search,
            all: all,
            remove: remove,
            edit: edit
        };
    });