/**
 * Created by yahya on 8/20/15.
 * For Crytek UI Test exam and not allowed to share it
 */

// The svgImage directive is mainly to load svg images from external files
// The svgImage directive builds the svg tag inside parent object tag
// The svgImage directive maily need is to colorize SVG external files rather than embed the svg tag hard coded
// Document have to have svg dom tag to apply css fill style on it
myDashApp.directive('svgImage', ['$http', function ($http) {
    return {
        restrict: 'E',
        scope: true,
        link: function (scope, element, attrs) {
            var imgURL = element.attr('src');
            // if you want to use ng-include, then
            // instead of the above line write the bellow:
            // var imgURL = element.attr('ng-include');
            var request = $http.get(
                imgURL,
                {'Content-Type': 'application/xml'}
            );

            scope.manipulateImgNode = function (data, elem) {
                // get the svg tag
                var $svg = angular.element(data)[4];
                // get the needed class to add to svg element
                var imgClass = elem.attr('class');

                // add classed to the new svg tag one by one from the svgImage directive attribute "classes"
                if (typeof(imgClass) !== 'undefined') {
                    var classes = imgClass.split(' ');
                    for (var i = 0; i < classes.length; ++i) {
                        $svg.classList.add(classes[i]);
                    }
                }

                //add settingCheckBoxOn (acctivated checkbox class)
                // based on loaded scope variable "launchWithPCCondition" from browser storage on the settings controllers
                if (elem.attr('id') == "launchWithPC" && scope.launchWithPCCondition) {
                    $svg.classList.add("settingCheckBoxOn")
                }
                //add settingCheckBoxOn (acctivated checkbox class)
                // based on loaded scope variable "minimizeInTrayCondition" from browser storage on the settings controllers

                if (elem.attr('id') == "minimizeInTray" && scope.minimizeInTrayCondition) {
                    $svg.classList.add("settingCheckBoxOn")
                }
                return $svg;
            };

            request.success(function (data) {
                element.replaceWith(scope.manipulateImgNode(data, element));
            });
        }
    };
}]);