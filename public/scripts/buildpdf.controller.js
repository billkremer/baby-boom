var verbose = true;

angular.module('BabyBoomApp').controller('BuildPDFController', function($http, $location){

console.log('inside buildpdf controller');

var ctrl = this;

ctrl.achievementList = [];





ctrl.getProfileData = function () {
  console.log("trying to get data");
  $http.get('/profile').then(function(response) {


    console.log('gothere buildpdf controller?', response);
    ctrl.id = response.data.id;
    ctrl.username = response.data.username;
    ctrl.realName = response.data.user_fullname;
    ctrl.babyName = response.data.user_baby_name;
    ctrl.babyBirthday = new Date(response.data.user_baby_birthday); // comes from the db as a string? so needs to be a Date again...


    var start_date = new Date(ctrl.babyBirthday); //Create start date object by passing appropiate argument
    var end_date = new Date(); // today
    var total_months = (end_date.getFullYear() - start_date.getFullYear())*12 + (end_date.getMonth() - start_date.getMonth() )  +  ( end_date.getDate() - start_date.getDate() ) /30 ;

    ctrl.calculatedMonths = Math.round(total_months);

    }).catch(function(err){
        console.log('Error getting data');
      });

  };
// console.log(temp);


ctrl.getProfileData();





    ctrl.photoLimit = 1;
    ctrl.photoChecked = 0;

ctrl.checkPicChanged = function (picture) {
        if (picture.select) { ctrl.photoChecked++;
        console.log(picture); }
        else {ctrl.photoChecked--;
          console.log(picture);
        }
        ctrl.photoForPdf = picture;

}
//console.log(ctrl.items)


ctrl.achievLimit = 4;
ctrl.achievChecked = 0;

ctrl.checkAchChanged = function (achievement) {
    if (achievement.select) { ctrl.achievChecked++;
    console.log(achievement); }
    else {ctrl.achievChecked--;
      console.log(achievement);
    }

    ctrl.achPdfList = [];
    ctrl.achievementList.forEach(function (singleAch) {
      if (singleAch.select) {
        ctrl.achPdfList.push(singleAch);
      }
    }); //forEach closer

    ctrl.achPdfList.forEach(function (item) {
      item.achievement_completed_date_string = item.achievement_completed_date.toString().substring(0,15);

    })


    console.log(ctrl.achPdfList);

};





// does this need further changes?
ctrl.populateDomAches = function () {
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

ctrl.populateDomAches();


//loads images already uploaded
ctrl.getImages = function () {
    $http.get('/photos')
        .then(function(response) {
            ctrl.photoList = response.data.slice(0,11);

            ctrl.photoList.forEach(function (singlePhoto) {
              singlePhoto.select = false;
            });
        console.log('GET /photos ', ctrl.photoList);
        });
        console.log('GET /photos ', ctrl.photoList);
}

//loads any already uploaded images
ctrl.getImages();





  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }; // closes logout

}); // closes controller
