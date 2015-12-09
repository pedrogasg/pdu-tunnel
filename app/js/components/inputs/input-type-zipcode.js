(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('inputTypeZipcode', inputTypeZipcode);
    var ERASE_REGEXP = /((?!\d+).)*/g;

    function inputTypeZipcode() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {

                ctrl.$parsers.push(function (value) {
                    if (ctrl.$isEmpty(value)) return null;
                    if (ERASE_REGEXP.test(value)) {
                        var newValue = value.replace(ERASE_REGEXP, '');
                        elm.val(newValue);
                        return newValue;
                    }
                });
            }
        }
    }
})();
