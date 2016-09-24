xdapp.factory("fireFactory",['$firebaseObject', '$firebaseAuth','$firebaseArray',
    function($firebaseObject,$firebaseAuth,$firebaseArray){
      var db_ref = new firebase("https://xdnewjoiner.firebaseio.com/");
      var usr_ref = new firebase("https://xdnewjoiner.firebaseio.com/users");
      return{
        authRef : function(){return($firebaseAuth(db_ref));},
        arrayRef : function(){return ($firebaseArray(db_ref));},
        userRef : function(){return ($firebaseArray(usr_ref));},
      }
}])
