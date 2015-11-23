'use strict';

(function () {
    var TunnelPhantom = angular.module('TunnelPhantom', [
  'ngRoute',
  'ngMessages',
  'ngAria',
  'ngSanitize'
    ]);
    TunnelPhantom.config( ['$httpProvider',function ($httpProvider) {
        $httpProvider.interceptors.push('tunnelTemplateBuffer');
    }]);
})();
