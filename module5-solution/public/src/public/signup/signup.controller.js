(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['$scope', 'UserService', 'MenuService'];

  function SignUpController($scope, UserService, MenuService) {
    var signUpCtrl = this;
    signUpCtrl.user = UserService.getUser();

    signUpCtrl.signup = function () {
      UserService.signUp(signUpCtrl.user);
    };

    signUpCtrl.remoteValAsync = function(value) {
      var shortname = '';
      if (typeof value === 'string') {
        shortname = value.toUpperCase();
      }

      return MenuService.getMenuItem(shortname);
    };
  }

})();
