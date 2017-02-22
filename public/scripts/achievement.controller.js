var verbose = true;

angular.module('BabyBoomApp').controller('AchievementsController', function($http, $location){

console.log('inside achievements controller');

var ctrl = this;

var customAchievementToSave = {
  userid: null,
  achievement_id: 1000000, // increment after adding
  achievement_completed_text: "",
  achievement_completed_date: null,
  achievement_completed_comment: ""
 }



ctrl.addAchievement = function (achievement) {
  if (verbose) console.log('achievement to add',achievement);

// need to add date field.

  $http.post('/bbdb/saveAchievement', achievement).then( function(response) {

    if (verbose) console.log(response);

    ctrl.populateDom();


  })



}// close addAchievement // could merge this with add custom achievement

ctrl.getOnePlusHighestCustomAchievementID = function () {
  if (verbose) console.log('get this far custach');
  $http.get('/bbdb/highestCustomAchievementID').then( function(response) {
  //  console.log('response.data[0]', response.data[0].max);
    customAchievementToSave.achievement_id = response.data[0].max + 1;

});
}; // close getOnePlusHighestCustomAchievementID

ctrl.getOnePlusHighestCustomAchievementID();


ctrl.addCustomAchievement = function (customAchievementText, customAchievementComment, customAchievementDate) {

if (verbose) console.log(customAchievementDate);

if (customAchievementDate == undefined) {
  customAchievementDate = new Date();
};

  customAchievementToSave.achievement_completed_text = customAchievementText;
  customAchievementToSave.achievement_completed_comment = customAchievementComment
  customAchievementToSave.achievement_completed_date = (customAchievementDate); // new Date() necessary?

//   customAchievementToSave.userid =
  $http.post('/bbdb/addCustomAchievement', customAchievementToSave).then(function(response) {

  if (verbose)   console.log(response);
    ctrl.getOnePlusHighestCustomAchievementID();

    ctrl.customAchievement.text = "";
    ctrl.customAchievement.comment = "";
    ctrl.customAchievement.date = new Date(); //?

  });

}; // close add custom achievement


ctrl.populateDom = function () {
  $http.get('/bbdb/achmtsPlusMinusTwoMos').then(function(response) {
  if (verbose)   console.log('here!' , response.data);
    ctrl.achievementList = response.data; // standard achievements

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
