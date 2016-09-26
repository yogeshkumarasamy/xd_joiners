
xdapp.controller('loginController', ['$scope','fireFactory', '$http','$location', function($scope,fireFactory,$http,$location) {

  $scope.usrAuth = function(){

    try{
    console.log("auth USer");
    console.log($scope.usr.Name+$scope.usr.Pwd);
    var authObj = fireFactory.authRef();
    authObj.$signInWithEmailAndPassword($scope.usr.Name,$scope.usr.Pwd)
    .then(function(user){
       console.log("sigin in success as " + $scope.usr.Name);
       $location.path("/dashboard");
       console.log(user);
    }).catch(function(error){
    })
  }

    catch(error){
     console.log( error);
    };

  }

}]);

xdapp.controller('RegistrationController', ['$scope','fireFactory','$location','Profile',function($scope,fireFactory,$location,Profile) {
  $scope.user = {};
    $scope.regError ="test";
    $scope.msg = "I am in RegistrationController";
    var authObj = fireFactory.authRef();

    $scope.registerUser = function() {
          console.log($scope.user.email +"pwd" + $scope.user.pwd);
      try{
      authObj.$createUserWithEmailAndPassword($scope.user.email,$scope.user.pwd)
       .then(function(response){
         $scope.user.id = response.uid;
         $scope.user.role = "new";
         Profile.pushProfile(response,$scope.user);
           })
        .then(function(){
             $location.path('/signin')
           })
         }
        catch(error) {
            console.log(error);
          $scope.regError = error.message;
            };
    }
}])

xdapp.controller('DashController',['$scope', '$interval', '$timeout', '$window',
     'roundProgressService','fireFactory','Profile',function($scope, $interval, $timeout, $window, roundProgressService,fireFactory,Profile){

         $scope.auth = fireFactory.authRef();
         $scope.userProfile = {};
         $scope.auth.$onAuthStateChanged(function(response){
             $scope.userProfile = Profile.getProfile(response.uid);
         });
           $scope.current =        27;
           $scope.max =            50;
           $scope.offset =         0;
           $scope.timerCurrent =   0;
           $scope.uploadCurrent =  0;
           $scope.stroke =         15;
           $scope.radius =         75;
           $scope.isSemi =         false;
           $scope.rounded =        true;
           $scope.responsive =     false;
           $scope.clockwise =      true;
           $scope.currentColor =   '#45ccce';
           $scope.bgColor =        '#eaeaea';
           $scope.duration =       800;
           $scope.currentAnimation = 'easeOutCubic';
           $scope.animationDelay = 0;
           $scope.animations = [];

           angular.forEach(roundProgressService.animations, function(value, key){
               $scope.animations.push(key);
           });

           $scope.getColor = function(){
               return $scope.gradient ? 'url(#gradient)' : $scope.currentColor;
           };

           $scope.showPreciseCurrent = function(amount){
               $timeout(function(){
                   if(amount <= 0){
                       $scope.preciseCurrent = $scope.current;
                   }else{
                       var math = $window.Math;
                       $scope.preciseCurrent = math.min(math.round(amount), $scope.max);
                   }
               });
           };
           var getPadded = function(val){
               return val < 10 ? ('0' + val) : val;
           };
           $scope.getStyle = function(){
               var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';
               return {
                   'top': $scope.isSemi ? 'auto' : '50%',
                   'bottom': $scope.isSemi ? '5%' : 'auto',
                   'left': '50%',
                   'transform': transform,
                   '-moz-transform': transform,
                   '-webkit-transform': transform,
                   'font-size': $scope.radius/6 + 'px'
               };
           };
           $interval(function(){
               var date = new Date();
               var hours = date.getHours();
               var minutes = date.getMinutes();
               var seconds = date.getSeconds();

               $scope.hours = hours;
               $scope.minutes = minutes;
               $scope.seconds = seconds;
               $scope.time = getPadded(hours) + ':' + getPadded(minutes) + ':' + getPadded(seconds);
           }, 1000);
}])
