var verbose = true;

angular.module('BabyBoomApp').controller('BuildPDFController', function($http, $location){

console.log('inside buildpdf controller');

var ctrl = this;


// does this need further changes?
ctrl.populateDom = function () {
  $http.get('/bbdb/showCompleted').then(function(response) {
    console.log('here!' , response.data);
    ctrl.achievementList = response.data; // standard achievements


    ctrl.achievementList.forEach(function (singleAch) {
      singleAch.achievement_completed_date = new Date(singleAch.achievement_completed_date)

      //.toISOString().slice(0,10);
    })

//     console.log(ctrl.completedList);

  });

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
