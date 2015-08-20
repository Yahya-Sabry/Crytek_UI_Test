/**
 * Created by yahya on 8/20/15.
 */
//Dashboard controller where we can control main dashboard views logic, profile view and account view
myDashApp.controller("DashboardController", ["$scope", "$state", function ($scope, $state) {
    $scope.$state = $state;
    // I set only one scope variable to use in Dashboard to show that
    // we can load users data (i.e. User profile info, account, settings or any other related data)
    $scope.userName = "Yahya Sabry";
}]);
