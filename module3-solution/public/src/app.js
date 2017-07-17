(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
    .directive('foundItems', FoundItemsDirective)
  ;

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        myTitle: '@title',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true,
      transclude: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.cookiesInList = function () {
      for (var i = 0; i < list.items.length; i++) {
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        }
      }

      return false;
    };
  }

  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
  function NarrowItDownController($scope, MenuSearchService) {
    var menu = this;
    var origTitle = "Menu List ";
    menu.searchTerm = '';
    menu.items = [];
    menu.lastSearched = '';

    menu.title = updateMenuItemsTitle();

    menu.narrowSearch = function (searchTerm) {
      menu.lastSearched = searchTerm;
      if (typeof searchTerm === 'string' && searchTerm.length > 0) {
        MenuSearchService.getMatchedMenuItems()
          .then(function (response) {
            var data = response.data;
            var items = data.menu_items;

            return MenuSearchService.narrowSearch(items, searchTerm);

          })
          .then(function (itemsFound) {
              menu.items = itemsFound;
              updateMenuItemsTitle();
            }
          )
          .catch(function (error) {
            console.log("Something went terribly wrong.", error);
          });
      } else {
        menu.items = [];
        updateMenuItemsTitle();
      }

    };

    menu.onRemove = function (index) {
      menu.items.splice(index, 1);
      updateMenuItemsTitle();
    };

    function updateMenuItemsTitle () {
      menu.title = origTitle + " (" + menu.items.length + " items )";
    }
  }


  MenuSearchService.$inject = ['$q', '$http', 'ApiBasePath'];
  function MenuSearchService($q, $http, ApiBasePath) {
    var service = this;
    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response;
    };

    service.narrowSearch = function (items, searchTerm) {
      var deferred = $q.defer();
      var itemsFound = [];

      for (var i = 0; i < items.length; i++) {
        var name = items[i].name;
        if (name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          itemsFound.push(items[i]);
        }
      }

      deferred.resolve(itemsFound);
      return deferred.promise;
    };

  }

})();
