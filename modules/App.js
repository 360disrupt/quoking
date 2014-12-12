var module;

//DEV//module = angular.module('App', ['ui.router', 'myDialog', 'djds4rce.angular-socialshare']);
module = angular.module('App', ['ui.router', 'myDialog', 'UserApp', 'djds4rce.angular-socialshare']);

//CONTROLLER
module.controller('RootCtrl', ['dialogService', '$rootScope', function(dialogService, $rootScope) {
  var mainThis=this;
  var dialogShown=false;
  this.rootUrl = './modules/';

  this.giveFeedback = function(){
    dialogService.launch('feedback');
    dialogShown=true;
  };

  this.exit = function() {
    if(!dialogShown) {
        mainThis.giveFeedback();
    }
  };
}]);

//CONFIG
module.config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/share');
  $stateProvider
  	.state('home',{
  		url:'/home',
  		templateUrl:'modules/Home/Home.html',
  		controller: 'HomeCtrl',
  		controllerAs:'homeCtrl',
      data: {
        login: true
      }  
    });
  
  $stateProvider
    .state('share',{
      url:'/share',
      templateUrl:'modules/Share/Share.html',
      controller: 'ShareCtrl',
      controllerAs:'ShareCtrl'
    });
  $stateProvider
    .state('agb',{
      url:'/agb',
      templateUrl:'modules/Legal/Agb.html',
      data: {
        public: true
      }  
    });
  
  $stateProvider
    .state('impressum',{
      url:'/impressum',
      templateUrl:'modules/Legal/Impressum.html',
      data: {
        public: true
      } 
  	});
   // use the HTML5 History API
    $locationProvider.html5Mode(true);
});


//DIRECTIVES
module.directive('headRow', function(){
  return{
    restrict: 'E',
    templateUrl: 'modules/Header/Header.html',
    controller: 'HeaderCtrl',
    controllerAs: 'headerCtrl'
  };
});

module.directive('footRow', function(){
  return{
    restrict: 'E',
    templateUrl: 'modules/Footer/Footer.html'
  };
});

//DEV
// module.run(function($FB) {
//   //  user.init({ appId: '548865ee78c79' });
//   $FB.init('475092975961783');
// });

//PROD
module.run(function(user, $FB) {
  user.init({ appId: '548865ee78c79' });
  $FB.init('475092975961783');
});