app.controller('JobSearchViewCtrl', function ($scope, $timeout, $state, HammcoJobListingWebAPI, User, JobInputService, JobNumberService){

    // Setup Alerts
    $scope.alerts = [];
    $scope.closeAlert = function (array, index) {
        $scope.alerts = array;
        $scope.alerts.splice(index, 1);
    };


    // Initial Functions
    $scope.InitPage = function() {
        $scope.focusInput = true;
        $scope.UserID = User;
        $scope.selected = {};
        $scope.jobExists = true; // Disables Add New Job button on page load
    };

    $scope.GetFolders  = function (data) {
        var params = { sIn: data };
        JobNumberService.GetJobNumbers(params).then(function(result) {
            $scope.jobs = result;
            $scope.jobExists = JobNumberService.JobExists();
        });
    };

    $scope.CreateNewJob = function(job) {
        console.log('job :', job);
        var params = {
            pJobNo: job
        };

        return JobInputService.GetJobData(params).then(function(result) {
            if(result.MessageType === 'error'){
                $scope.alerts.push({msg: result.Message, type:'error', autoclose: true, autoclosetime: 3000, showClose: false});
            } else {
                $state.go('job');
            }
        });

    };

    // Gets the selected job for use across all views
    $scope.SelectedJob = function (data) {

        $scope.JobSearchErrors = [];

        $scope.JobNumber = data.sJob; // Set the JobNumber for Cross-Controller Use
        var params = {
            pJobNo: $scope.JobNumber
        };
        $scope.jobListLoading = true;
        return JobInputService.GetJobData(params).then(function(result){
            $scope.jobListLoading = false;
            if(result.MessageType === 'error'){
                $scope.alerts.push({msg: result.Message, type:'error', autoclose: true, autoclosetime: 3000, showClose: false});
            } else {
                $state.go('job');
            }
        });

    };

    $scope.ClearJob = function() {
        $scope.selected = '';
    };

});