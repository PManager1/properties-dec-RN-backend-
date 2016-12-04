(function () {
  'use strict';

  describe('Properties Route Tests', function () {
    // Initialize global variables
    var $scope,
      PropertiesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PropertiesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PropertiesService = _PropertiesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('properties');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/properties');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PropertiesController,
          mockProperty;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('properties.view');
          $templateCache.put('modules/properties/client/views/view-property.client.view.html', '');

          // create mock Property
          mockProperty = new PropertiesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Property Name'
          });

          // Initialize Controller
          PropertiesController = $controller('PropertiesController as vm', {
            $scope: $scope,
            propertyResolve: mockProperty
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:propertyId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.propertyResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            propertyId: 1
          })).toEqual('/properties/1');
        }));

        it('should attach an Property to the controller scope', function () {
          expect($scope.vm.property._id).toBe(mockProperty._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/properties/client/views/view-property.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PropertiesController,
          mockProperty;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('properties.create');
          $templateCache.put('modules/properties/client/views/form-property.client.view.html', '');

          // create mock Property
          mockProperty = new PropertiesService();

          // Initialize Controller
          PropertiesController = $controller('PropertiesController as vm', {
            $scope: $scope,
            propertyResolve: mockProperty
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.propertyResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/properties/create');
        }));

        it('should attach an Property to the controller scope', function () {
          expect($scope.vm.property._id).toBe(mockProperty._id);
          expect($scope.vm.property._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/properties/client/views/form-property.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PropertiesController,
          mockProperty;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('properties.edit');
          $templateCache.put('modules/properties/client/views/form-property.client.view.html', '');

          // create mock Property
          mockProperty = new PropertiesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Property Name'
          });

          // Initialize Controller
          PropertiesController = $controller('PropertiesController as vm', {
            $scope: $scope,
            propertyResolve: mockProperty
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:propertyId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.propertyResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            propertyId: 1
          })).toEqual('/properties/1/edit');
        }));

        it('should attach an Property to the controller scope', function () {
          expect($scope.vm.property._id).toBe(mockProperty._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/properties/client/views/form-property.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
