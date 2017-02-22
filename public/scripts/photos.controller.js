var verbose = true;
//
// angular.module('BabyBoomApp').controller('PhotosController',  function($scope, $http, $location, Upload){
//
angular.module('BabyBoomApp').controller('PhotosController', ['$http', '$location','$scope', 'Upload',  function($http, $location, $scope, Upload ){

// angular.module('BabyBoomApp').controller('PhotosController' function($scope, $http){

console.log('inside photos controller');

var ctrl = this;

//file variables
ctrl.file = '';
ctrl.uploads = [];
ctrl.comment = '';

ctrl.submit = function () {
  console.log('what da?');
  console.log(ctrl);



        console.log('file',ctrl.file);


      // if (ctrl.form.file.$valid && ctrl.file) {
    ctrl.upload(ctrl.file);
      //     console.log('file', ctrl.file);
      // }

  };





var photoToPost = {
  data: {
    file: ctrl.file,
    comment: ctrl.comment
  }

}




//loads images already uploaded
ctrl.getImages = function () {
    $http.get('/photos')
        .then(function(response) {
            ctrl.photoList = response.data;
            console.log('GET /photos ', response.data);
        });
}

//loads any already uploaded images
ctrl.getImages();




ctrl.upload = function(file) {

      Upload.upload({
          url: '/photos',
          data: {
              file: file,
              //can add more variables to data to store in DB
              comment: ctrl.comment
              //'var2': $scope.var2
          }
      }).then(function(resp) {
          console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
        ctrl.getImages();
      }, function(resp) {
          console.log('Error status: ' + resp.status);
      }

    );
  };













}]); // closes controller
