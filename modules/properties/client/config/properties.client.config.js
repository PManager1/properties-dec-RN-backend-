(function () {
  'use strict';

  angular
    .module('properties')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Properties',
      state: 'properties',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'properties', {
      title: 'List Properties',
      state: 'properties.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'properties', {
      title: 'Create Property',
      state: 'properties.create',
      roles: ['user']
    });
  }
}());
