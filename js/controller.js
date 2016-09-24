
xdapp.controller("loginController", ["$scope", "$http", function($scope, $http) {

}]);

xdapp.controller('RegistrationController', ['$scope','fireFactory', function($scope,fireFactory) {
    $scope.msg = "I am in RegistrationController";
    console.log($scope.msg);
$scope.authObj = fireFactory.authRef();
    console.log($scope.authObj);
    $scope.registerUser = function() {
        console.log($scope.authObj);
        console.log($scope.user);
      $scope.authObj.$createUser({
                role: $scope.user.role,
                name: $scope.user.name,
                email: $scope.user.email,
                phone: $scope.user.number,
                password:$scope.user.pwd
            }).then(function(userData) {
              console.log (userData);
                var userRef = new Firebase("https://xdnewjoiner.firebaseio.com/users");
                var id = userData.uid;
                var addUser = userRef.child(id);
                console.log($scope.user);
                addUser.set({
                    role: $scope.user.role,
                    name: $scope.user.name,
                    email: $scope.user.email,
                    phone: $scope.user.number,
                    password:$scope.user.pwd

                })
            }).then(function(){
             alert ("User Created Successfully!!!");
            })
            .catch(function(error) {
                console.error("Error: ", error);
            });
    }
}])
