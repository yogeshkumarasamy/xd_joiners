
xdapp.controller('loginController', ['$scope','fireFactory', '$http','$location','Profile',
   function($scope,fireFactory,$http,$location,Profile) {

  $scope.usrAuth = function(){

    try{
    // console.log("auth USer");
    // console.log($scope.usr.Name+$scope.usr.Pwd);
    var authObj = fireFactory.authRef();
    authObj.$signInWithEmailAndPassword($scope.usr.Name,$scope.usr.Pwd)
    .then(function(user){
       // console.log("sigin in success as " + $scope.usr.Name);
       $location.path("/dashboard/status");
       // console.log(user);
       Profile.currentUser = user.uid;
    }).catch(function(error){
    })
  }

    catch(error){
     // console.log( error);
    };

  }

}])

.controller('RegistrationController', ['$scope','fireFactory','$location','Profile',function($scope,fireFactory,$location,Profile) {
  $scope.user = {};
    $scope.regError ="test";
    $scope.msg = "I am in RegistrationController";
    var authObj = fireFactory.authRef();

    $scope.registerUser = function() {
          // console.log($scope.user.email +"pwd" + $scope.user.pwd);
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
            // console.log(error);
          $scope.regError = error.message;
            };
    }
}])
.controller('DashController',['$scope','$state','fireFactory','Profile',function($scope,$state,fireFactory,Profile){
  $scope.userProfile ={}
           $scope.auth = fireFactory.authRef();
           $scope.userProfile = {};
           $scope.auth.$onAuthStateChanged(function(response){
               $scope.userProfile = Profile.getProfile(response.uid);
               Profile.currentUser =  $scope.userProfile;
               Profile.currentUser.$loaded().then(function(){
               $state.go("dashboard.status");
               });

           });
}])

.controller('statusController',['$q','$state','$scope', '$interval', '$timeout', '$window','roundProgressService',
'fireFactory','Profile','Task',function($q,$state,$scope,$interval, $timeout,$window, roundProgressService,fireFactory,Profile,Task){
  $scope.auth.$onAuthStateChanged(function(response){
    var deferred = $q.defer();
    $scope.compltedTask = [];
    $scope.userProfile ={};
    $scope.CompleteTaskList = [];
    $scope.incompleteTaskList=[];
    $scope.taskCategory = "mandatory";
    $scope.totalTask =[];
    $scope.incompltedTask = [];
    // $scope.incompltedTask = Profile.currentUser.Completed === undefined ? [] :Profile.currentUser.Completed;
    $scope.totalTask = Task.getTask();
      $scope.userProfile = Profile.getProfile(response.uid);
      Profile.currentUser =  $scope.userProfile;
      Profile.currentUser.$loaded().then(function(){
        $scope.compltedTask = Profile.currentUser.Completed === undefined ? [] :Profile.currentUser.Completed;
      });
    });
                $scope.pushUserTask = function(rows){
                  rows.compHide = true;
                  rows.incompHide = false;

                  if($scope.compltedTask.indexOf(rows.$id) < 0){
                      $scope.compltedTask.push(rows.$id);
                      Task.CompleteTaskList.push(rows);
                  }
                  Profile.updateTask($scope.compltedTask,Profile.currentUser.id);
                }

                $scope.removeUserTask = function(row){

                  // console.log("888888888888888");
                    row.compHide = false;
                    row.incompHide = true;
                // console.log();

                                  if($scope.incompltedTask.indexOf(row.$id) < 0){
                                      $scope.incompltedTask.push(row.$id);
                                      Task.incompleteTaskList.push(row);
                                  }
                                  var elemId = Profile.currentUser.Completed.indexOf(row.$id);
                                  // console.log(elemId);
                  Profile.removeTask(elemId,Profile.currentUser.id);



                }


                $scope.$watch('totalTask',function(){
                  $scope.CompleteTaskList = [];
                  $scope.incompleteTaskList=[];
                 try{
                  $scope.totalTask.$loaded().then(function(){
                    // console.log("task VAlue changed");
                      // console.log($scope.totalTask);
                    angular.forEach($scope.totalTask,function(key,value){
                        // console.log(key.$id);
                        if($scope.compltedTask.indexOf(key.$id)<0){
                          $scope.incompleteTaskList.push(key);
                          Task.incompleteTaskList =   $scope.incompleteTaskList;
                        }
                        else {
                          $scope.CompleteTaskList.push(key);
                          Task.CompleteTaskList =     $scope.CompleteTaskList;

                        }
                         // console.log("seperation task");
                          // console.log(Task.CompleteTaskList);
                          // console.log(Task.incompleteTaskList);
                    })

                  })
                }
                catch(error){

                }
                });
/* Dial Plugin - Need to reform  ================================================================= */
           $scope.current =        60;
           $scope.max =            100;
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
/* Dial Plugin - Need to reform  ================================================================= */

}])

.controller('createTaskController',['$scope','fireFactory','Task',function($scope,fireFactory,Task){
$scope.Task={};
$scope.task_option =["mandatory","additional","others"];
$scope.Task.category = $scope.task_option[0];
$scope.feildReset = function(){
  $scope.Task={};
  $scope.Task.category = $scope.task_option[0];
}
  $scope.createTask = function() {
      // console.log("createTask");
      // console.log($scope.Task);
    try{
       Task.pushTask($scope.Task);
        $scope.feildReset();
       }
      catch(error) {
          // console.log(error);
          };
  }

}])
