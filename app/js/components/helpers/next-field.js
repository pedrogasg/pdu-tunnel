(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('nextField', NextField);
    function NextField() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (Boolean(attr.nextField)) {
                    var next = document.getElementsByName(attr.nextField),
                        auto = Boolean(attr.autoChange);
                    if (auto) {
                        ctrl.$viewChangeListeners.push(function (t) {
                            if (auto && ctrl.$valid) {
                                setTimeout(function () {
                                    next[0].focus();
                                }, 100);
                            }
                        });
                        if (scope.field.type === 'yesno') {
                            auto = false;
                            elm.on('click', function () {
                              next[0].focus();
                              console.log('here');
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
                      next[0].focus();
                    }
                    elm.on("keydown", function (e) {
                        var code = e.keyCode || e.which;
                        if (!e.shiftKey && (code === 13 || code == 9)) {
                            e.preventDefault();
                            if (ctrl.$valid) {
                                next[0].focus();
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
