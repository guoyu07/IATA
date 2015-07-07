'use strict';

angular.module('IATA.parseService',[])

    .factory('ParseService', function () {

        // parser for html page
        // return object if success
        // and false if can't parse the page correctly
        var parse = function(html){
            var airport = {};

            var name = /<td>Name:<\/td><td[^>]+>([^<]+)/gmi.exec(html);
            if (name) {
                airport.name = name[1];
            }else{
                return false;
            }

            var lat = /<td>Latitude:<\/td><td colspan="2" nowrap="nowrap"><abbr class="latitude"(?:[^>]+)>([^<]+)/gmi.exec(html);
            if (lat) {
                airport.lat = lat[1];
            }else{
                return false;
            }

            var lon = /<td>Longitude:<\/td><td colspan="2" nowrap="nowrap"><abbr class="longitude"(?:[^>]+)>([^<]+)/gmi.exec(html);
            if (lon) {
                airport.lon = lon[1];
            }else{
                return false;
            }

            var tz = /<td nowrap="nowrap">Time Zone:<\/td><td colspan="2" nowrap="nowrap"><abbr class="tz"(?:[^>]+)>([^<]+)/gmi.exec(html);
            if (tz) {
                airport.tz = tz[1];
            }else{
                return false;
            }

            return airport;
        };

        return {
            parse: parse
        }

    });