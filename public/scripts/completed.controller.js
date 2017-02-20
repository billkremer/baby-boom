angular.module('BabyBoomApp').controller('CompletedController', function($http, $location){

console.log('inside completed controller');

var ctrl = this;

// var customAchievementToSave = {
//   userid: null,
//   achievement_id: 1000000, // increment after adding
//   achievement_completed_text: "",
//   achievement_completed_date: null,
//   achievement_completed_comment: ""
//  }



// ctrl.addAchievement = function (achievement) {
//   console.log('achievement to add',achievement);
//
// // need to add date field.
//
//   $http.post('/bbdb/saveAchievement', achievement).then( function(response) {
//
//     console.log(response);
//
//     ctrl.populateDom();
//
//
//   })
//
//
//
// }// close addAchievement // could merge this with add custom achievement

// ctrl.getOnePlusHighestCustomAchievementID = function () {
//   console.log('get this far custach');
//   $http.get('/bbdb/highestCustomAchievementID').then( function(response) {
//   //  console.log('response.data[0]', response.data[0].max);
//     customAchievementToSave.achievement_id = response.data[0].max + 1;
//
// });
// }; // close getOnePlusHighestCustomAchievementID
//
// ctrl.getOnePlusHighestCustomAchievementID();
//
//
// ctrl.addCustomAchievement = function (customAchievementText, customAchievementComment, customAchievementDate) {
//
// console.log(customAchievementDate);
//
// if (customAchievementDate == undefined) {
//   customAchievementDate = new Date();
// };
//
//   customAchievementToSave.achievement_completed_text = customAchievementText;
//   customAchievementToSave.achievement_completed_comment = customAchievementComment
//   customAchievementToSave.achievement_completed_date = (customAchievementDate); // new Date() necessary?
//
// //   customAchievementToSave.userid =
//   $http.post('/bbdb/addCustomAchievement', customAchievementToSave).then(function(response) {
//
//     console.log(response);
//   ctrl.getOnePlusHighestCustomAchievementID();
//
//     // customAchievementToSave.achievement_id++; // so the next custom achiement has anew number.
//
//   })
//
// }; // close add custom achievement


ctrl.updateCompleted = function (oneToUpdate) {
  console.log(oneToUpdate);

  $http.put('/bbdb/updateCompleted', oneToUpdate);

  ctrl.populateDom();
}; // close updateCompleted




ctrl.populateDom = function () {
  $http.get('/bbdb/showCompleted').then(function(response) {
    console.log('here!' , response.data);
    ctrl.completedList = response.data; // standard achievements


    ctrl.completedList.forEach(function (singleAch) {
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
