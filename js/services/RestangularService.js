//////// Get Data //////////

// Restangular services
app.service('RestangularService', function(Restangular, ServerAPI) {

  var BaseUrl = 'http://' + ServerAPI.GetServer().Name + '/CapacityPlanningWebAPI' + ServerAPI.GetAPI().Name + '/api/cp/';

  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(BaseUrl);
  });

});