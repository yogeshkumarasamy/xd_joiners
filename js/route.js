xdapp.config(function($stateProvider, $urlRouterProvider) {    
    $urlRouterProvider.otherwise('/login_new/signin');    
    $stateProvider        
        // Login View
  
        .state('signin', {
            url: '/signin',
            templateUrl: 'template/login/signIn.html'
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
        .state('login', {
            url: '/login',
            templateUrl: 'template/login.html'
        })
        
});
