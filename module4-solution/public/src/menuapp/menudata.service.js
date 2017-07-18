(function () {
  'use strict';

  angular.module('data', [])
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .service('MenuDataService', MenuDataService)
  ;

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var ApiBasePath = "https://davids-restaurant.herokuapp.com";
    var dataService = this;

    dataService.getAllCategories = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });

      return response;
    };

    dataService.getItemsForCategory = function (categoryShortName) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
          category: categoryShortName
        }
      });

      return response;
    };

  }

})();