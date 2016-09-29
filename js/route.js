xdapp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/signin');
    $stateProvider
    // Login View
        .state('signin', {
            url: '/signin',
            templateUrl: 'template/login/signIn.html',
            controller: 'loginController',
            controllerAs: "login"
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'template/login/signup.html',
            controller: "RegistrationController",
            controllerAs: "regs"
        })
        .state('forgetPassword', {
            url: '/forgetPassword',
            templateUrl: 'template/login/forgetPassword.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'template/dashboard/dashboard.html',
            controller: 'DashController',
            redirectTo: 'dashboard.status',
            controllerAs: "dashboard"

        })
        .state('dashboard.status', {
            url: '/status',
            templateUrl: 'template/dashboard/main_content.html',
            controller: 'statusController',
            controllerAs: "status"
        })
        .state('dashboard.new_task', {
            url: '/new_task',
            templateUrl: 'template/dashboard/new_task.html',
            controller: 'createTaskController',
            controllerAs: "createTask"
        })
        .state('dashboard.task_list', {
            url: '/task_list',
            templateUrl: 'template/dashboard/task_list.html',
            controller: 'TasklistController'
        })


});
