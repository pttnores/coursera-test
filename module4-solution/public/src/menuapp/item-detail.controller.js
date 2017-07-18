(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['MenuDataService', '$stateParams', 'items'];
function ItemDetailController(MenuDataService, $stateParams, items) {
  var itemDetail = this;
  var item = items.data.category;

  console.log('items', item);
  itemDetail.name = item.name;
  itemDetail.description = item.special_instructions;
  itemDetail.menu_items = items.data.menu_items;
}

})();
