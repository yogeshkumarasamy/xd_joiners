xdapp.config(function($stateProvider, $urlRouterProvider) {    
    $urlRouterProvider.otherwise('/');    
    $stateProvider        
        // Login View
        .state('login', {
            url: '/login',
            templateUrl: 'template/login.html'
        }).state('register', {
            url: '/register',
            templateUrl: 'template/register.html',
            controller: 'RegistrationController'
        });
        
});
