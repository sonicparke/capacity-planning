app.factory('AuthService', function($q, AppSecurityWebAPI, User) {
    var groups;

    var _GetGroups = function(data) {
        var self = this;
        var UserID = User;
        var deferred = $q.defer();
        var AuthData = { AppName: 'HammcoJobListing', UserName: UserID};
        var results = AppSecurityWebAPI.one('Groups').get(AuthData).then(function(result){
            groups = [];
            angular.forEach(result, function(value, key){
                groups.push(value.Role);
            });
            deferred.resolve(groups);
        });
        return deferred.promise;
    };

    var _IsAdmin = function() {
        var deferred = $q.defer();
        var UserID = User;
        var AuthData = { AppName: 'HammcoJobListing', UserName: UserID};
        var self = this;
        var isAdmin;
        if(groups) {
            isAdmin = _.contains(groups, 'Admin');
            return $q.when(isAdmin);
        } else {
            return _GetGroups(AuthData).then(function(result){
                isAdmin = _.contains(result, 'Admin');
                return isAdmin;
            });
        }

    };

    var _JobInput = function() {
        var deferred = $q.defer();
        var UserID = User;
        var AuthData = { AppName: 'HammcoJobListing', UserName: UserID};
        var self = this;
        var jobInput;
        if(groups) {
            jobInput = _.contains(groups, 'JobInput');
            return $q.when(jobInput);
        } else {
            return _GetGroups(AuthData).then(function(result){
                jobInput = _.contains(result, 'JobInput');
                return jobInput;
            });
        }

    };

    var _ReportingReadOnly = function() {
        var deferred = $q.defer();
        var UserID = User;
        var AuthData = { AppName: 'HammcoJobListing', UserName: UserID};
        var self = this;
        var access;
        if(groups) {
            access = _.contains(groups, 'ReportingReadOnly');
            return $q.when(access);
        } else {
            return _GetGroups(AuthData).then(function(result){
                access = _.contains(result, 'ReportingReadOnly');
                return access;
            });
        }

    };

    return {
        IsAdmin: _IsAdmin,
        GetGroups: _GetGroups,
        JobInput: _JobInput,
        ReportingReadOnly: _ReportingReadOnly
    };
});