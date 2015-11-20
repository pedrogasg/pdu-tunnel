(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('minyear', MinYear);
    function MinYear(dateParserService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (typeof attr.minyear !== 'undefined' || attr.minyear) {
                    var minVal;
                    ctrl.$validators.minyear = function (value) {
                        return minVal === 'undefined' || isNaN(minVal) || validateMinDate(value, minVal);
                    };
                    attr.$observe('minyear', function (val) {
                        minVal = parseInt(val);
                        ctrl.$validate();
                    });
                }
                function validateMinDate(value, minVal) {
                    var year = dateParserService.getYear(value);
                    return year != undefined && year > minVal;
                }
            }
        }
    }
    MinYear.$inject = ['dateParserService'];
})();
