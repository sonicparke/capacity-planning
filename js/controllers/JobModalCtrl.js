app.controller('JobModalCtrl', [ '$scope', '$rootScope', '$filter', '$controller', '$modalInstance', 'CapacityPlanningService', 'User', 'data', function ($scope, $rootScope, $filter, $controller, $modalInstance, CapacityPlanningService, User, data){

    $controller('LoadBalancingViewCtrl', {$scope: $scope});

    $scope.InitModal = function() {
        $scope.DatepickerOpened = false; // Used for adjusting ModalBody height if too short for datepicker popup
    };


    $scope.thisRow = data.rowData;
    $scope.rowIndex = $scope.thisRow.rowIndex;
    $scope.gridRows = data.gridRows;
    $scope.cellIndex = data.cellIndex;
    $scope.jobid = data.jobid;
    $scope.jobNumber = data.jobnumber;
    $scope.rowsToReplace = data.rowsToReplace;
    $scope.Drafters = data.drafterList;
    $scope.selectedDate = data.selectedDate;
    $scope.showEditHours = undefined;
    $scope.hasJobs = data.hasJobs;

    var notIssued;
    angular.forEach($scope.hasJobs, function(value, key){
        if(value.issued === false) {
            notIssued = true;
            // $scope.hasJobs.push(notIssued);
        }
    });

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

    $scope.OriginalRow = angular.copy($scope.thisRow.entity.items); // Make a copy of the original row so updates can be cancelled

    $scope.getJobIndex = function (index, row) {
        $scope.JobIndex = index;
        $scope.Drafter = $scope.thisRow.entity.items[$scope.cellIndex].jobs[$scope.JobIndex].drafter;
    };

    $scope.WatchforChange = function (index, item) {
        $scope.disabledEditHoursButton = index;
        $scope.thisRow.entity.items[$scope.cellIndex].jobs[index].jobedited = 1;
    };

    $scope.SubmitUpdate = function (index) {
        var updateRowData = { pItem:  $scope.thisRow.entity.items, sUserID: User };
        $scope.UpdateDataResults = GridData.all('UpdateData').post(updateRowData);
        return $scope.UpdateDataResults.then(function(data){
            if(data.Message){
                $scope.alerts.push({msg: data.Message, type:'error', autoclose: true, autoclosetime: 3000});
            } else {
                $scope.DumpOriginalRow = true;
                $scope.showCSVExport = false;
                $scope.thisRow.entity.items = data.CurrentRow;
                // Update the row the job was re-assigned to
                if(data.ReAssignedRow){
                    angular.forEach($scope.gridRows, function(value, key){
                        var result = _.contains(value.items[0].value, data.ReAssignedRow[0].value);
                        if(result === true){
                          $scope.updateReAssignedDrafterRow = key;
                        }
                    });
                    $scope.gridRows[$scope.updateReAssignedDrafterRow].items = data.ReAssignedRow;
                }
                updateRowData = {};
            }
        });
    };

    $scope.cancel = function(result){
        $modalInstance.close(result);
        if($scope.DumpOriginalRow === true) {
            return;
        } else {
            $scope.thisRow.entity.items = $scope.OriginalRow;
        }
    };

    $scope.editHours = function (index, item, drafter) {
        $scope.disabled = true;
        var params = {iAssignmentID: item.assignmentid, iTotalHours: item.hours, sDrafter: drafter};
        $scope.GetAssignmentDayHoursResults = GridData.all('GetAssignmentDayHours').getList(params);
        return $scope.GetAssignmentDayHoursResults.then(function(data){
            console.log('data :', data);
            $scope.showEditHours = index;
            $scope.GetAssignmentDayHoursItems = data;
        });
    };

    $scope.updateHours = function (item) {
        $scope.updatingHrs = true;
        $scope.disabled = true;
        var params = {lADH: item};
        $scope.UpdateAssignmentDayHoursResults = GridData.all('UpdateAssignmentDayHours').post(params);
        return $scope.UpdateAssignmentDayHoursResults.then(function(data){
            if(data === '""'){
                $scope.showEditHours = undefined;
            } else {
                $scope.alerts.push({msg: data, type:'error', autoclose: false, autoclosetime: 3000});
            }
        });
    };

    $scope.cancelUpdateHours = function (index) {
        $scope.showEditHours = undefined;
        $scope.disabled = false;
    };

    $scope.JobRerouteCheck = function (item) {
        $scope.RouteChangedTitle = "Syteline Route Changed";
        if(item.jobrerouted && notIssued){
            if(angular.equals( item.routedstartdate, item.startdate) && angular.equals( item.routedduedate, item.duedate)){
                item.jobreroutecheckflag = true;
                item.prevstartdate = item.LastStartDate;
                item.prevduedate = item.LastDueDate;

                $scope.ButtonOneText = "Acknowledge";
                $scope.ShowButtonTwo = false;

                $scope.prevstartdatelabel = "Prev Start";
                $scope.prevduedatelabel = "Prev Due";
                $scope.newstartdatelabel = "New Start";
                $scope.newduedatelabel = "New Due";
            } else {
                item.jobreroutecheckflag = 'true';
                item.prevstartdate = item.StartDate;
                item.prevduedate = item.DueDate;

                $scope.ButtonOneText = "Allow Change";
                $scope.ButtonTwoText = "Keep Override";
                $scope.ShowButtonTwo = true;

                $scope.prevstartdatelabel = "Override Start";
                $scope.prevduedatelabel = "Override Due";
                $scope.newstartdatelabel = "New Start";
                $scope.newduedatelabel = "New Due";
            }
        }
    };

    $scope.AcknowledgeReRoute = function (index, item, accept) {
        var updateRowData = {iAssignmentID: item.assignmentid, sStartDate: searchParams.sStartDate , sEndDate: searchParams.sEndDate, sRoutedStartDate: item.routedstartdate, sRoutedDueDate: item.routedduedate, bAccept: accept};
        $scope.AcknowledgeReRouteResults = GridData.all('AcknowledgeReRoute').post(updateRowData);
        return $scope.AcknowledgeReRouteResults.then(function(data){
            if(data){
                 item.jobrerouted = undefined;
                 item.jobrerouteCheckFlag = undefined;
                 $scope.thisRow.entity.items = data;
                 $scope.DumpOriginalRow = true;
                 updateRowData = {};
            } else {
                $scope.alerts.push({msg: data, type:'error', autoclose: true, autoclosetime: 3000});
            }
        });

    };

    $scope.RemoveAssignment = function (row, index) {
        $scope.thisRow.entity.items[$scope.cellIndex].jobs[index].jobedited = 1;
        $scope.RowToRemove = $scope.thisRow.entity;

        var updateRowData = { pItem:  $scope.RowToRemove.items, sUserID: User };

        $scope.UpdateDataResults = GridData.all('RemoveAssignmentFromLB').post(updateRowData);
        return $scope.UpdateDataResults.then(function(data){
            if(data.Message){
                $scope.alerts.push({msg: data.Message, type:'error', autoclose: true, autoclosetime: 3000});
            } else {
                $scope.DumpOriginalRow = true;
                $scope.thisRow.entity.items = data.CurrentRow;
                updateRowData = {};
            }
        });

    };


    $scope.cancel = function(result){
        $modalInstance.close(result);
    };



}]);