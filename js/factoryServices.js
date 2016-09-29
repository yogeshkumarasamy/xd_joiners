xdapp.factory("fireFactory", ['$firebaseObject', '$firebaseAuth', '$firebaseArray',
    function($firebaseObject, $firebaseAuth, $firebaseArray) {
        return {
            authRef: function() {
                return ($firebaseAuth())
            },
            arrayRef: function() {
                return ($firebaseArray(db_ref));
            },

        }
    }
])

.factory('Profile', ['$firebaseObject', function($firebaseObject) {
    return {
        currentUser: {},
        getProfile: function(id) {
            return $firebaseObject(db_ref.child('userBase').child(id));
        },
        pushProfile: function(response, user) {
            this.userElement = firebase.database().ref('/userBase/' + response.uid);
            this.userElement.set(user);
        },
        updateTask: function(taskId, UserId) {
            this.userElement = firebase.database().ref('/userBase/' + UserId + '/Completed');
            console.log(taskId + '----' + UserId);
            console.log(this.userElement);
            this.userElement.set(taskId);
            console.log("update Task");
        },
        removeTask: function(taskId, UserId) {
            this.userElement = firebase.database().ref('/userBase/' + UserId + '/Completed/' + taskId);
            console.log(taskId + '----' + UserId);
            console.log(this.userElement);
            this.userElement.set(null);
            console.log("update Task");

        }
    }

}])

.factory('Task', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray) {

    return {
        getTask: function() {
            return $firebaseArray(db_ref.child('taskList'));
        },
        CompleteTaskList: [],
        incompleteTaskList: [],

        pushTask: function(data) {
            var id;
            data.status = "new";
            this.parentElement = firebase.database().ref('/taskList');
            this.parentElement.once("value", function(snapshot) {
                id = snapshot.numChildren() + 1;
            }).then(function() {
                this.taskElement = firebase.database().ref('/taskList/' + id);
                this.taskElement.set(data);
            });
        }
    }
}])
