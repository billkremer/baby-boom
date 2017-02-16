angular.module('BabyBoomApp').controller('ProfileController', function($http, $location){

// console.log('result',result.user);
var temp = {};

var ctrl = this;

ctrl.getProfileData = function () {
  console.log("trying to get data");
  $http.get('/profile').then(function(response) {


    console.log('gothere profilecontroller?', response);
    ctrl.id = response.data.id;
    ctrl.username = response.data.username;
    ctrl.realName = response.data.user_fullname;
    ctrl.babyName = response.data.user_baby_name;
    ctrl.babyBirthday = new Date(response.data.user_baby_birthday); // comes from the db as a string? so needs to be a Date again...

    }).catch(function(err){
        console.log('Error getting data');
      });

  };
// console.log(temp);


ctrl.getProfileData();

// console.log('this',this);


ctrl.updateProfile = function () {

  console.log(ctrl);

  var objectToSend = {
    id: ctrl.id,
    username: ctrl.username,
    realName: ctrl.realName,
    babyName: ctrl.babyName,
    babyBirthday: ctrl.babyBirthday,
  }


  $http.put('/profile', objectToSend);








};





  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }


}); // closes controller
