var verbose = false; // turns off console.logs

angular.module('BabyBoomApp')
.controller('LoginController', LoginController);

function LoginController($http, $location) {
  console.log('LoginController loaded');
  var ctrl = this;

  ctrl.login = function() {
    if (verbose) console.log('logging in');
    ctrl.message = "";
    $http.post('/login', {
      username: ctrl.username.toLowerCase(),
      password: ctrl.password
    }).then(function(response){
    if (verbose) console.log('LoginController response',response);
      $location.path('/home');
    }, function(error) {
      if (verbose) console.log('error logging in', error);
      ctrl.password = "";
      ctrl.message = "Error logging in, Please try again."
    });
  };
}
