(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('nextField', NextField);
    function NextField() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (Boolean(attr.nextField)) {

                    var auto = Boolean(attr.autoChange);
                    if (auto) {
                        ctrl.$viewChangeListeners.push(function (t) {
                            if (auto && ctrl.$valid) {
                                scope.goToNextInput();
                            }
                        });
                        if (scope.field.type === 'yesno') {
                            auto = false;
                            elm.on('click', function () {
                                scope.goToNextInput();
                            });
                        }
                        if (scope.field.type === 'select') {
                            auto = false;
                            elm.one('mousedown', function () {
                                auto = true;
                            });
                        }
                    }
                    scope.goToNextInput = function () {
                        scope.tunnel.validInput(scope.field);
                        setTimeout(function () {
                            var field = scope.field.next,
                                tunnel = scope.tunnel;
                            if (field) {
                                while (!field.isVisible(tunnel)) {
                                    field = field.next;
                                }
                                var input = field.element.find(field.subtype);
                                input[0].focus();
                            }
                        }, 100);
                    }
                    elm.on("keydown", function (e) {
                        var code = e.keyCode || e.which;
                        if (!e.shiftKey && (code === 13 || code == 9)) {
                            e.preventDefault();
                            if (ctrl.$valid) {
                                scope.goToNextInput();
                            } else {
                                ctrl.$setTouched();
                                scope.$apply();
                            }
                            return true;
                        }
                    });
                }
            }
        }
    }

})();
