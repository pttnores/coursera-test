(function () {
  "use strict";

  angular.module('common')
    .service('UserService', UserService);

  UserService.$inject=[];
  function UserService(){
    var service = this;
    var _user = '';

    /** Sign Up */
    service.signUp = function (signupValues) {
      _user = signupValues;
    };

    /** Sign Up */
    service.getUser = function () {
      return _user;
    };
  }

})();
