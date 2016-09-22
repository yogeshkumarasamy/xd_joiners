xdapp.controller("mainController", ["$scope", function ($scope) {
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


