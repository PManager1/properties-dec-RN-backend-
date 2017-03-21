'use strict';

describe('Reifaxes E2E Tests:', function () {
  describe('Test Reifaxes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/reifaxes');
      expect(element.all(by.repeater('reifax in reifaxes')).count()).toEqual(0);
    });
  });
});
