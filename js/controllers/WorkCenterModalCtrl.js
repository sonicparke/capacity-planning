app.controller('WorkCenterModalCtrl', function ($scope, $rootScope, $filter, $controller, $modalInstance, CapacityPlanningService, User, data){

    $controller('LoadBalancingViewCtrl', {$scope: $scope});
    $scope.thisRow = data.rowData;
    $scope.rowIndex = $scope.thisRow.rowIndex;
    $scope.rowsToReplace = data.rowsToReplace;
    $scope.gridRows = data.gridRows;
    $scope.cellIndex = data.cellIndex;
    $scope.jobNumber = data.jobnumber;
    $scope.workcenter = data.workcenter;
    $scope.data = data.data;
    $scope.hours = $scope.data.JobWorkCenterDayHours;
    $scope.jobid = $scope.data.JobID;
    $scope.workcenterid = $scope.data.WorkCenterID;
    $scope.itemid = $scope.data.ItemID;
    $scope.DatepickerOpened = false; // Used for adjusting ModalBody height if too short for datepicker popup

    var dateFilter = $filter('date');

    $scope.alerts = [];
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


    // Setup Save Alerts
    $scope.saveAlerts = [];
    $scope.closeSaveAlert = function (index) {
        $scope.saveAlerts.splice(index, 1);
    };


    $scope.UpdateHours = function () {
        $scope.saveAlerts = [];
        $scope.data.CompletedDate = dateFilter($scope.data.CompletedDate, 'MM/dd/yyyy');
        $scope.data.RowClass = data.rowclass;
        return CapacityPlanningService.SaveJobWorkCenterDayHours($scope.data).then(function(result){
            if(result.MessageType === 'error'){
                $scope.saveAlerts.push({msg: result.Message, type:'error', autoclose: true, autoclosetime: 3000, showClose: false});
                return;
            }
            else {
                $scope.saveAlerts.push({msg: 'Job Successfully Saved!', type:'success', autoclose: true, autoclosetime: 3000, showClose: false});


                angular.forEach($scope.rowsToReplace, function(row, i){
                  $scope.gridRows[row].items = result[i].items;
                });
                $modalInstance.close(result);
                return;
            }
        });
    };

    $scope.cancel = function(result){
        $modalInstance.close(result);
    };

    $scope.ResetToDefault = function(){
        var params = {
                JobID :  $scope.jobid,
                WorkCenterID: $scope.workcenterid,
                ItemID: $scope.itemid,
                SearchStart: data.searchstart,
                SearchEnd: data.searchend,
                RowClass: data.rowclass
            };
        return CapacityPlanningService.ClearHoursForJobWorkCenter(params).then(function(result){
            if(result.MessageType === 'error'){
                $scope.saveAlerts.push({msg: result.Message, type:'error', autoclose: true, autoclosetime: 3000, showClose: false});
                return;
            }
            else {
                $scope.saveAlerts.push({msg: 'Hours Reset!', type:'success', autoclose: true, autoclosetime: 3000, showClose: false});
                angular.forEach($scope.rowsToReplace, function(row, i){
                  $scope.gridRows[row].items = result[i].items;
                });
                $modalInstance.close(result);
                return;
            }
        });
    };

});