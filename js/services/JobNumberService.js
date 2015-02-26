app.factory('JobNumberService', function($http, $q, CapacityPlanningService) {
    var jobs = [];
    return {
        GetJobNumbers: function(data) {
            var self = this;
            var deferred = $q.defer();
            var results = CapacityPlanningService.all('GetJobs').getList(data).then(function(result){
                jobs = result;
                deferred.resolve(result);
            });
            return deferred.promise;
        },
        JobExists: function() {
            if(_.isEmpty(jobs)){
                return false;
            }
            else {
                return true;
            }

        }
    };
});