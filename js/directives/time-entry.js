app.directive('timeEntry', function () {
    return{
        restrict: 'E',
        transclude: true,
        controller: 'MainCtrl',
        templateUrl: 'partials/timeEntry.html',
        scope:{
          changeFn: '&',
          inputClass: '@',
          item: '=',
          buttonClickFn: '&',
          inputClickFn: '&',
          buttonClass: '@',
          icon: '@',
          inputPlaceholder: '@'
          },
        link:function (scope, element, attrs) {
          scope.disabled = true;
          if (scope.item) {
            scope.disabled = false;
          }
          scope.onChange = function (index, item) {
            scope.changeFn(index);
            scope.disabled = true;
          };
          scope.onInputClick = function(){
            scope.inputClickFn();
          };
          scope.onButtonClick = function(){
            scope.buttonClickFn();
          };
        }
    };
});