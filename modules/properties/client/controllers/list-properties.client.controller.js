(function () {
  'use strict';

  angular
    .module('properties')
    .controller('PropertiesListController', PropertiesListController);

  PropertiesListController.$inject = ['PropertiesService'];

  function PropertiesListController(PropertiesService) {
    var vm = this;

    vm.properties = PropertiesService.query();
  }
}());
