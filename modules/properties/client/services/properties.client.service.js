// Properties service used to communicate Properties REST endpoints
(function() {
    'use strict';

    angular
        .module('properties')
        .service('shareDataService', ['_', function(_) {
            // console.log('Hi from 8- shareDataService _=',_);
            
            var myList;

            var addList = function(newObj) {
                // myList.push(newObj);
                myList = newObj; 
                // myList = _.flatten(myList); 
                // console.log('Added properteis inside the myList ', myList);
            }

            var getList = function() {
                // var my = _.flatten(myList);
                // console.log( ' getList  my = ', my); 

                return myList;
            }

            var lastonList = function() {
                var lastinList = myList[myList - 1];
                return lastinList;
            }
            var popList = function() {
                myList = [];
                return myList;
            }

            return {
                addList: addList,
                getList: getList,
                popList: popList,
                lastonList: lastonList
            };
        }])



      .factory('_', ['$window', function($window) {
        return $window._; // assumes underscore has already been loaded on the page
      }])


      .factory('dates_two_weeks_before', ['moment', function(moment) {
          console.log('52- service calling facotry dates_two_weeks_before');

          // console.log(' calling  $scope.two_weeks_before_dates ');
          var nowMoment = moment();
          var todayDate = nowMoment.format('YYYY-M-D');

          var d = moment().subtract(14, 'day').format('YYYY-M-D');

          var datesArr = [];

          for (var i = 0; i < 14; i++) {
              datesArr.push(moment().subtract(i, 'day').format('YYYY-M-D'));
              // console.log( '143-- datesArr = ', datesArr); 
          }
          // console.log(' todayDate = ', todayDate);
          // console.log('66 datesArr = ', datesArr);          
          return datesArr;
      }])




      .factory("Data", ['_', function(_) {
        // console.log(  ' inside Data  value of _  =', _); 

          return { FirstName: '' };

      }])




    .factory('PropertiesService', PropertiesService);

    PropertiesService.$inject = ['$resource'];

    function PropertiesService($resource) {
        return $resource('api/properties/:propertyId', {
            propertyId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }







}());
