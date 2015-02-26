app.controller('MainCtrl', function ($scope, $rootScope, $location, User, AuthService){

    // Setup Alerts
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    // Initial Functions
    $scope.InitPage = function() {
        $scope.PageTitle = "Capacity Planning";
        $scope.UserID = User;
        // $scope.GetFolders(9);
        $scope.selectedJob = '';
    };

    AuthService.IsAdmin().then(function(result){
        $scope.isAdmin = result;
    });

    AuthService.JobInput().then(function(result){
        $scope.jobInput = result;
    });


});

