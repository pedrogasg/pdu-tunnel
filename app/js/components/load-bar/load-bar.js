(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.directive('loadBar', LoadBar);
    function LoadBar(elementBindService) {
        return {
            restrict: 'E',
            templateUrl: '/js/components/load-bar/load-bar.html',
            scope: {},
            transclude: true,
            link: function (scope, elm, attr) {
                scope.process = 0;
                scope.ball = elm[0].querySelector('#bc-bullet-panel');
            },
            controller: LoadBarController
        }
    }
    function LoadBarController($scope, $rootScope) {
        var $this = this;
        $this.updateProgress = function (e,value) {
            $scope.process = parseInt(value);
            $scope.ball.style.left = value + '%';
        }

        $rootScope.$on('updateProcess', $this.updateProgress);
    }
    LoadBarController.$inject = ['$scope', '$rootScope']
    LoadBar.$inject = ['elementBindService'];
})();
