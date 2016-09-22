var XdBase = new Firebase("https://xdnewjoiner.firebaseio.com/");
var xdBase = $firebaseObject(XdBase);

xdapp.controller("mainController", ["$scope", "$firebaseObject", function ($scope, $firebaseObject) {
  
    console.log($scope.xdBase);
    self = this;

    self.authLogin = function () {
        console.log(self.userName + self.userPassword);
    }

}])

xdapp.controller("loginController", ["$scope", "$http", function ($scope, $http) {
    self = this;
   
    self.authLogin = function () {
        console.log(self.userName + self.userPassword);
    }

}])

xdapp.controller("registerController", ["$scope", "$http", function ($scope, $http) {
    self = this;

    self.regUser = function () {
        console.log(self.userName);

        xdBase.$bindTo($scope, "self.userNam");
    }

}])



