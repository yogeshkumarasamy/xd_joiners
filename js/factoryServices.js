xdapp.factory("fireFactory",['$firebaseObject', '$firebaseAuth','$firebaseArray',
    function($firebaseObject,$firebaseAuth,$firebaseArray){
     var db_ref = firebase.database().ref();
      return{
        authRef : function(){
          return($firebaseAuth())
        },
        arrayRef : function(){return ($firebaseArray(db_ref));},

      }
}])
