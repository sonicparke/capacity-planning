app.controller('DatePickerCtrl', function ($scope, $timeout){


    $scope.showWeeks = false;
    // $scope.opened = false;

    $scope.open = function($event) {
        // $timeout(function() {
        //   $scope.opened = true;
        // });
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    // Watch for Datepicker to be opened then add datepickerOnly class to adjust ModalBody min-height.
    $scope.$watch('opened', function(oldV, newV){
        $scope.$parent.DatepickerOpened = $scope.opened;
        console.log('$scope.$parent.DatepickerOpened :', $scope.$parent.DatepickerOpened);
        console.log('$scope.$parent :', $scope.$parent);
    });

    $scope.dateOptions = {
        'year-format': "'yyyy'",
        'starting-day': 0
    };

    $scope.formats = ['MM/dd/yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[0];

});