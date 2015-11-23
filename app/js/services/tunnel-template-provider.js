(function () {
    var TunnelPhantom = angular.module('TunnelPhantom');
    TunnelPhantom.provider('TunnelTemplateProvider', TunnelTemplateProvider);

    function TunnelTemplateProvider() {
        this.$get = ['$templateCache', '$http', '$q', '$log', '$cacheFactory', function ($templateCache, $http, $q, $log, $cacheFactory) {
            function buildTemplate(fields) {
                var templateBuffer = [];
                for (var key in fields) {
                    var field = fields[key];

                    div = angular.element(['<div control-type-', field.type, ' parent-key="tunnel.fields[\'', key, '\'].name" parent-tunnel="tunnel" field="tunnel.fields[\'', key, '\']"></div>'].join(''));
                    if (!first) {
                        first = field;
                    }
                    field['element'] = div;
                    if (oldDiv) {
                        oldDiv.after(div);
                    } else {
                        form.prepend(div);
                    }
                    oldDiv = div;
                }
            }
            function generateTemplate(url) {
                var tunnelTemplateCache = $cacheFactory('tunnelTemplate'),
                    httpOptions = {
                        cache: tunnelTemplateCache
                };

                return $http.get(url, httpOptions)
                    .then(function (response) {
                        var fields = response.data
                    })
                  .then(function (template) {
                      $templateCache.put(tpl, template);
                      return template;
                  }, handleError);

                function handleError(resp) {
                    $log.error(resp);
                    return $q.reject(resp);
                }
            }

            return getTemplate;
        }];
    }
});