(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('inputTypeMonth', InputTypeMonth);
    var ERASE_REGEXP = /^\d\d\/$/;

    function InputTypeMonth(dateParserService) {
        return {
            restrict: 'A',
            require:'ngModel',
            link: function (scope, elm, attr, ctrl) {
                elm.on('keydown', function (e) {
                    if (e.keyCode == 8) {
                        var val = e.target.value;
                        console.log(val);
                        if (ERASE_REGEXP.test(val)) {
                            e.preventDefault();
                            e.target.value = val.charAt(0);
                            return false;
                        }
                    }
                });
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
            }
        }
    }
    InputTypeMonth.$inject = ['dateParserService'];
})();
