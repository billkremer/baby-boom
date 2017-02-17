// routing
angular
  .module("BabyBoomApp")
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "HomeController as home",
        authRequired: true
      })
      .when("/profilePage", {
        templateUrl: "views/profile.html",
        controller: "ProfileController as profile",
        authRequired: true
      })
      .when("/contactsPage", {
        templateUrl: "views/contacts.html",
        controller: "ContactController as contact",
        authRequired: true
      })
      .when("/achievementsPage", {
        templateUrl: "views/achievements.html",
        controller: "AchievementsController as achievements",
        authRequired: true
      })
      .when("/newUser", {
        templateUrl: "views/register.html",
        controller: "RegisterController as register"
      })
      .otherwise({
        templateUrl: "views/login.html",
        controller: "LoginController as login"
      });
  })
  .run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      AuthService.checkLoginStatus().then(function(loggedIn) {
        console.log(loggedIn);
        if (next.authRequired && !loggedIn) {
          $location.path("/login");
          $route.reload();
        }
      });
    });
  });
