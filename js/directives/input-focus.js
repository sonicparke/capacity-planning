app.directive('focus', function() {
    return function(scope, element) {
       scope.$watch('focusInput',
         function (newValue) {
            newValue && element[0].focus();
         });
    };
});