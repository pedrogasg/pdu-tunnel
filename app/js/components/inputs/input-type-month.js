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
                        return !dateParserService.eraseSlash(e.target.value, function (value) {
                            e.preventDefault();
                            e.target.value = value;
                        });
                    }
                });
                ctrl.$parsers.push(function (value) {
                    if (ctrl.$isEmpty(value)) return null;
                    if (dateParserService.isMonthDate(value)) {
                        return value;
                    }
                    return dateParserService.parseMonth(value,function (val) {
                      elm.val(val);
                    });
                });

                ctrl.$formatters.push(function (value) {
                    if (dateParserService.isMonthDate(value)) {
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
