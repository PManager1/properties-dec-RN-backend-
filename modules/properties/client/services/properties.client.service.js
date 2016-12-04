// Properties service used to communicate Properties REST endpoints
(function () {
  'use strict';

  angular
    .module('properties')
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
