xdapp.controller('loginController', ['$scope', 'fireFactory', '$http', '$location', 'Profile',
    function($scope, fireFactory, $http, $location, Profile) {
        var vm = this;

        vm.usrAuth = function() {

            try {
                var authObj = fireFactory.authRef();
                authObj.$signInWithEmailAndPassword(vm.usr.Name, vm.usr.Pwd)
                    .then(function(user) {
                        Profile.currentUser = user.uid;
                        $location.path("/dashboard/status");
                    })
            } catch (error) {

            };
        }

    }
])

.controller('RegistrationController', ['$scope', 'fireFactory', '$location', 'Profile', function($scope, fireFactory, $location, Profile) {
        var vm = this;
        vm.user = {};
        vm.regError = "test";
        vm.authObj = fireFactory.authRef();
        vm.registerUser = function() {
            try {
                vm.authObj.$createUserWithEmailAndPassword(vm.user.email, vm.user.pwd)
                    .then(function(response) {
                        vm.user.id = response.uid;
                        vm.user.role = "new";
                        Profile.pushProfile(response, vm.user);
                    })
                    .then(function() {
                        $location.path('/signin')
                    })
            } catch (error) {
                // console.log(error);
                vm.regError = error.message;
            };
        }
    }])
    .controller('DashController', ['$scope', '$state', 'fireFactory', 'Profile', function($scope, $state, fireFactory, Profile) {
        var vm = this;
        vm.userProfile = {};
        vm.auth = fireFactory.authRef();
        vm.userProfile = {};
        vm.auth.$onAuthStateChanged(function(response) {
            vm.userProfile = Profile.getProfile(response.uid);
            Profile.currentUser = vm.userProfile;
            vm.userProfile.$loaded().then(function() {
                $state.go("dashboard.status");
            });
        });
    }])

.controller('statusController', ['$q', '$state', '$scope', '$interval', '$timeout', '$window', 'roundProgressService',
    'fireFactory', 'Profile', 'Task', '$filter',
    function($q, $state, $scope, $interval, $timeout, $window, roundProgressService, fireFactory, Profile, Task, $filter) {
        var vm = this;
        $scope.totalTask = [];
        vm.userProfile = {};
        vm.compltedTask = [];
        vm.incompltedTask = [];
        vm.CompleteTaskList = [];
        vm.incompleteTaskList = [];
        vm.taskCategory = "mandatory";
        vm.TaskCount = {};
        $scope.totalTask = Task.getTask();
        vm.auth = fireFactory.authRef();
        Profile.currentUser = vm.userProfile;
        vm.auth.$onAuthStateChanged(function(response) {
            vm.userProfile = Profile.getProfile(response.uid);
            vm.userProfile.$loaded().then(function() {
                vm.compltedTask = Profile.currentUser.Completed === undefined ? [] : Profile.currentUser.Completed;
            });
        });
        vm.pushUserTask = function(rows) {

            if (rows.category == "mandatory"){
              vm.TaskCount.CompMandatory = vm.TaskCount.CompMandatory + 1;
             } else if(rows.category == "additional"){
               vm.TaskCount.CompAdditional = vm.TaskCount.CompAdditional + 1;
             } else if(rows.category == "others"){
                vm.TaskCount.CompOthers = vm.TaskCount.CompOthers + 1;
             }
             console.log("####");
         console.log(vm.compltedTask);
            if (vm.compltedTask.indexOf(rows.$id) < 0) {
              // rows.compHide = true;
              // rows.incompHide = false;
              console.log("inside function");
                vm.compltedTask.push(rows.$id);
                delete vm.incompltedTask[vm.incompltedTask.indexOf(rows.$id)];
                Task.CompleteTaskList.push(rows);
                delete  Task.incompleteTaskList [Task.incompleteTaskList.indexOf(rows)];
                vm.CompleteTaskList = Task.CompleteTaskList;
                vm.incompleteTaskList = Task.incompleteTaskList;
            }
            Profile.updateTask(vm.compltedTask, Profile.currentUser.id);
        }
        vm.removeUserTask = function(row) {

            if (row.category == "mandatory"){
              vm.TaskCount.CompMandatory = vm.TaskCount.CompMandatory - 1;
             } else if(row.category == "additional"){
               vm.TaskCount.CompAdditional = vm.TaskCount.CompAdditional - 1;
             } else if(row.category == "others"){
                vm.TaskCount.CompOthers = vm.TaskCount.CompOthers - 1;
             }

            if (vm.incompltedTask.indexOf(row.$id) < 0) {
              // row.compHide = false;
              // row.incompHide = true;
                vm.incompltedTask.push(row.$id);
                delete vm.compltedTask[vm.compltedTask.indexOf(row.$id)];
                Task.incompleteTaskList.push(row);
                delete  Task.CompleteTaskList [Task.CompleteTaskList.indexOf(row)];
                vm.CompleteTaskList = Task.CompleteTaskList;
                vm.incompleteTaskList = Task.incompleteTaskList;
            }
            vm.elemId = Profile.currentUser.Completed.indexOf(row.$id);

            Profile.removeTask(vm.elemId, Profile.currentUser.id);
        }
        $scope.$watch('totalTask', function() {
            vm.CompleteTaskList = [];
            vm.incompleteTaskList = [];
            vm.TaskCount.totalMandatory =0;
            vm.TaskCount.totalAdditional =0;
            vm.TaskCount.totalOthers =0;
            vm.TaskCount.CompMandatory =0;
            vm.TaskCount.CompAdditional =0;
            vm.TaskCount.CompOthers =0;
            try {
                $scope.totalTask.$loaded().then(function() {
                    angular.forEach($scope.totalTask, function(key, value) {

                      if (key.category == "mandatory"){
                        vm.TaskCount.totalMandatory = vm.TaskCount.totalMandatory + 1;
                       } else if(key.category == "additional"){
                         vm.TaskCount.totalAdditional = vm.TaskCount.totalAdditional + 1;
                       } else if(key.category == "others"){
                          vm.TaskCount.totalOthers = vm.TaskCount.totalOthers + 1;
                       }
                       console.log("Arraycheck");
                       console.log(Array.isArray(vm.compltedTask));
                        if (vm.compltedTask.indexOf(key.$id) < 0) {
                            vm.incompleteTaskList.push(key);
                            Task.incompleteTaskList = vm.incompleteTaskList;
                        } else {
                            vm.CompleteTaskList.push(key);
                            Task.CompleteTaskList = vm.CompleteTaskList;
                            if (key.category == "mandatory"){
                              vm.TaskCount.CompMandatory = vm.TaskCount.CompMandatory + 1;
                             } else if(key.category == "additional"){
                               vm.TaskCount.CompAdditional = vm.TaskCount.CompAdditional + 1;
                             } else if(key.category == "others"){
                                vm.TaskCount.CompOthers = vm.TaskCount.CompOthers + 1;
                             }

                        }
                    })
                })
            } catch (error) {

            }
        });

          $scope.$watch('vm.CompleteTaskList', function() {
            console.log("scope change");
          });
        /* Dial Plugin - Need to reform  ================================================================= */
        $scope.current = 60;
        $scope.max = 100;
        $scope.offset = 0;
        $scope.timerCurrent = 0;
        $scope.uploadCurrent = 0;
        $scope.stroke = 15;
        $scope.radius = 75;
        $scope.isSemi = false;
        $scope.rounded = true;
        $scope.responsive = false;
        $scope.clockwise = true;
        $scope.currentColor = '#45ccce';
        $scope.bgColor = '#eaeaea';
        $scope.duration = 800;
        $scope.currentAnimation = 'easeOutCubic';
        $scope.animationDelay = 0;
        $scope.animations = [];
        $scope.getStyle = function() {
            var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';
            return {
                'top': $scope.isSemi ? 'auto' : '50%',
                'bottom': $scope.isSemi ? '5%' : 'auto',
                'left': '50%',
                'transform': transform,
                '-moz-transform': transform,
                '-webkit-transform': transform,
                'font-size': $scope.radius / 6 + 'px'
            };
        };
        /* Dial Plugin - Need to reform  ================================================================= */
    }
])

.controller('createTaskController', ['$scope', 'fireFactory', 'Task', function($scope, fireFactory, Task) {
    var vm = this;
    vm.Task = {};
    vm.task_option = ["mandatory", "additional", "others"];
    vm.Task.category = vm.task_option[0];
    vm.feildReset = function() {
        vm.Task = {};
        vm.Task.category = vm.task_option[0];
    }
    vm.createTask = function() {
        try {
            Task.pushTask(vm.Task);
            vm.feildReset();
        } catch (error) {};
    }

}])
