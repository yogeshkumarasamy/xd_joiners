xdapp.factory("fireFactory",['$firebaseObject', '$firebaseAuth','$firebaseArray',
    function($firebaseObject,$firebaseAuth,$firebaseArray){
      return{
        authRef : function(){
          return($firebaseAuth())
        },
        arrayRef : function(){return ($firebaseArray(db_ref));},

      }
}])
.factory('Profile',['$firebaseObject',function($firebaseObject){
  return {
    getProfile : function(id){
      return $firebaseObject(db_ref.child('userBase').child(id));
    },
    pushProfile : function(response,user){
      this.userElement = firebase.database().ref('/userBase/'+ response.uid);
      this.userElement.set(user);
    }
  }

}])
.factory('Task',['$firebaseObject',function($firebaseObject){

  return{

    pushTask : function(data){
       var id;
      this.parentElement = firebase.database().ref('/taskList');
       this.parentElement.once("value", function(snapshot) {
             id = snapshot.numChildren() + 1;
                  }).then(function(){
        this.taskElement = firebase.database().ref('/taskList/'+id);
        this.taskElement.set(data);
     });
    }

  }
}])
