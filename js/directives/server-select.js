//////////////////////////////////////////////////////////
//
// AXC WebAPI Server Select Directive
// Requires Angular UI Boostrap http://angular-ui.github.io/bootstrap/
//
//////////////////////////////////////////////////////////
angular.module('serverSelect', []);
app.directive('ngServerSelect', function () {
    var _template = '<div class="server-selector" ng-show="showServerSelect" ng-init="Init()">' +
        '<style>' +
        '.server-selector .nav>li>a { padding: 5px; color: #ddd}' +
        '.server-selector .nav>li>a:hover { background-color: #444}' +
        '.server-selector .nav {padding-top: 0; margin-left: 50px;}' +
        '.server-selector {height: 20px; font-size: 10px; margin-top: 0;}' +
        '.server-selector { background: #444;}'+
        '.server-selector .t {margin-right: 0; padding: 5px; font-size: 10px; color: #ddd; line-height: 1em; text-transform: uppercase;}'+
        '.server-selector i { width: 11px;}' +
        '.server-selector .fa-check { color: #00FF52;}' +
        '</style>'+
        '<ul class="nav nav-horizontal pull-right" ng-init="GetServer()">' +
          '<li class="t">Server: </li>' +
          '<li ng-repeat="server in data.Servers" ng-click="SetServer(server)" ng-mouseover="hover = true;" ng-mouseout="hover = false;"><a href=""><i class="fa " ng-class="{\'fa-laptop\': server.DisplayName != selectedServer.DisplayName, \'fa-check\': server.DisplayName == selectedServer.DisplayName}" ></i> {{server.DisplayName}}</a></li>' +
          '<li ng-click="RemoveServer()"><a href=""><i class="fa fa-refresh"></i> Clear Servers</a></li>' +
        '</ul>'+
        '<ul class="nav nav-horizontal pull-right" ng-init="GetAPI()">' +
          '<li class="t">API: </li>' +
          '<li ng-repeat="api in data.API" ng-click="SetAPI(api)"><a href=""><i class="fa " ng-class="{\'fa-database\': api.DisplayName != selectedAPI.DisplayName, \'fa-check\': api.DisplayName == selectedAPI.DisplayName}" ></i> {{api.DisplayName}}</a></li>' +
          '<li ng-click="RemoveAPI()"><a href=""><i class="fa fa-refresh"></i> Clear API</a></li>'+
        '</ul>' +
      '</div>';
    return{
        restrict: 'E,A',
        replace: true,
        controller: function($scope, User, ServerAPI, DBData){

          $scope.showServerSelect = false;

          DBData.GetAllData().then(function(result){
            $scope.data = result.data;
            CheckUser();
          });

          // Get the current user from the asp.net yukiness
          $scope.currentUser = User;

          // Show or hide component based on user
          var CheckUser = function(){
            return _.find($scope.data.Users, function(user){
              if(user.Name === $scope.currentUser){
                $scope.showServerSelect = true;
              } else {
                return;
              }
            });
          };

          $scope.GetServer = function() {
            Server = ServerAPI.GetServer();
            if(!Server) {
                Server = 'axcapps.harsco.com';
                $scope.selectedServer = Server;
                return Server;
            } else {
                $scope.selectedServer = Server;
                return Server.servername;
            }
          };

          $scope.SetServer = function(data) {
            var selectedServer = ServerAPI.SetServer(data);
            $scope.selectedServer = selectedServer;
          };

          $scope.RemoveServer = function(data) {
            var selectedServer = ServerAPI.RemoveServer(data);
            $scope.selectedServer = selectedServer;
          };

          $scope.GetAPI = function() {
            API = ServerAPI.GetAPI();
            if(API === 'Test') {
              $scope.showServerSelect = false;
            }
            if(!API) {
                API = '';
                $scope.selectedAPI = API;
                return API;
            } else {
                $scope.selectedAPI = API;
                return API.name;
            }
          };

          $scope.SetAPI = function(data) {
            var selectedApi = ServerAPI.SetAPI(data);
            $scope.GetAPI();

          };

          $scope.RemoveAPI = function(data) {
            var selectedAPI = ServerAPI.RemoveAPI(data);
            $scope.selectedAPI = selectedAPI;
          };

        },
        template: _template,
        scope:{},
        link:function (scope, element, attrs) {

        }
    };
});
app.factory('ServerAPI', function() {
  var Server = {};
  var API = {};
  var _SetServer = function(data) {
    localStorage.setItem('AXC_API_Storage.Server', JSON.stringify(data));
    Server = JSON.parse(localStorage.getItem('AXC_API_Storage.Server'));
    return Server;
  };
  var _GetServer = function(data) {
    var testUrl = _.contains(window.location.pathname, 'test');
    if(testUrl === true){
      Server = null;
      return Server;
    }
    else if(localStorage.getItem('AXC_API_Storage.Server')){
      Server = JSON.parse(localStorage.getItem('AXC_API_Storage.Server'));
      return Server;
    } else {
      Server.Name = 'axcapps.harsco.com';
      return Server;
    }
  };
  var _RemoveServer = function(data) {
    if(localStorage.getItem('AXC_API_Storage.Server')){
      localStorage.removeItem('AXC_API_Storage.Server');
      Server = JSON.parse(localStorage.getItem('AXC_API_Storage.Server'));
      return;
    } else {
      return;
    }
  };
  var _SetAPI = function(data) {
    localStorage.setItem('AXC_API_Storage.API', JSON.stringify(data));
    API = JSON.parse(localStorage.getItem('AXC_API_Storage.API'));
    return API;
  };
  var _GetAPI = function(data) {
    var url = _.contains(window.location.pathname, 'test');
    if(url === true){
      API.Name = 'Test';
      return API;
    }
    else if(localStorage.getItem('AXC_API_Storage.API')){
      API = JSON.parse(localStorage.getItem('AXC_API_Storage.API'));
      return API;
    }
    else {
      API.Name = '';
      return API;
    }
  };
  var _RemoveAPI = function(data) {
    if(localStorage.getItem('AXC_API_Storage.API')){
      localStorage.removeItem('AXC_API_Storage.API');
      API = JSON.parse(localStorage.getItem('AXC_API_Storage.API'));
      return;
    } else {
      return;
    }
  };
  return {
    SetServer: _SetServer,
    GetServer: _GetServer,
    RemoveServer: _RemoveServer,
    SetAPI: _SetAPI,
    GetAPI: _GetAPI,
    RemoveAPI: _RemoveAPI
  };
})
.factory('DBData', ['$http', function($http) {
  var _GetServers = function(data) {
    return $http.get('http://axcapps.harsco.com/DevelopmentEnvironmentWebAPI/api/servers').then(function(res){
      return res;
    });
  };
  var _GetUsers = function(data) {
    return $http.get('http://axcapps.harsco.com/DevelopmentEnvironmentWebAPI/api/users').then(function(res){
      return res;
    });
  };
  var _GetAPIs = function(data) {
    return $http.get('http://axcapps.harsco.com/DevelopmentEnvironmentWebAPI/api/apis').then(function(res){
      return res;
    });
  };
  var _GetAllData = function(data) {
    return $http.get('http://axcapps.harsco.com/DevelopmentEnvironmentWebAPI/api/all').then(function(res){
      return res;
    });
  };

  return {
    GetServers: _GetServers,
    GetUsers: _GetUsers,
    GetAPIs: _GetAPIs,
    GetAllData: _GetAllData
  };
}]);