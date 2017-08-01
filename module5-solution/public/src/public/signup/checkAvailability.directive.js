(function () {
  'use strict';

  angular.module('public')
    .directive('checkAvailability', checkAvailability);

  checkAvailability.$inject=['MenuService'];
  function checkAvailability(MenuService) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {
        ngModel.$asyncValidators.invalidDish = function(modelValue, viewValue) {
          var shortname = '';
          if (typeof viewValue === 'string') {
            shortname = viewValue.toUpperCase();
          }

          return MenuService.getMenuItem(shortname);
        }
      }
    }
  }
})();