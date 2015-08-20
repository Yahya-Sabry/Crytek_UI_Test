"use strict";
// Intialize the main Angular "myDashApp", which has three dependencies ["ui.router", "ngAnimate", "LocalStorageModule"]
// ui.router: to manage the applications routes
// ngAnimate: to applay simple animation while transaction between views
// LocalStorageModule: to manipulate with browser storage
var myDashApp = angular.module("myDashApp", ["ui.router", "ngAnimate", "LocalStorageModule"]);

myDashApp.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    // configure the app to have the main landing page "Setting page" (our test)
    // otherwise, user redirect to login page

    $urlRouterProvider.when("/dashboard", "/dashboard/settings"),
        $urlRouterProvider.otherwise("/login");

    // configure the main route, views and their controllers
    $stateProvider.state("base", {
        "abstract": !0,
        url: "",
        templateUrl: "views/base.html"
    }).state("login", {
        url: "/login",
        parent: "base",
        templateUrl: "views/login/login.html",
        controller: "LoginController"
    }).state("dashboard", {
        url: "/dashboard",
        parent: "base",
        templateUrl: "views/dashboard/dashboard.html",
        controller: "DashboardController"
    }).state("account", {
        url: "/account",
        parent: "dashboard",
        templateUrl: "views/dashboard/account/account.html",
    }).state("profile", {
        url: "/profile",
        parent: "dashboard",
        templateUrl: "views/dashboard/profile/profile.html",
    }).state("settings", {
        url: "/settings",
        parent: "dashboard",
        templateUrl: "views/dashboard/settings/settings.html",
        controller: "SettingsController"
    });
}]);
