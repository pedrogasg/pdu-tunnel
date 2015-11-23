(function () {
    var TunnelPhantom = angular.module('TunnelPhantom')
    TunnelPhantom.provider('tunnelTemplateBuffer', tunnelTemplateBuffer);

    function tunnelTemplateBuffer() {
        this.$get = ['$templateCache', '$q', '$log', '$cacheFactory', function ($templateCache, $q, $log, $cacheFactory) {
            function buildTemplate(fields) {
                var templateBuffer = [];
                for (var i = 0,field; field =  fields[i];i++) {
                    templateBuffer.push(['<div control-type-', field.type, ' parent-key="tunnel.fields[\'', field.name, '\'].name" parent-tunnel="tunnel" field="tunnel.fields[\'', field.name, '\']"></div>'].join(''));
                }
                return templateBuffer.join('');
            }
            function getFields() {
              var initInjector = angular.injector(['ng']);
              var $http = initInjector.get('$http');
              return $http.get('/app/json/fields.json');
            }
        var responseInterceptor = {
          response: function(response) {
            var deferred = $q.defer();
            if(response.config.url == '/app/js/components/tunnel/tunnel.html'){
               getFields().then(function(jsonResponse){
                 var fields = jsonResponse.data,
                 data = response.data
                response.data = data.replace('<!--replace-->',buildTemplate(fields))
                deferred.resolve(response);
              });
            }else{
                  deferred.resolve(response);
            }
              return deferred.promise;
          },
          request: function(config) {
            //console.log(config)
              var deferred = $q.defer();
                  deferred.resolve(config);
              return deferred.promise;
          }
        };

            return responseInterceptor;
        }];
    }
})();
