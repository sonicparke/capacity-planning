angular.module('SumInputs', [])
  .directive('ngMultiply', function ($filter, TotalsService) {
      return{
          restrict: 'E,A',
          require: 'ngModel',
          replace: true,
          template: '<input class="form-control" disabled type="text" />',
          scope: {
            data: '=data',
            multiplier: '=multiplier'
          },
          link:function (scope, element, attrs, ngModel) {
            scope.$watch('data', function(newV, oldV) {
                if (newV !== oldV) {
                 ngModel.$render();
                }
              }, true);

            scope.$watch('multiplier', function(newV, oldV) {
                if (newV !== oldV) {
                 ngModel.$render();
                }
              });

            ngModel.$render = function() {
              var total=0;
              TotalsService.multiply(scope.data, scope.multiplier).then(function(result){
                total = result;
                total = $filter('number')(total);
                element.val(total);
              });
            };

          }
      };
  })
  .directive('ngSum', function ($filter, TotalsService) {
      return{
          restrict: 'E,A',
          require: 'ngModel',
          replace: true,
          template: '<input class="form-control" disabled type="text" />',
          scope: {
            data: '=data',
            multiplier: '=multiplier'
          },
          link:function (scope, element, attrs, ngModel) {
            scope.$watch('data', function(newV, oldV) {
              ngModel.$render();
            }, true);

            scope.$watch('multiplier', function(newV, oldV) {
                if (newV !== oldV) {
                 ngModel.$render();
                }
              });

            ngModel.$render = function() {
              var total=0;
              TotalsService.sum(scope.data, scope.multiplier).then(function(result){
                total = result;
                if(total === 0){
                  element.val("");
                } else {
                  total = $filter('number')(total);
                  element.val(total);
                }
              });
            };

          }
      };
  });