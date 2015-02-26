app.service('AppSecurityWebAPI', function(Restangular, ServerAPI) {

      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://axcapps.harsco.com/appsecuritywebapi/api/');
      });

});