(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('inputTypeMonth', InputTypeMonth);
    var DATE_REGEXP = /^(0[1-9]|1[0-2])\/(\d{4})$/,
        MONTH_ONLY_REGEXP = /^(0[1-9]|1[0-2])$/,
        ONE_DIGIT_MONTH = /^[2-9]$/,
        DECEMBER = /^1[3-9]$/;

    function InputTypeMonth(dateParserService) {
        return {
            restrict: 'A',
            require:'ngModel',
            link: function (scope, elm, attr, ctrl) {
                ctrl.$parsers.push(function (value) {
                    if (ctrl.$isEmpty(value)) return null;
                    if (dateParserService.isMonthType(value)) {
                        return value;
                    }
                    return dateParserService.parseMonth(value,function (val) {
                      elm.val(val);
                    });
                });

                ctrl.$formatters.push(function (value) {
                    if (dateParserService.isMonthType(value)) {
                        return value;
                    } else {
                        return '';
                    }
                });
                function validateMinDate(value, minVal) {
                    var parts = dateParserService.getMonthTypeParts(value);
                    return Boolean(parts && parseInt(parts[2]) > minVal);
                }
                if (typeof attr.minyear !== 'undefined' || attr.minyear) {
                    var minVal;
                    ctrl.$validators.minyear = function (value) {
                        return minVal === 'undefined' || isNaN(minVal) || validateMinDate(value,minVal);
                    };
                    attr.$observe('minyear', function (val) {
                        minVal = parseInt(val);
                        ctrl.$validate();
                    });
                }
                function validateMaxDate(value, maxVal) {
                    var parts = dateParserService.getMonthTypeParts(value);
                    return Boolean(parts && parseInt(parts[2]) < maxVal);
                }
                if (typeof attr.maxyear !== 'undefined' || attr.maxyear) {
                    var maxVal;
                    ctrl.$validators.maxyear = function (value) {
                        return maxVal === 'undefined' || isNaN(maxVal) || validateMaxDate(value,maxVal);
                    };
                    attr.$observe('maxyear', function (val) {
                        maxVal = parseInt(val);
                        ctrl.$validate();
                    });
                }
            }
        }
    }
    InputTypeMonth.$inject = ['dateParserService'];
})();
