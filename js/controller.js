xdapp.controller("loginController", ["$scope", "$http", function($scope, $http) {

}]);
xdapp.controller('RegistrationController', ['$scope', '$firebaseObject', '$firebaseAuth', function($scope, $firebaseObject, $firebaseAuth) {
    $scope.msg = "I am in RegistrationController";
    var ref = new Firebase("https://xdjoiners.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);
    $scope.saveUser = function() {
    	console.log($scope.authObj);
        $scope.authObj.$createUser({
            email: $scope.user.name,
            password: "mypassword"
        }).then(function(userData) {
            console.log(userData);
        })
        .catch(function(error) {
            console.error("Error: ", error);
        });
    }
}])
