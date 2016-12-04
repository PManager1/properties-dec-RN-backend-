'use strict';

describe('Properties E2E Tests:', function () {
  describe('Test Properties page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/properties');
      expect(element.all(by.repeater('property in properties')).count()).toEqual(0);
    });
  });
});
