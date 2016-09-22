xdapp.controller("loginController", ["$scope", "$http", function($scope, $http) {

}]);
xdapp.controller('RegistrationController', ['$scope', '$firebaseObject', '$firebaseAuth', function($scope, $firebaseObject, $firebaseAuth) {
    $scope.msg = "I am in RegistrationController";
    var ref = new Firebase("https://xdjoiners.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);
    $scope.saveUser = function() {
        console.log($scope.authObj);
        $scope.authObj.$createUser({
                role: $scope.user.role,
                name: $scope.user.name,
                email: $scope.user.email,
                phone: $scope.user.number,
                password: "mypassword"
            }).then(function(userData) {
                var userRef = new Firebase("https://xdjoiners.firebaseio.com/users");
                var id = userData.uid;
                var addUser = userRef.child(id);
                console.log($scope.user);
                addUser.set({
                    role: $scope.user.role,
                    name: $scope.user.name,
                    email: $scope.user.email,
                    phone: $scope.user.number,
                    password: "mypassword"

                })
            })
            .catch(function(error) {
                console.error("Error: ", error);
            });
    }
}])
