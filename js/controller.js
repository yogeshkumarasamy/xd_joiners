
xdapp.controller('loginController', ['$scope','fireFactory', '$http', function($scope,fireFactory,$http) {
  $scope.usrAuth = function(){
    try{
    console.log("auth USer");
    console.log($scope.usr.Name+$scope.usr.Pwd);
    var authObj = fireFactory.authRef();
    authObj.$signInAnonymously()
    // authObj.$signInWithEmailAndPassword("suresh@gmail.com","suresh")
    .then(function(user){
       console.log("sigin in success as ");
      console.log(user);

    }).catch(function(error){})
  }

    catch(error){
     console.log("Signin Error" + error.message);
    }

  }

}]);

xdapp.controller('RegistrationController', ['$scope','fireFactory','$location',function($scope,fireFactory,$location) {
    $scope.regError ="test";
    $scope.msg = "I am in RegistrationController";
    var authObj = fireFactory.authRef();
    $scope.registerUser = function() {
      try{
      authObj.$createUserWithEmailAndPassword($scope.user.email,$scope.user.pwd)
       .then(function(userData){
            alert ("User Created Successfully!!!");
             $scope.user.id = userData.uid;
             $scope.user.role = "new";
             $scope.userElement = firebase.database().ref('/userBase/'+ userData.uid);
             $scope.userElement.set($scope.user);
           }).then(function(){
             $location.path('/signin')
           })
         }
        catch(error) {
          $scope.regError = error.message;
            };
    }
}])
