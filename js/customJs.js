var myapp = angular.module('MyApp', ['ngRoute']);

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


myapp.controller('headerController', ['$scope', '$route', '$log', function ($scope, $route, $log) {
        $scope.refreshPage = function () {
            $route.reload();
            $log.log('done');
        };
    }]);

myapp.controller('NewEditController',['$scope',function($scope){
        
}]);
myapp.controller('homeController',['$scope',function($scope){
        
}]);