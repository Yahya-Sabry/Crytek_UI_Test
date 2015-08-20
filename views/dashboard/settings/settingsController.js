/**
 * Created by yahya on 8/20/15.
 */
//settings controller to manage and edit user setting, save and retreive from browser storage.
//    It has three dependeinces #scope, $state and localStorageService
myDashApp.controller("SettingsController", ["$scope", "$state", "localStorageService", function ($scope, $state, localStorageService) {
    $scope.$state = $state;
    /// Control Settings names
    $scope.firstOption = "Launch on PC start";
    $scope.secondOption = "Launch minimized in system tray";

    // the intial status values that we didn't do any update or saved any value
    $scope.statusUpdated = false;
    $scope.updateSaved = false;

    // load settings values from browser storage,
    // we can mention that we can load that setting from database if needed
    // we added the main condition in scope just to share with svgImage directive
    // to colorize checkmark SVG based on loaded condition
    $scope.launchWithPCCondition = localStorageService.get('launchWithPC');
    $scope.minimizeInTrayCondition = localStorageService.get('minimizeInTray');

    // set settings values to false if there aren't any data saved on browser storage
    $scope.launchWithPCCondition = ($scope.launchWithPCCondition == null ? false : $scope.launchWithPCCondition);
    $scope.minimizeInTrayCondition = ($scope.minimizeInTrayCondition == null ? false : $scope.minimizeInTrayCondition);

    // set two temp variable to cashe intire update in.
    // just to compare their values with the main values to show "Save and cancel" buttons or not
    var temp_launchWithPCCondition = $scope.launchWithPCCondition;
    var temp_minimizeInTrayCondition = $scope.minimizeInTrayCondition;


    // method to call user click on launch with PC checkbox,
    // set that status has an update "statusUpdates"
    // colorize SVG to opposite state from it's current
    // change save button text to save in case it was "Saved previously"
    $scope.launchWithPC = function () {
        // change the condition
        temp_launchWithPCCondition = !temp_launchWithPCCondition;
        // We check every time if users made many updates but ends with no changes in condition
        if (temp_launchWithPCCondition != $scope.launchWithPCCondition ||
            temp_minimizeInTrayCondition != $scope.minimizeInTrayCondition) {
            // change "statusUpdated" variable to show save and cancel buttons
            $scope.statusUpdated = true;
        } else {
            // change "statusUpdated" variable to hide save and cancel buttons
            $scope.statusUpdated = false;
        }
        //hiding saved button
        $scope.updateSaved = false;

        // change fill color of the check box based on the choosen option,
        if (temp_launchWithPCCondition) {
            angular.element(document.querySelector("#launchWithPCButton").querySelector('.settingCheckBox')).addClass("settingCheckBoxOn");
        } else {
            angular.element(document.querySelector("#launchWithPCButton").querySelector('.settingCheckBox')).removeClass("settingCheckBoxOn");
        }
        // set text of save button to save in case it was "saved"
        angular.element(document.querySelector(".approveChanges").querySelector('.saveButton')).html('SAVE');
    }

    // method to call user click on minimize to Tray checkbox,
    // set that status has an update "statusUpdates"
    // colorize SVG to opposite state from it's current
    // change save button text to save in case it was "Saved previously"
    $scope.minimizeInTray = function () {
        // change the condition
        temp_minimizeInTrayCondition = !temp_minimizeInTrayCondition;
        // We check every time if users made many updates but ends with no changes in condition
        if (temp_launchWithPCCondition != $scope.launchWithPCCondition ||
            temp_minimizeInTrayCondition != $scope.minimizeInTrayCondition) {
            // change "statusUpdated" variable to show save and cancel buttons
            $scope.statusUpdated = true;
        } else {
            // change "statusUpdated" variable to hide save and cancel buttons
            $scope.statusUpdated = false;
        }
        //hiding saved button
        $scope.updateSaved = false;

        // change fill color of the check box based on the choosen option,
        if (temp_minimizeInTrayCondition) {
            angular.element(document.querySelector("#minimizeInTrayButton").querySelector('.settingCheckBox')).addClass("settingCheckBoxOn");
        } else {
            angular.element(document.querySelector("#minimizeInTrayButton").querySelector('.settingCheckBox')).removeClass("settingCheckBoxOn");
        }
        // set text of save button to save in case it was "saved"
        angular.element(document.querySelector(".approveChanges").querySelector('.saveButton')).html('SAVE');

    }

    // save updates to browser local storage and show Saved button
    $scope.saveUpdates = function () {
        // set update Saved to show the saved button and hide cancel one
        $scope.updateSaved = true;
        $scope.statusUpdated = false;

        // update the main $scope conditions variables
        $scope.launchWithPCCondition = temp_launchWithPCCondition;
        $scope.minimizeInTrayCondition = temp_minimizeInTrayCondition;

        // Save setting conditions in localstorage with their keys
        localStorageService.set('launchWithPC', $scope.launchWithPCCondition);
        localStorageService.set('minimizeInTray', $scope.minimizeInTrayCondition);

        // set text of save button to "saved"
        angular.element(document.querySelector(".approveChanges").querySelector('.saveButton')).html('SAVED');
    }

    // cancel the updates
    $scope.cancelUpdates = function () {
        // set statusUpdated to false to hide Save and Cancel Buttons
        $scope.statusUpdated = false;

        // set the temp settings values to the main conditions
        temp_launchWithPCCondition = $scope.launchWithPCCondition;
        temp_minimizeInTrayCondition = $scope.minimizeInTrayCondition;

        // set fill color of the launch option checkbox to the basic loaded color based on main condition,
        if (temp_launchWithPCCondition) {
            angular.element(document.querySelector("#launchWithPCButton").querySelector('.settingCheckBox')).addClass("settingCheckBoxOn");
        } else {
            angular.element(document.querySelector("#launchWithPCButton").querySelector('.settingCheckBox')).removeClass("settingCheckBoxOn");
        }

        // set fill color of the minimize to tray checkbox to the basic loaded color based on main condition,
        if (temp_minimizeInTrayCondition) {
            angular.element(document.querySelector("#minimizeInTrayButton").querySelector('.settingCheckBox')).addClass("settingCheckBoxOn");
        } else {
            angular.element(document.querySelector("#minimizeInTrayButton").querySelector('.settingCheckBox')).removeClass("settingCheckBoxOn");
        }
    }
}]);
