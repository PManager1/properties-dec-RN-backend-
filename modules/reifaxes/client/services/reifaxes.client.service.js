// Reifaxes service used to communicate Reifaxes REST endpoints
(function () {
  'use strict';

  angular
    .module('reifaxes')
    .factory('ReifaxesService', ReifaxesService);

  ReifaxesService.$inject = ['$resource'];

  function ReifaxesService($resource) {
    return $resource('api/reifaxes/:reifaxId', {
      reifaxId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
