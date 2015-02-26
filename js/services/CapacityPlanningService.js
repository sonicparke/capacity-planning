app.factory('CapacityPlanningService', function($http, $q, RestangularService, Restangular) {
    var currentGridData;
    var updatedRows;

        var _GetGridData = function(data) {
            var self = this;
            var deferred = $q.defer();
            var results = RestangularService.all('GetData').getList(data).then(function(result){
                currentGridData = result;
                deferred.resolve(result);
            });
            return deferred.promise;
        };
        var _RemoveAssignmentFromCP = function(data) {
            var self = this;
            var deferred = $q.defer();
            var params = { pItem: data };
            var results = RestangularService.all('RemoveAssignmentFromCP').post(params).then(function(result){
                currentGridData = result;
                deferred.resolve(result);
            });
            return deferred.promise;
        };
        var _GetDrafters = function(data) {
            var self = this;
            var deferred = $q.defer();
            var results = RestangularService.all('GetDrafters').getList().then(function(result){
                currentGridData = result;
                deferred.resolve(result);
            });
            return deferred.promise;
        };

        // var _GetLBData = function(data) {
        //     var self = this;
        //     var deferred = $q.defer();
        //     var results = RestangularService.all('GetLBData').getList(data).then(function(result){
        //         currentGridData = result;
        //         deferred.resolve(result);
        //     });
        //     return deferred.promise;
        // };
        // var _GetWCJHData = function(data) {
        //     var self = this;
        //     var deferred = $q.defer();
        //     var results = RestangularService.all('GetWCJHData').getList(data).then(function(result){
        //         currentGridData = result;
        //         deferred.resolve(result);
        //     });
        //     return deferred.promise;
        // };
        var _CurrentGridData = function() {
            var self = this;
            var deferred = $q.defer();
            deferred.resolve(currentGridData);
            return deferred.promise;
        };
        // var _SetUpdatedRows = function(data) {
        //     if(data){
        //         updatedRows = data;
        //     } else {
        //         return updatedRows;
        //     }
        // };
        // var _UpdateShippedDueDate = function(data, rowIndex) {
        //     var self = this;
        //     var deferred = $q.defer();
        //     var results = RestangularService.all('UpdateShippedDueDate').post(data, rowIndex).then(function(result){
        //         // Push changes to currentGridData
        //         currentGridData.rows[rowIndex].items[0].scheduleddate = data.ScheduledDate;
        //         currentGridData.rows[rowIndex].items[0].shippeddate = data.ShippedDate;
        //         currentGridData.rows[rowIndex].items[0].tooltip = 'Scheduled Date:' + data.ScheduledDate;
        //         deferred.resolve(result);
        //     });
        //     return deferred.promise;
        // };
        // var _GetWorkCenters = function(data) {
        //     var self = this;
        //     var deferred = $q.defer();
        //     var results = RestangularService.all('GetWorkCenters').getList().then(function(result){
        //         workCenters = result;
        //         deferred.resolve(result);
        //     });
        //     return deferred.promise;
        // };
        // var _SaveWorkCenter = function(data) {
        //     var self = this;
        //     var deferred = $q.defer();
        //     var results = RestangularService.all('SaveWorkCenter').post(data).then(function(result){
        //         deferred.resolve(result);
        //     });
        //     return deferred.promise;
        // };
        // var _SaveJobWorkCenterDayHours = function(data) {
        //     var self = this;
        //     var deferred = $q.defer();
        //     var results = RestangularService.all('SaveJobWorkCenterDayHours').post(data).then(function(result){
        //         deferred.resolve(result);
        //     });
        //     return deferred.promise;
        // };
        // var _GetJobWorkCenterDayHours = function(data) {
        //     var test;
        //     var self = this;
        //     var deferred = $q.defer();
        //     var results = RestangularService.one('GetJobWorkCenterDayHours').get(data).then(function(result){
        //         deferred.resolve(result);
        //     });


        //     return deferred.promise;
        // };
        // var _ClearHoursForJobWorkCenter = function(data) {
        //     var self = this;
        //     var deferred = $q.defer();
        //     var results = RestangularService.all('ClearHoursForJobWorkCenter').post(data).then(function(result){
        //         deferred.resolve(result);
        //     });
        //     return deferred.promise;
        // };
    return {
        GetGridData: _GetGridData,
        CurrentGridData:  _CurrentGridData,
        RemoveAssignmentFromCP: _RemoveAssignmentFromCP,
        GetDrafters: _GetDrafters
    };
});