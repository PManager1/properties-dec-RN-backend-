(function () {
  'use strict';

  angular
    .module('reifaxes')
    .controller('ReifaxesListController', ReifaxesListController);

  ReifaxesListController.$inject = ['ReifaxesService'];

  function ReifaxesListController(ReifaxesService) {
    var vm = this;

    vm.reifaxes = ReifaxesService.query();
  }
}());
