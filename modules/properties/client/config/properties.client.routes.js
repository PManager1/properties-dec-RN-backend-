(function () {
  'use strict';

  angular
    .module('properties')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('properties', {
        abstract: true,
        url: '/properties',
        template: '<ui-view/>'
      })
      .state('properties.list', {
        url: '',
        templateUrl: 'modules/properties/client/views/list-properties.client.view.html',
        controller: 'PropertiesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Properties List'
        }
      })
      .state('properties.create', {
        url: '/create',
        templateUrl: 'modules/properties/client/views/form-property.client.view.html',
        controller: 'PropertiesController',
        controllerAs: 'vm',
        resolve: {
          propertyResolve: newProperty
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Properties Create'
        }
      })
      .state('properties.edit', {
        url: '/:propertyId/edit',
        templateUrl: 'modules/properties/client/views/form-property.client.view.html',
        controller: 'PropertiesController',
        controllerAs: 'vm',
        resolve: {
          propertyResolve: getProperty
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Property {{ propertyResolve.name }}'
        }
      })
      .state('properties.view', {
        url: '/:propertyId',
        templateUrl: 'modules/properties/client/views/view-property.client.view.html',
        controller: 'PropertiesController',
        controllerAs: 'vm',
        resolve: {
          propertyResolve: getProperty
        },
        data: {
          pageTitle: 'Property {{ propertyResolve.name }}'
        }
      });
  }

  getProperty.$inject = ['$stateParams', 'PropertiesService'];

  function getProperty($stateParams, PropertiesService) {
    return PropertiesService.get({
      propertyId: $stateParams.propertyId
    }).$promise;
  }

  newProperty.$inject = ['PropertiesService'];

  function newProperty(PropertiesService) {
    return new PropertiesService();
  }
}());
