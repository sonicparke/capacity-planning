angular.module('loader', [])
    .directive('ngLoader', function () {
        return{
            restrict: 'E,A',
            replace: true,
            template: '<span class="ngLoader" style="font-size: 16px; "><i class="fa fa-spinner fa-spin"></i></span>',
            // template: '<i ng-show="showLoader" class="fa fa-spinner fa-spin"></i>',
            scope: {
                showLoader: '=?'
            },
            link:function (scope, element, attrs) {
                scope.showLoader = true;
            }
        };
    })
    .directive('ngDogLoader', function () {
        return{
            restrict: 'E,A',
            replace: true,
            template: '<div class="row text-center" ><img class="img-rounded" width:400px height:263px src="http://axcapps.harsco.com/cdn/images/puggle.gif" /><h3>Loading... please wait...</h3></div>',
            scope: {}
        };
    });