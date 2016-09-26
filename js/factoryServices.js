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
      console.log ("User Created Successfully!!!");
      this.userElement = firebase.database().ref('/userBase/'+ response.uid);
      this.userElement.set(user);
    }
  }

}])
