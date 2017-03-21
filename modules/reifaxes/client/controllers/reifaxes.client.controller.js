(function () {
  'use strict';

  // Reifaxes controller
  angular
    .module('reifaxes')
    .controller('ReifaxesController', ReifaxesController);

  ReifaxesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'reifaxResolve'];

  function ReifaxesController ($scope, $state, $window, Authentication, reifax) {
    var vm = this;

    vm.authentication = Authentication;
    vm.reifax = reifax;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Reifax
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.reifax.$remove($state.go('reifaxes.list'));
      }
    }

    // Save Reifax
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.reifaxForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.reifax._id) {
        vm.reifax.$update(successCallback, errorCallback);
      } else {
        vm.reifax.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('reifaxes.view', {
          reifaxId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
