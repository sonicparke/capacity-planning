angular.module('autoSave', [])
  .directive('ngAutoSave', function ($filter, $timeout, CapacityPlanningService) {
      return{
          restrict: 'E,A',
          replace: true,
          templateUrl: 'partials/autoSaveTemplate.html?c=' + new Date().getTime(),
          scope: {
            data: '=data',
            icon: '@?'
          },
          controller:function ($scope, $element, $attrs) {
            var saveTimer;
            var Save;
            $scope.saved = false;

            $scope.$watch('data', function(newV, oldV) {
              if(newV != oldV) {
                Save();
              }
            }, true);

            Save = function() {
              $timeout.cancel(saveTimer);
              saveTimer = $timeout(function(){
                $scope.saving = true;
                $scope.saved = true;
                return CapacityPlanningService.SaveWorkCenter($scope.data).then(function(result) {
                    $scope.saving = false;
                    $timeout.cancel(saveTimer);
                });
              }, 1000);
            };

          }
      };
  });