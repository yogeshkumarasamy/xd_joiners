xdapp.controller('loginController', ['$scope', 'fireFactory', '$http', '$location', 'Profile',
    function($scope, fireFactory, $http, $location, Profile) {

        $scope.usrAuth = function() {

            try {

                var authObj = fireFactory.authRef();
                authObj.$signInWithEmailAndPassword($scope.usr.Name, $scope.usr.Pwd)
                    .then(function(user) {
                        $location.path("/dashboard/status");
                        Profile.currentUser = user.uid;
                    }).catch(function(error) {})
            } catch (error) {};
        }

    }
])

.controller('RegistrationController', ['$scope', 'fireFactory', '$location', 'Profile', function($scope, fireFactory, $location, Profile) {
        $scope.user = {};
        $scope.regError = "test";
        $scope.msg = "I am in RegistrationController";
        var authObj = fireFactory.authRef();
        $scope.registerUser = function() {
            try {
                authObj.$createUserWithEmailAndPassword($scope.user.email, $scope.user.pwd)
                    .then(function(response) {
                        $scope.user.id = response.uid;
                        $scope.user.role = "new";
                        Profile.pushProfile(response, $scope.user);
                    })
                    .then(function() {
                        $location.path('/signin')
                    })
            } catch (error) {
                // console.log(error);
                $scope.regError = error.message;
            };
        }
    }])
    .controller('DashController', ['$scope', '$state', 'fireFactory', 'Profile', function($scope, $state, fireFactory, Profile) {
        $scope.userProfile = {}
        $scope.auth = fireFactory.authRef();
        $scope.userProfile = {};
        $scope.auth.$onAuthStateChanged(function(response) {
            $scope.userProfile = Profile.getProfile(response.uid);
            Profile.currentUser = $scope.userProfile;
            Profile.currentUser.$loaded().then(function() {
                $state.go("dashboard.status");
            });

        });
    }])

.controller('statusController', ['$q', '$state', '$scope', '$interval', '$timeout', '$window', 'roundProgressService',
    'fireFactory', 'Profile', 'Task',
    function($q, $state, $scope, $interval, $timeout, $window, roundProgressService, fireFactory, Profile, Task) {
        $scope.auth.$onAuthStateChanged(function(response) {
            var deferred = $q.defer();
            $scope.compltedTask = [];
            $scope.userProfile = {};
            $scope.CompleteTaskList = [];
            $scope.incompleteTaskList = [];
            $scope.taskCategory = "mandatory";
            $scope.totalTask = [];
            $scope.incompltedTask = [];
            $scope.totalTask = Task.getTask();
            $scope.userProfile = Profile.getProfile(response.uid);
            Profile.currentUser = $scope.userProfile;
            Profile.currentUser.$loaded().then(function() {
                $scope.compltedTask = Profile.currentUser.Completed === undefined ? [] : Profile.currentUser.Completed;
            });
        });
        $scope.pushUserTask = function(rows) {
            rows.compHide = true;
            rows.incompHide = false;

            if ($scope.compltedTask.indexOf(rows.$id) < 0) {
                $scope.compltedTask.push(rows.$id);
                Task.CompleteTaskList.push(rows);
            }
            Profile.updateTask($scope.compltedTask, Profile.currentUser.id);
        }
        $scope.removeUserTask = function(row) {
            row.compHide = false;
            row.incompHide = true;
            if ($scope.incompltedTask.indexOf(row.$id) < 0) {
                $scope.incompltedTask.push(row.$id);
                Task.incompleteTaskList.push(row);
            }
            var elemId = Profile.currentUser.Completed.indexOf(row.$id);

            Profile.removeTask(elemId, Profile.currentUser.id);
        }
        $scope.$watch('totalTask', function() {
            $scope.CompleteTaskList = [];
            $scope.incompleteTaskList = [];
            try {
                $scope.totalTask.$loaded().then(function() {
                    angular.forEach($scope.totalTask, function(key, value) {
                        if ($scope.compltedTask.indexOf(key.$id) < 0) {
                            $scope.incompleteTaskList.push(key);
                            Task.incompleteTaskList = $scope.incompleteTaskList;
                        } else {
                            $scope.CompleteTaskList.push(key);
                            Task.CompleteTaskList = $scope.CompleteTaskList;
                        }
                    })
                })
            } catch (error) {

            }
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
    $scope.Task = {};
    $scope.task_option = ["mandatory", "additional", "others"];
    $scope.Task.category = $scope.task_option[0];
    $scope.feildReset = function() {
        $scope.Task = {};
        $scope.Task.category = $scope.task_option[0];
    }
    $scope.createTask = function() {
        try {
            Task.pushTask($scope.Task);
            $scope.feildReset();
        } catch (error) {};
    }

}])
