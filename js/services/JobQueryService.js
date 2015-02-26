app.factory('JobQueryService', function($q, $http) {
  var _GetFolders = function(params) {
      var self = this;
      var deferred = $q.defer();
      $http.get('http://axcapps.harsco.com/jobquerywebapi/api/jobquery/getfolders', params).success(function(data){
            deferred.resolve(data);
        });
      return deferred.promise;
  };
  return {
    GetFolders: _GetFolders
  };

});