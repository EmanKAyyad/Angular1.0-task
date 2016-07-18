var myapp = angular.module('MyApp', ['ngRoute','ngMaterial', 'ngMessages']);

myapp.config(function ($routeProvider) {
    $routeProvider

            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'homeController'
            })
            .when('/newEdit', {
                templateUrl: 'partials/NewEdit.html',
                controller: 'NewEditController'
            });

});
var flag = false;

myapp.controller('headerController', ['$scope', '$route', '$log', function ($scope, $route, $log) {
        $scope.refreshPage = function () {
            $route.reload();
            $log.log('done');
        };
    }]);

myapp.controller('NewEditController', ['$scope', function ($scope) {
        
        $scope.showPartition = function(){
           flag = true;
           return flag;
        };
    }]);
myapp.controller('homeController', ['$scope', function ($scope) {

    }]);


//date picker code

myapp.controller('AppCtrl', ['$scope', function ($scope) {
        $scope.myDate = new Date();
        $scope.minDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() - 2,
                $scope.myDate.getDate());
        $scope.maxDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() + 2,
                $scope.myDate.getDate());
        $scope.onlyWeekendsPredicate = function (date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        };
    }]);