angular.module('BabyBoomApp').controller('CompletedController', function($http, $location){

  console.log('inside completed controller');

  var ctrl = this;



  ctrl.achChanged = function (individualAch) {
    individualAch.hideButton = false;
    // console.log('changed');

    ctrl.completedList.forEach(function (singleAch) {
      singleAch.disabledAch = true;
    }); // close forEach

    individualAch.disabledAch = false;

    //console.log(ctrl.completedList);    
  };


  ctrl.updateCompleted = function (oneToUpdate) {
    // console.log(oneToUpdate);

    $http.put('/bbdb/updateCompleted', oneToUpdate);

    oneToUpdate.hideButton = true;
    ctrl.populateDom();
  }; // close updateCompleted


  ctrl.populateDom = function () {
    $http.get('/bbdb/showCompleted').then(function(response) {
      // console.log('here!' , response.data);
      ctrl.completedList = response.data; // standard achievements


      ctrl.completedList.forEach(function (singleAch) {
        singleAch.achievement_completed_date = new Date(singleAch.achievement_completed_date);
        singleAch.hideButton = true;
        singleAch.disabledAch = false;
      }); // close forEach

    }); // close then.

    //  ??? profit!!??
  }; // close populateDom

  ctrl.populateDom();



  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }; // closes logout

}); // closes controller
