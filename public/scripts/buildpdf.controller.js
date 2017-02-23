var verbose = true;

angular.module('BabyBoomApp').controller('BuildPDFController', function($http, $location){

console.log('inside buildpdf controller');

var ctrl = this;

ctrl.achievementList = [];



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
