app.directive('buttonUi', function () {
    return{
        restrict: 'E',
        replace: true,
        controller: 'MainCtrl',
        templateUrl: 'partials/button.html?c=' + new Date().getTime(),
        scope:{
          clickFn: '&',
          text: '@',
          activeText: '@',
          buttonClass: '@',
          icon: '@',
          buttonDisabled: '=?',
          showButton: '@?'
        },
        link:function (scope, element, attrs) {
          scope.showButton = true;
          scope.onClick = function(){
            scope.error = undefined;
            scope.updating = true;
            scope.buttonDisabled = true;
            var promise = scope.clickFn();
            promise.then( function() {
                scope.updating = false;
                scope.buttonDisabled = false;
              }, function(error) {
                scope.updating=false;
                scope.buttonDisabled = false;
                scope.error = error;
              });
          };
        }
    };
});

////////// USE //////////
// <button-ui text="Search" button-disabled="disabled" active-text="Searching" click-fn="editHours($index, item)" icon="icon-search"></button-ui>


////////// Template in _button.html //////////
// <button class="btn {{buttonClass}}" ng-click="onClick()" ng-disabled="disabled">
//   <i class="{{icon}}" ng-class="{'icon-spinner icon-spin': updating}"></i>
//   {{ updating && activeText || text  }}
// </button>