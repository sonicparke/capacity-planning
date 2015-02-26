app.controller('ReportsViewCtrl', function ($scope,  $rootScope, User){

    // Initial Functions
    $scope.InitPage = function() {
        $rootScope.PageSubTitle = "Reports";
    };

    ////////// ngGrid Config //////////
    // $scope.GridItems = {
    //     data: 'myData.rows',
    //     columnDefs: 'myData.columns'
    // };


    // $scope.myData = {
    //   "rows": [
    //     {name: "Moroni", age: 50},
    //     {name: "Tiancum", age: 43},
    //     {name: "Jacob", age: 27},
    //     {name: "Nephi", age: 29},
    //     {name: "Enos", age: 34}
    //   ],
    //   "columns": [
    //     {field: 'name', displayName: 'Name'},
    //     {field:'age', displayName:'Age'}
    //   ]
    // };


    ////////// ngGrid Config //////////
//     $scope.GridItems = {
//         data: 'gridData.Items',
//         enableColumnResize: true,
//         enableCellSelection: true,
//         enableRowSelection: false,
//         enableHighlighting: false,
//         enableCellEditOnFocus: true,
//         multiSelect: true,
//         showColumnMenu: true,
//         rowHeight: 20,
//         headerRowHeight: 100,
//         footerRowHeight: 30,
//         showFooter: true,
//         columnDefs: 'gridData.Columns'
//     };


// var editableCellTemplate = '<input ng-class="colt + col.index" ng-input="COL_FIELD" ng-model="days" />';
// var DueDatecellTemplate = '<div class="ngCellText" ng-class="row.entity.items[col.index].cellclass"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>';

    // $scope.gridData = {
    //     "Columns": [{
    //         "field": "JobNo",
    //         "displayName": "Job Number",
    //         "enableCellEdit": false
    //     },{
    //         "field": "CustomerName",
    //         "displayName": "Customer Name",
    //         "enableCellEdit": false
    //     },{
    //         "field": "DueDate",
    //         "displayName": "Due Date",
    //         "cellTemplate": DueDatecellTemplate,
    //         "enableCellEdit": false
    //     },{
    //         "field": "ScheduledDate",
    //         "displayName": "Scheduled Date",
    //         "enableCellEdit": false
    //     },{
    //         "field": "Days",
    //         "displayName": "Days",
    //         "editableCellTemplate": editableCellTemplate,
    //         "enableCellEdit": true
    //     },{
    //         "field": "Rev",
    //         "displayName": "Rev",
    //         "enableCellEdit": false
    //     },{
    //         "field": "CustomerLocation",
    //         "displayName": "Customer Location",
    //         "enableCellEdit": false
    //     },{
    //         "field": "ModelNumber",
    //         "displayName": "Model Number",
    //         "enableCellEdit": false
    //     }],
    //     "Items": [{
    //         "JobNo": "14-133",
    //         "CustomerName": "Phillips 66",
    //         "ModelNumber": "1HAC1638T13",
    //         "CustomerLocation" : "Ponca City, OK",
    //         "Rev": "1",
    //         "ScheduledDate": "3/05/2014",
    //         "DueDate": "3/10/2014",
    //         "Days" : ""
    //     }]
    // };

});