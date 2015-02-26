app.controller('JobViewCtrl', function ($scope, $rootScope, $location, $http,  $timeout, $filter, CapacityPlanningService, JobQueryService){

    // Initial Functions
    $scope.InitPage = function() {
        $rootScope.PageSubTitle = "Job View";
        $scope.GetDataItems = [];
        $scope.showGrid = false;
        $scope.showCSVExport = false;
        $scope.saving = false;
        $scope.columnDefs = []; // Set the Grid Data Variables

        // Setup format for form data sumission
        var blankFormData = {
            // sStartDate: "",
            // sEndDate: "",
            sUserID: $scope.UserID,
            sGridData: "CP"
        };
        $scope.searchParams = angular.copy(blankFormData); // Make copy of form data model
        $scope.minDate = $scope.searchParams.sStartDate;
    };

    $scope.GetFolders  = function (data) {
        var params = { params: { issued: true, search: data } };
        $scope.jobListLoading = true;
        return JobQueryService.GetFolders(params).then(function(data){
            $scope.jobListLoading = false;
            $scope.folders = [];
            angular.forEach(data, function(value, key){
              $scope.folders.push(value);
            });
            return $scope.folders;
        });
    };

    $scope.ClearJob = function() {
      $scope.searchParams.selectedJob = '';
      $scope.folders = '';
    };

    $scope.SetEndDate = function() {
        if($scope.searchParams.sEndDate === "") {
            $scope.searchParams.sEndDate = $scope.searchParams.sStartDate;
        } else {
            return;
        }
    };

    $scope.$watch('searchParams.sEndDate', function(EndDate) {
        var dateFilter = $filter('date');
        $scope.searchParams.sEndDate = dateFilter($scope.searchParams.sEndDate, 'MM/dd/yyyy');
    });


    $scope.GetGridData  = function (data) {
        var dateFilter = $filter('date');
        data.sStartDate = dateFilter(data.sStartDate, 'MM/dd/yyyy');
        data.sEndDate = dateFilter(data.sEndDate, 'MM/dd/yyyy');
        $scope.showGrid = false;
        $scope.showCSVExport = false;
        $scope.alerts.length = 0;

        return CapacityPlanningService.GetGridData(data).then(function(result){
            if(result.MessageType === 'error') {
                $scope.alerts.push({msg: result.Message, type:result.MessageType, autoclose: true, autoclosetime: 3000});
                return;
            }
            else {
                $scope.GridDataItems = result;
                if(angular.equals( $scope.GridDataItems.rows, [])){
                    $scope.alerts.push({msg: 'No Data to Display', type:'error'});
                } else {
                    $scope.columnDefs = $scope.GridDataItems.columns;
                    $scope.LegendItems = $scope.GridDataItems.legend;
                    console.log('$scope.columnDefs :', $scope.columnDefs);
                    // Push the cell template into the columns array
                    angular.forEach($scope.columnDefs, function(value, key){
                        value.cellTemplate = cellClassTemplate;
                    });
                    $scope.showGrid = true;
                    $scope.showCSVExport = true;
                    // $scope.GetJobNumbersForFiltering();
                    // $scope.GetJobNumbersInRange();
                }
            }
        });




        // $scope.GridDataResults = CapacityPlanningService.all('GetJVData').getList(data);
        // return $scope.GridDataResults.then(function(data){
        //     $scope.GridDataItems = data;
        //     if(angular.equals( $scope.GridDataItems.rows, [])){
        //         $scope.alerts.push({msg: 'No Data to Display', type:'error'});
        //     } else {
        //         $scope.columnDefs = $scope.GridDataItems.columns;
        //         $scope.LegendItems = $scope.GridDataItems.legend;
        //         // Push the cell template into the columns array
        //         angular.forEach($scope.columnDefs, function(value, key){
        //             value.cellTemplate = cellClassTemplate;
        //         });
        //         $scope.showGrid = true;
        //         $scope.showCSVExport = true;
        //         // $scope.GetJobNumbersForFiltering();
        //         $scope.GetJobNumbersInRange();
        //     }
        // });
    };

    $scope.RemoveRow = function (row) {
        $scope.saving = true;
        return CapacityPlanningService.GetGridData(row).then(function(result){
            if(result.MessageType === 'error') {
                $scope.alerts.push({msg: result.Message, type:result.MessageType, autoclose: true, autoclosetime: 3000});
                $scope.saving = false;
                return;
            }
            else {
                $scope.GridDataItems = result;
                if(angular.equals( $scope.GridDataItems.rows, [])){
                    $scope.alerts.push({msg: 'No Data to Display', type:'error'});
                } else {
                    $scope.GridDataItems.rows.splice(row.rowIndex, 1);
                    $scope.saving = false;
                }
            }

        });
    };



    var cellClassTemplate = '<div class="ngCellText " ng-class="row.entity.items[col.index].cellclass"><span ng-cell-text>{{row.getProperty(col.field)}} <a class="removeButton clickable pull-right" ng-show="row.getProperty(col.field)==\'Not On WIP\'" ng-click="RemoveRow(row)"><i class="fa fa-times"></i></a></span></div>';

    ////////// ngGrid Config //////////
    $scope.GridItems = {
        data: 'GridDataItems.rows',
        enableColumnResize: true,
        enableCellSelection: false,
        enableRowSelection: false,
        enableHighlighting: true,
        enablePinning: true,
        multiSelect: true,
        showColumnMenu: false,
        rowHeight: 20,
        headerRowHeight: 30,
        footerRowHeight: 30,
        showFooter: false,
        showFilter: false,
        columnDefs: 'columnDefs'
    };


    // THIS LOOPS THROUGH THE MODEL TO GET THE ITEMS FOR THE TYPEAHEAD MODEL
    // $scope.GetJobNumbersInRange = function() {
    //   var typeaheadItems = [];
    //   angular.forEach($scope.GridDataItems.rows, function(value, key){
    //     angular.forEach(value.items, function(value, key){
    //         var result = _.contains(value.title, 'Job');
    //         if(result === true){
    //           typeaheadItems.push(value.value);
    //         }
    //     });
    //   });
    //   $scope.jobNumbersInRange =  _.uniq(typeaheadItems); // REMOVE DUPLICATES
    // };

    // SET THE HIGHLIGHTED CELL HERE
    // $scope.FilterRow = function(selected){
    //   angular.forEach($scope.GridDataItems.rows, function(value, key){
    //     var row = key;
    //     angular.forEach(value.items, function(value, key){
    //       var cell = value;
    //       angular.forEach(value.jobs, function(value, key){
    //         var result = _.contains(value.job, selected);
    //         if(result === true){
    //           cell.highlight = true;
    //         } else {
    //           cell.highlight = false;
    //         }
    //       });
    //     });
    //   });
    // };

    // $scope.ClearFindJob = function() {
    //     $scope.findJob = '';
    //     $scope.HighlightCell();
    // };

});