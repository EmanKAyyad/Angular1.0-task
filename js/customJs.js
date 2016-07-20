var myapp = angular.module('MyApp', ['ngAnimate', 'ngRoute', 'ngMaterial', 'ngMessages', 'LocalStorageModule']);


myapp.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
            .setPrefix('ArticalStore')
            .setStorageType('localStorage')
            .setNotify(true, true);
});

myapp.config(function ($routeProvider) {
    $routeProvider

            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'homeController'
            })
            .when('/newEdit/:num', {
                templateUrl: 'partials/NewEdit.html',
                controller: 'NewEditController'
            })
            .when('/newEdit', {
                templateUrl: 'partials/NewEdit.html',
                controller: 'NewEditController'
            });

});

// getdate
myapp.service('getDate', function () {
    this.date = '';
});

myapp.controller('headerController', ['$scope', '$route', '$log', function ($scope, $route, $log) {
        $scope.refreshPage = function () {
            $route.reload();
            $log.log('done');
        };
    }]);

myapp.controller('NewEditController', ['$scope', 'localStorageService', 'getDate', '$routeParams', '$http', function ($scope, localStorageService, getDate, $routeParams, $http) {

        $scope.lamp = false;
        $scope.mydate = getDate.date;
        $scope.toggle = function ($event) {
//            console.log($event.target.parentNode);
            var allpartitions = document.getElementsByClassName('insert-partition');
            var partition = $event.target.parentNode;

            if ($scope.lamp) {
                $scope.lamp = false;
                partition.style.height = "65px";
                partition.style.overflow = "hidden";
                partition.style.width = "45%";

            }
            else {
                $scope.lamp = true;
                for (var i = 0; i < allpartitions.length; i++) {
                    allpartitions[i].style.height = "65px";
                    allpartitions[i].style.overflow = "hidden";
                    allpartitions[i].style.width = "45%";

                    partition.style.height = "420px";
                    partition.style.width = "50%";
                }
            }
        };


        $scope.newEditRecord = function () {
            localStorageService.set('name', $scope.name);
            localStorageService.set('author', $scope.author);
            localStorageService.set('category', $scope.category);
            localStorageService.set('state', $scope.state);
            localStorageService.set('date', $scope.mydate);
//            console.log('done');
        };

        if ($routeParams.num) {
            $scope.fillInputs = function () {

                var index = $routeParams.num;
                var inputs = document.getElementsByClassName('generalinfo');
                $http.get('records.json').success(function (data) {
                    $scope.records = data;
                    inputs[0].value = $scope.records[index].valueOf('name');
                    inputs[1].value = $scope.records[index].valueOf('author');
                    inputs[2].value = $scope.records[index].valueOf('category');
                    inputs[3].value = $scope.records[index].valueOf('status');
                });
            };
            console.dir(inputs[0].value);
             $scope.fillInputs();
        };
       
    }]);

myapp.controller('homeController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

        $http.get('records.json').success(function (data) {
            $scope.records = data;
        });

        $scope.countChecks = function () {
            $scope.count = 0;
            var checkboxes = document.getElementsByClassName('checkboxes');
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    $scope.count++;
                }
            }
        };

        $scope.AddEdit = function () {
            if ($scope.count === 1) {
                var checkboxes = document.getElementsByClassName('checkboxes');

                for (var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        var Sendme = checkboxes[i].parentNode.getAttribute('data-index');
                    }
                }
                $window.location.href = "index.html#/newEdit/" + Sendme;
                console.log('done');
            }
            else {
                $window.location.href = "index.html#/newEdit";
            }
        };
    }]);


//date picker code

myapp.controller('AppCtrl', ['$scope', 'getDate', function ($scope, getDate) {
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
        $scope.$watch('myDate', function () {
            getDate.date = $scope.myDate;
        });

    }]);