(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('inputTypeMonth', InputTypeMonth);
    var DATE_REGEXP = /^(\d\d)\/(\d{4})$/,
        MONTH_ONLY_REGEXP = /^(\d\d)$/,
        ONE_DIGIT_MONTH = /^(\d)\/$/;
    
    function InputTypeMonth() {
        return {
            restrict: 'A',
            require:'ngModel',
            link: function (scope, elm, attr, ctrl) {
                ctrl.$parsers.push(function (value) {
                    if (ctrl.$isEmpty(value)) return null;
                    if (DATE_REGEXP.test(value)) {
                        return value;
                    }
                    if (ONE_DIGIT_MONTH.test(value)) {
                        var month = parseInt(value);
                        if (month < 1) month = 1;
                        value = ("0" + month + "/").slice(-3);
                        elm.val(value);
                        return undefined;
                    }
                    if (MONTH_ONLY_REGEXP.test(value)) {
                        var month = parseInt(value);
                        if (month > 12) month = 12;
                        if (month < 1) month = 1;
                        value = ("0" + month + "/").slice(-3);
                        elm.val(value);
                        return undefined;
                    }
                    return undefined;
                });

                ctrl.$formatters.push(function (value) {
                    if (DATE_REGEXP.test(value)) {
                        return value;
                    } else {
                        return '';
                    }
                });
                function validateMinDate(value, minVal) {
                    var parts = DATE_REGEXP.exec(value)
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
                    var parts = DATE_REGEXP.exec(value)
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

})();