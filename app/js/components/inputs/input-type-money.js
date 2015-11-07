(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('inputTypeMoney', InputTypeMonet);
    var MONEY_REGEXP = /^\d+([,.]\d{2})?€$/,
        FLOAT_REGEXP = /^\d+[,.]\d$/,
        FLOAT_ZERO_REGEXP = /^\d+[,.]0€$/,
        START_FLOAT_REGEXP = /^\d+[,.]€$/;

    function InputTypeMonet() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {
                function parseMoney(moneyString) {
                    return parseFloat(moneyString.replace(',', '.'));
                }
                ctrl.$parsers.push(function (value) {
                    console.log(value);
                    if (ctrl.$isEmpty(value)) return null;
                    if (MONEY_REGEXP.test(value)) {
                        var money = parseMoney(value);
                        if (!isNaN(money)) {
                            return money;
                        }
                    }
                    var val = parseMoney(value),
                        returnValue = undefined;
                    if (!isNaN(val)) {
                        var valString = String(val)
                        if (START_FLOAT_REGEXP.test(value)) {
                            valString += '.';
                        }
                        if (FLOAT_ZERO_REGEXP.test(value)) {
                            valString += '.0';
                        }
                        var p1 = valString.length,
                            p2 = p1;

                        if (FLOAT_REGEXP.test(valString)) {
                            valString += '0';
                            p2 = p2 + 1;
                            returnValue = val
                        }
                        elm.val(valString + '€');
                        elm[0].setSelectionRange(p1, p2);
                    }
                    return returnValue;
                });


                if (typeof attr.minvalue !== 'undefined' || attr.minvalue) {
                    var minVal;
                    ctrl.$validators.minvalue = function (value) {
                        return minVal === 'undefined' || isNaN(minVal) || Number(value) > Number(minVal);
                    };
                    attr.$observe('minvalue', function (val) {
                        minVal = parseInt(val);
                        ctrl.$validate();
                    });
                }

                if (typeof attr.maxvalue !== 'undefined' || attr.maxvalue) {
                    var maxVal;
                    ctrl.$validators.maxvalue = function (value) {
                        return maxVal === 'undefined' || isNaN(maxVal) || Number(value) < Number(maxVal);
                    };
                    attr.$observe('maxvalue', function (val) {
                        maxVal = parseInt(val);
                        ctrl.$validate();
                    });
                }
            }
        }
    }

})();