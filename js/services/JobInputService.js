app.factory('JobInputService', function($http, $q, HammcoJobListingWebAPI) {
    var currentJob;

    return {
        GetJobData: function(data) {
            var self = this;
            var deferred = $q.defer();
            var results = HammcoJobListingWebAPI.one('JobInfo').get(data).then(function(result){
                currentJob = result;
                deferred.resolve(result);
            });
            return deferred.promise;
        },
        SaveJobData: function(data) {
            var self = this;
            var deferred = $q.defer();
            var results = HammcoJobListingWebAPI.all('JobInfo').post(data).then(function(result){
                currentJob = result;
                deferred.resolve(result);
            });
            return deferred.promise;
        },
        CurrentJobData: function(data) {
            if(angular.isUndefined(currentJob)){
                return currentJob;
            } else {
                return currentJob;
            }
        },
        ClearCurrentJobData: function() {
            var deferred = $q.defer();
            currentJob = undefined;
            deferred.resolve(currentJob);
            return deferred.promise;
        },
        AddNewTab: function(job, type) {
            var self = this;
            var deferred = $q.defer();
            var data = { sJobNo : job, sType : type };
            var results = HammcoJobListingWebAPI.one('GetBlankTemplate').get(data).then(function(result){
                deferred.resolve(result);
            });
            return deferred.promise;
        },
        DeleteJob: function() {
            var self = this;
            var deferred = $q.defer();
            var data = { iJobID : currentJob.ID };
            currentJob.remove(data).then(function(result){
                deferred.resolve(result);
            });
            return deferred.promise;
        },
        DeleteItem: function(id, answer) {
            var self = this;
            var deferred = $q.defer();
            var data = { iItemID : id };
            var results = HammcoJobListingWebAPI.one('Item').remove(data).then(function(result){
                deferred.resolve(result);
            });
            return deferred.promise;
        },
        ReturnEmptyPromise: function() {
            var deferred = $q.defer();
            var promise = 'empty';
            deferred.resolve(currentJob);
            return deferred.promise;
        },
        GetNewEndDate: function(data) {
            var deferred = $q.defer();
            var results = HammcoJobListingWebAPI.one('GetNewEndDate').get(data).then(function(result){
                deferred.resolve(result);
            });
            return deferred.promise;
        },
        GetNewDueDate: function(data) {
            var deferred = $q.defer();
            var results = HammcoJobListingWebAPI.one('GetNewDueDate').get(data).then(function(result){
                deferred.resolve(result);
            });
            return deferred.promise;
        }
    };




});