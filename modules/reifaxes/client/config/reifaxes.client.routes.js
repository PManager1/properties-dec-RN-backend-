(function () {
  'use strict';

  angular
    .module('reifaxes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('reifaxes', {
        abstract: true,
        url: '/reifaxes',
        template: '<ui-view/>'
      })
      .state('reifaxes.list', {
        url: '',
        templateUrl: 'modules/reifaxes/client/views/list-reifaxes.client.view.html',
        controller: 'ReifaxesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Reifaxes List'
        }
      })
      .state('reifaxes.create', {
        url: '/create',
        templateUrl: 'modules/reifaxes/client/views/form-reifax.client.view.html',
        controller: 'ReifaxesController',
        controllerAs: 'vm',
        resolve: {
          reifaxResolve: newReifax
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Reifaxes Create'
        }
      })
      .state('reifaxes.edit', {
        url: '/:reifaxId/edit',
        templateUrl: 'modules/reifaxes/client/views/form-reifax.client.view.html',
        controller: 'ReifaxesController',
        controllerAs: 'vm',
        resolve: {
          reifaxResolve: getReifax
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Reifax {{ reifaxResolve.name }}'
        }
      })
      .state('reifaxes.view', {
        url: '/:reifaxId',
        templateUrl: 'modules/reifaxes/client/views/view-reifax.client.view.html',
        controller: 'ReifaxesController',
        controllerAs: 'vm',
        resolve: {
          reifaxResolve: getReifax
        },
        data: {
          pageTitle: 'Reifax {{ reifaxResolve.name }}'
        }
      });
  }

  getReifax.$inject = ['$stateParams', 'ReifaxesService'];

  function getReifax($stateParams, ReifaxesService) {
    return ReifaxesService.get({
      reifaxId: $stateParams.reifaxId
    }).$promise;
  }

  newReifax.$inject = ['ReifaxesService'];

  function newReifax(ReifaxesService) {
    return new ReifaxesService();
  }
}());
