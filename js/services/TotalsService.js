app.factory('TotalsService', function($http, $q, $filter, HammcoJobListingWebAPI) {
    var folders = [];
    return {
        sum: function(data, multiplier) {
            var self = this;
            var deferred = $q.defer();

            var total, modelInt, valArr=[], sum=0;
            total = _.map(data, function(num){
                var value = num.Value;
                if(value === ""){
                  return;
                }
                else if(_.isString(value)){
                  modelInt = parseInt(value.replace(/,/g, ''),10);
                  valArr.push(modelInt);
                } else {
                  valArr.push(modelInt);
                }
            });

            for(var i=0; i<valArr.length; i++){
                sum = sum + valArr[i];
            }

            if(multiplier){
                var product = sum * multiplier;
                deferred.resolve(product);
            } else {
                deferred.resolve(sum);
            }

            return deferred.promise;
        },
        multiply: function(data, multiplier) {
            var self = this;
            var deferred = $q.defer();

            var product, modelInt;
              if(_.isString(data)){
                modelInt = parseInt(data.replace(/,/g, ''),10);
                product = modelInt * multiplier;
              } else {
                product = data * multiplier;
              }

            deferred.resolve(product);
            return deferred.promise;
        }
    };
});