xdapp.config(function($stateProvider,$urlRouterProvider){
    
  $urlRouterProvider.otherwise('/login');
  $stateProvider
  .state('login', {
      url: '/login',
      templateUrl: "template/login.html"
  })
      .state('register', {
          url: "/register",
          templateUrl: "template/register.html"
      })

    .state('forgetPassword', {
        url: "/forgetPassword",
        templateUrl: "template/forget_Password.html"
    });

})
