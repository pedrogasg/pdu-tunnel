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
                            elm.on('focus', function () {
                                console.log(elm[0].value);
                                auto = false;
                            });
                        }
                        if (scope.field.type === 'select') {
                            auto = false;
                            elm.one('mousedown', function () {
                                auto = true;
                            })
                        }
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