/// <reference path="angular-min.js" />
/// <reference path="angular-route-min.js" />

myApp = angular.module("myModule", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "Templates/home.html",
                controller: "homeController",
                controllerAs: "homeCtrl"
            })
            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController",
                controllerAs: "coursesCtrl"
            })
            .when("/students", {
                templateUrl: "Templates/students.html",
                controller: "studentsController",
                controllerAs: "studentsCtrl"
            })
            .when("/students/:name", {
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController",
                controllerAs: "studentDetailsCtrl"
            })
            .when("/studentSearch/:name?", {
                templateUrl: "Templates/studentSearch.html",
                controller: "studentSearchController",
                controllerAs: "studentSearchCtrl"
            })
            .otherwise({
                redirectTo: "/home"
            })
        $locationProvider.html5Mode(true);
    })
    .controller("homeController", function () {
        this.message = "Welcome to Our World!!!";
    })
    .controller("coursesController", function ($rootScope) {
        this.courses = ["JavaScript", "C", "C#", "HTML", "Angular", "React"];
        $rootScope.rootScopeValue = "My rootScope Data!!!"
    })
    .controller("studentsController", function ($scope,$routeParams,$location) {
        $scope.$on("$routeChangeStart", function (event, next, current) {
            if (next.$$route.originalPath == "/students/:name") {
                if (!confirm("Are you sure see Details?" + next.$$route.originalPath)) {
                    event.preventDefault();
                }
            } else {
                if (!confirm("Are you sure to move?" + next.$$route.originalPath)) {
                    event.preventDefault();
                }
            }
        })
        this.searchStudent = function () {
            if (this.name) {
                $location.url("/studentSearch/"+this.name);
            } else {
                $location.url("/studentSearch/");
            }           
        }
        var employees = [
            { id: 10001, name: "Ben", gender: "Male", salary: 55000 },
            { id: 10002, name: "Sara", gender: "Female", salary: 68000 },
            { id: 10003, name: "Mark", gender: "Male", salary: 57000 },
            { id: 10004, name: "Pam", gender: "Female", salary: 53000 },
            { id: 10004, name: "BaBy", gender: "Female", salary: 53000 },
            { id: 10004, name: "Sunday", gender: "Female", salary: 53000 },
            { id: 10005, name: "Todd", gender: "Male", salary: 60000 }];
        this.employees = employees;
    })
    .controller("studentDetailsController", function ($routeParams) {
        var employees = [
            { id: 10001, name: "Ben", gender: "Male", salary: 55000 },
            { id: 10002, name: "Sara", gender: "Female", salary: 68000 },
            { id: 10003, name: "Mark", gender: "Male", salary: 57000 },
            { id: 10004, name: "Pam", gender: "Female", salary: 53000 },
            { id: 10004, name: "BaBy", gender: "Female", salary: 53000 },
            { id: 10004, name: "Sunday", gender: "Female", salary: 53000 },
            { id: 10005, name: "Todd", gender: "Male", salary: 60000 }];
        this.employees = employees;
        var empDetails = {};
        for (obj in employees) {
            if (employees[obj].name == $routeParams.name) {
                empDetails = employees[obj];
            }
        }
        this.empDetails = empDetails;
    })
    .controller("studentSearchController", function ($routeParams) {
        var employees = [
            { id: 10001, name: "Ben", gender: "Male", salary: 55000 },
            { id: 10002, name: "Sara", gender: "Female", salary: 68000 },
            { id: 10003, name: "Mark", gender: "Male", salary: 57000 },
            { id: 10004, name: "Pam", gender: "Female", salary: 53000 },
            { id: 10004, name: "BaBy", gender: "Female", salary: 53000 },
            { id: 10004, name: "Sunday", gender: "Female", salary: 53000 },
            { id: 10005, name: "Todd", gender: "Male", salary: 60000 }];
        this.employees = employees;
        var empDetails = [];
        for (obj in employees) {
            var name = employees[obj].name.toString().toLowerCase();
            if (name.startsWith($routeParams.name.toString().toLowerCase()) == true) {
                empDetails[empDetails.length] = employees[obj];
            }
        }
        this.empDetails = empDetails;
    })