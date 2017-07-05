(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.eatForLunch = "";
        $scope.message = "";
        $scope.eatForLunchMessage = "";

        $scope.showMealsEvaluation = function () {
            if (!checkMealText()) {
                setEnterDataFirstMessage();
            } else {
                var meals = sanitizeMeals($scope.eatForLunch);

                if (meals.length !== $scope.eatForLunch.length) {
                    $scope.eatForLunchMessage = 'Remember we NOT consider and empty item, i.e., , , as an item towards to the count';
                }

                if (isEnoughMeals(meals)) {
                    setEnjoy();
                } else {
                    setTooMuch();
                }

            }

        };

        $scope.getMealInputStyle = function () {
            if (checkMealText()) {
                return ['form-control', '.has-success'];
            } else {
                return ['form-control','.has-error'];
            }
        };

        function checkMealText() {
            if (typeof $scope.eatForLunch === 'string' && $scope.eatForLunch.length > 0) {
                return true;
            }
        }

        function setEnjoy() {
            $scope.message = "Enjoy!";
            $scope.messageStyle = {color: 'green'};
        }

        function setTooMuch() {
            $scope.message = "Too much!";
            $scope.messageStyle = {color: 'green'};
        }

        function setEnterDataFirstMessage() {
            $scope.message = "Please enter data first";
            $scope.messageStyle = {color: 'red'};
        }

        function sanitizeMeals(originalMeals) {
            return originalMeals
                .split(',')
                .filter(function(n){ return n.trim() != undefined && n.trim() != ''})
                .join(',')
                ;
        }

        /**
         * Check if we had enough meals
         * @param meals
         * @return {boolean}
         */
        function isEnoughMeals(meals) {
            if (typeof meals === 'string') {
                return (meals.split(',').length < 4);
            }
            return false;
        }
    }
})();
