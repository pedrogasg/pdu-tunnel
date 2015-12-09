'use strict';

(function () {
    var TunnelPhantom = angular.module('TunnelPhantom', [
  'ngRoute',
  'ngMessages',
  'ngAria',
  'ngSanitize'
    ]);
    TunnelPhantom.config(['$httpProvider', 'TunnelFieldsServiceProvider', 'ResourceServiceProvider', function ($httpProvider, TunnelFieldsServiceProvider, ResourceServiceProvider) {
        TunnelFieldsServiceProvider.setTemplateUrl('/js/components/tunnel/tunnel.html');
        TunnelFieldsServiceProvider.setfieldsUrl('/json/fields.json');
        ResourceServiceProvider.setApiUrl('/api/tools/');
        $httpProvider.interceptors.push('TunnelFieldsService');
    }]);
})();
