angular.module('BabyBoomApp')
.controller('LoginController', LoginController);

function LoginController($http, $location) {
  console.log('LoginController loaded');
  var ctrl = this;

  ctrl.login = function() {
    console.log('logging in');
    ctrl.message = "";
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      console.log(response);
      $location.path('/home');
    }, function(error) {
      console.log('error logging in', error);
      ctrl.password = "";
      ctrl.message = "Error logging in, Please try again."
    });
  };
}