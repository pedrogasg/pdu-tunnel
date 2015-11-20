(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('maxyear', MaxYear);
    function MaxYear(dateParserService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (typeof attr.maxyear !== 'undefined' || attr.maxyear) {
                    var maxVal;
                    ctrl.$validators.maxyear = function (value) {
                        return maxVal === 'undefined' || isNaN(maxVal) || validateMaxDate(value, maxVal);
                    };
                    attr.$observe('maxyear', function (val) {
                        maxVal = parseInt(val);
                        ctrl.$validate();
                    });
                }
                function validateMaxDate(value, maxVal) {
                    var year = dateParserService.getYear(value);
                    return year != undefined && year < maxVal;
                }
            }
        }
    }
    MaxYear.$inject = ['dateParserService'];
})();
