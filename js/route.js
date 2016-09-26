xdapp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/signin');
    $stateProvider
        // Login View

        .state('signin', {
            url: '/signin',
            templateUrl: 'template/login/signIn.html',
            controller : 'loginController'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'template/login/signup.html',
            controller : "RegistrationController"
        })
         .state('forgetPassword', {
            url: '/forgetPassword',
            templateUrl: 'template/login/forgetPassword.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'template/dashboard/dashboard.html',
            controller : 'DashController',
            redirectTo: 'dashboard.main'
        })
        .state('dashboard.status', {
            url: '/status',
            templateUrl: 'template/dashboard/main_content.html',
            controller : 'DashController'
        })
        .state('dashboard.new_task', {
            url: '/new_task',
            templateUrl: 'template/dashboard/new_task.html',
            controller : 'DashController'
        })


});
