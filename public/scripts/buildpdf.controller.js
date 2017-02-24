var verbose = true;

angular.module('BabyBoomApp').controller('BuildPDFController', function($http, $location){

console.log('inside buildpdf controller');

var ctrl = this;

ctrl.achievementList = [];

ctrl.sendingEmail = false;




ctrl.sendEmail = function () {

  ctrl.sendingEmail = true;

  var emailDataObject = {
    id: ctrl.id,
    babyName: ctrl.babyName,
    months: ctrl.calculatedMonths,
    monthsText: ctrl.calculatedMonthsText,

    photo: ctrl.photoForPdf, // photo object
    aches: ctrl.achPdfList, // array of achievement objects selected.

    contacts: ctrl.contactList,
  };

  console.log('emailDataObject', emailDataObject);


  $http.post('/emails', emailDataObject).then(function(response) {
    console.log('back from emails.' , response.data);

  }).then(function() {
    $location.path('/home')
  });

};


ctrl.getEmails = function () {
  console.log("trying to get data");
  $http.get('/bbdb/getContacts').then(function(response) {
    ctrl.contactList = response.data;
  });
};

ctrl.getEmails();



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

    if (ctrl.calculatedMonths == 1) {
      ctrl.calculatedMonthsText = " month old";
    } else {
    ctrl.calculatedMonthsText = " months old";
    }

    }).catch(function(err){
        console.log('Error getting data');
      });

  };
// console.log(temp);


ctrl.getProfileData();



    ctrl.photoLimit = 1;
    ctrl.photoChecked = 0;

ctrl.checkPicChanged = function (picture) {
        if (picture.select) {
          ctrl.photoChecked++;
          console.log('checked',picture);
          ctrl.photoForPdf = picture;
        } else {
          ctrl.photoChecked--;
          console.log('unchecked',picture);
          ctrl.photoForPdf = {picture_url: "https://baby-boom.s3.amazonaws.com/1487877505494whitebox"};
          console.log(ctrl.photoForPdf);
        };
};


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
    }); //forEach closer // recreates the list each time.

    ctrl.achPdfList.forEach(function (item) {
      item.achievement_completed_date_string = item.achievement_completed_date.toString().substring(0,15);
    }); // shortens the date to a string.
    console.log(ctrl.achPdfList);
};





ctrl.populateDomAches = function () {
  $http.get('/bbdb/showCompleted').then(function(response) {
    console.log('here!' , response.data);
    ctrl.achievementList = response.data; // standard achievements

    ctrl.achievementList.forEach(function (singleAch) {
      singleAch.achievement_completed_date = new Date(singleAch.achievement_completed_date)
    });
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
