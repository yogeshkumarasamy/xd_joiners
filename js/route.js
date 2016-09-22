xdapp.config(function($stateProvider,$urlRouterPriovider){

  $urlRouterPriovider.otherwise('/');
  $stateProvider
    .state("login",{
      url : "/login",
      templateUrl : "/template/login.html"
    })

})
