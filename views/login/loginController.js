/**
 * Created by yahya on 8/20/15.
 */
//Login Controller that manage login view logic, we can use it to authorize and authenticate users to our dashboard and validate emails
myDashApp.controller("LoginController", ["$scope", "$location", function ($scope, $state) {
    //submit method called when user click login, I didn't added any logic for it just for your simplicity,
    // we can control user authentication, email validation, and any such operations '
    $scope.submit = function () {
        return $state.path("/dashboard"), !1;
    }
}]);
