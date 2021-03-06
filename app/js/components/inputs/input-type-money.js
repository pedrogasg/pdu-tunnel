﻿(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('inputTypeMoney', inputTypeMoney);
    var MONEY_REGEXP = /^\d+([,.]\d{2})?€$/,
        MONEY_EXCEPTION_REGEXP = /^\d+[,.][1-9]{2}\d+€$/,
        FLOAT_REGEXP = /^\d+[,.]\d$/,
        FLOAT_ZERO_REGEXP = /^\d+[,.]0€$/,
        START_FLOAT_REGEXP = /^\d+[,.]€$/,
        FIRST_ENTRY = /\d/;
    function inputTypeMoney() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {
                var minVal;
                function parseMoney(moneyString) {
                    return parseFloat(moneyString.replace(',', '.'));
                }
                ctrl.$parsers.push(function (value) {
                    if (ctrl.$isEmpty(value)) return null;
                      if(value === '€'){
                        elm.val('');
                        return null;
                      }

                    if (minVal !== undefined && minVal == 0 && value == "0" && scope.tunnel.goToNextInput) {
                        scope.tunnel.goToNextInput(scope.field);
                        elm.val('0€');
                        return 0
                    }
                    if(MONEY_EXCEPTION_REGEXP.test(value)){
                        var exception = parseMoney(value).toFixed(2);
                        elm.val(exception+'€');
                        if(scope.tunnel.goToNextInput){
                          scope.tunnel.goToNextInput(scope.field);
                        }
                        return exception;
                    }
                    var pars = MONEY_REGEXP.exec(value);
                    if (pars && pars.length) {
                        var money = parseMoney(value);
                        if (!isNaN(money)) {
                            if(pars[1] && scope.tunnel.goToNextInput){
                              scope.tunnel.goToNextInput(scope.field);
                          }
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
                            returnValue = val;
                        }

                        elm.val(valString + '€');
                        elm[0].setSelectionRange(p1, p2);
                    }
                    return returnValue;
                });


                if (typeof attr.minvalue !== 'undefined' || attr.minvalue) {

                    ctrl.$validators.minvalue = function (value) {
                        return minVal === 'undefined' || isNaN(minVal) || Number(value) >= Number(minVal);
                    };
                    attr.$observe('minvalue', function (val) {
                        minVal = parseInt(val);
                        ctrl.$validate();
                    });
                }

                if (typeof attr.maxvalue !== 'undefined' || attr.maxvalue) {
                    var maxVal;
                    ctrl.$validators.maxvalue = function (value) {
                        return maxVal === 'undefined' || isNaN(maxVal) || Number(value) <= Number(maxVal);
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
