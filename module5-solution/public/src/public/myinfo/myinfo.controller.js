(function () {
  "use strict";

  angular.module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['UserService', 'MenuService'];

  function MyInfoController(UserService, MenuService) {
    var myInfoCtrl = this;
    myInfoCtrl.user = UserService.getUser();
    if (myInfoCtrl.user.favouriteDish) {
      MenuService.getMenuItem(myInfoCtrl.user.favouriteDish.toUpperCase())
        .then(function (menuItem) {
          myInfoCtrl.menuItem = menuItem;
        });
    }
  }

})();
