app.controller('LoadBalancingViewCtrl', function ($scope, $rootScope, $filter, $modal, CapacityPlanningService, AuthService){

    AuthService.IsAdmin().then(function(result){
        $scope.isAdmin = result;
    });

    // Initial Functions
    $scope.InitPage = function() {
        $rootScope.PageSubTitle = "Load Balancing";
        $scope.showGrid = false;
        $scope.columnDefs = []; // Set the Grid Data Variables
        $scope.searchParams ={};
        $scope.GetDrafters();

        // Setup format for form data sumission
        // var blankFormData = {
        //     sStartDate: "",
        //     sEndDate: "",
        // };
        var blankFormData = {
            sUserID: $scope.UserID,
            sGridData: "LB"
        };
        $scope.searchParams = angular.copy(blankFormData); // Make copy of form data model
        // $scope.minDate = $scope.searchParams.sStartDate;
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

    $scope.GetGridData  = function (data) {
        $scope.GridDataItems = [];
        var dateFilter = $filter('date');
        data.sStartDate = dateFilter(data.sStartDate, 'MM/dd/yyyy');
        data.sEndDate = dateFilter(data.sEndDate, 'MM/dd/yyyy');
        $scope.showGrid = false;
        $scope.showCSVExport = false;
        $scope.alerts.length = 0;

        return CapacityPlanningService.GetGridData(data).then(function(result){
            $scope.GridDataItems = result;
            if(angular.equals( $scope.GridDataItems.rows, [])){
                $scope.alerts.push({msg: 'No Data to Display', type:'error'});
            } else {
                $scope.columnDefs = $scope.GridDataItems.columns;
                $scope.LegendItems = $scope.GridDataItems.legend;
                // Push the cell template into the columns array
                angular.forEach($scope.columnDefs, function(value, key){
                    value.cellTemplate = cellClassTemplate;
                });
                $scope.showGrid = true;
                $scope.GetJobNumbersInRange();
            }
        });
    };

    var rowClassTemplate = '<div style="height: 100%" class="{{row.entity.rowclass}}"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                           '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                           '<div ng-cell></div>' +
                     '</div></div>';

    var cellClassTemplate = '<div ng-class="{highlight: row.entity.items[col.index].highlight }" ><div class="ngCellText" ng-click="CellClick(row, $index, col.index)" tooltip="{{row.entity.items[col.index].tooltip}}" tooltip-placement="top" ng-class="row.entity.items[col.index].cellclass"><span ng-cell-text >{{row.getProperty(col.field)}} </span></div></div>';

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
        headerRowHeight: 100,
        footerRowHeight: 30,
        showFooter: false,
        showFilter: false,
        columnDefs: 'columnDefs',
        rowTemplate: rowClassTemplate
    };

    // THIS LOOPS THROUGH THE MODEL TO GET THE ITEMS FOR THE TYPEAHEAD MODEL
    $scope.GetJobNumbersInRange = function() {
      var typeaheadItems = [];
      angular.forEach($scope.GridDataItems.rows, function(value, key){
        angular.forEach(value.items, function(value, key){
          angular.forEach(value.jobs, function(value, key){
            typeaheadItems.push(value.job);
          });
        });
      });
      $scope.jobNumbersInRange =  _.uniq(typeaheadItems); // REMOVE DUPLICATES
    };

    // SET THE HIGHLIGHTED CELL HERE
    $scope.HighlightCell = function(selected){
      angular.forEach($scope.GridDataItems.rows, function(value, key){
        console.log('value :', value);

        angular.forEach(value.items, function(value, key){
          var cell = angular.extend(value);
          angular.forEach(value.jobs, function(value, key){
            var result = _.contains(value.job, selected);

            if(result === true){
              cell.highlight = true;
            } else {
              cell.highlight = false;
            }
          });
        });
      });
    };

    $scope.ClearFindJob = function() {
        $scope.findJob = '';
        $scope.HighlightCell();
    };



    $scope.GetDrafters = function () {
        return CapacityPlanningService.GetDrafters().then(function(result){
            $scope.Drafters = result;
        });
    };

 $scope.CellClick = function (row, index, colIndex) {
        var notIssued;
        angular.forEach(row.entity.items, function(value, key){
            value.highlight = false;
            // $scope.ClearFindJob();
        });

        $scope.hasJobs = row.entity.items[index].jobs;

        angular.forEach($scope.hasJobs, function(value, key){
            if(value.issued === false) {
                notIssued = true;
            }
        });



        if($scope.hasJobs && notIssued) {
            $scope.opts = {
              backdrop: 'static',
              templateUrl: 'partials/ModalTemplateJob.html?c=' + new Date().getTime(), // This is a cache buster to keep the dialog template from being cached. Must be a bug in ui.bootstrap?
              controller: 'JobModalCtrl',
              resolve: {
                data: function() {
                    var obj = {
                        rowData: row,
                        gridRows: $scope.GridDataItems.rows,
                        cellIndex: index,
                        selectedDate: $scope.columnDefs[colIndex].displayName,
                        drafterList: $scope.Drafters,
                        jobid: row.entity.items[0].jobid,
                        workcenterid: row.entity.items[1].workcenterid,
                        value: row.entity.items[1].value,
                        jobnumber: row.entity.items[0].value,
                        rowclass: row.entity.rowclass,
                        searchstart: $scope.searchParams.sStartDate,
                        searchend: $scope.searchParams.sEndDate,
                        rowsToReplace:  $scope.RowsToReplaceIndexes,
                        hasJobs: $scope.hasJobs
                    };
                    return obj;
                }
              }
            };
            var modalInstance = $modal.open($scope.opts, $scope.rowData);
        } else {
            return;
        }

    };

});
