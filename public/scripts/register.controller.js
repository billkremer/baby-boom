angular.module('BabyBoomApp').controller('RegisterController', function($http, $location){
  var ctrl = this;

  ctrl.register = function() {
    console.log('creating a new user');

    $http.post('/register', {
      username: ctrl.username.toLowerCase(),
      password: ctrl.password,
      user_fullname: ctrl.userFullName,
      user_baby_name: ctrl.babyName,
      user_baby_birthday: ctrl.babyBirthday
    }).then(function(response){
      console.log(response);
      $location.path('/home');
    }, function(error) {
      console.log('error registering new user', error);
      ctrl.message = "Error registering new user: "+ error.data;
    });
  };
});
