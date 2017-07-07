(function () {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();

    /** @param {number} itemIndex */
    toBuyList.bought = function (itemIndex) {
      ShoppingListCheckOffService.bought(itemIndex);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtListCtrl = this;

    boughtListCtrl.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var toBuyList = [
      {
        name: 'cookies',
        quantity: 10
      },
      {
        name: 'onions',
        quantity: 5
      },
      {
        name: 'hotdogs',
        quantity: 3
      },
      {
        name: 'oranges',
        quantity: 26
      },
      {
        name: 'bananas',
        quantity: 8
      }
    ];
    var boughtList = [];

    /** @param {number} itemIndex */
    service.bought = function (itemIndex) {
      boughtList.push(toBuyList[itemIndex]);
      console.log(itemIndex, toBuyList, boughtList);
      toBuyList.splice(itemIndex, 1);
    };

    service.getItemsToBuy = function () {
      return toBuyList;
    };

    service.getAlreadyBoughtItems = function () {
      return boughtList;
    };
  }

})();
