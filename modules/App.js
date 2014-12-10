var module;

module = angular.module('App', ['ui.router', 'myDialog', 'UserApp', 'djds4rce.angular-socialshare']);

//CONFIG
module.config(function($urlRouterProvider, $stateProvider) {
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

  // $stateProvider
  //   .state('signup',{
  //     url:'/signup',
  //     templateUrl:'modules/Home/Home.html',
  //     controller: 'HomeCtrl',
  //     controllerAs:'homeCtrl'
  //   });
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
});



//CONTROLLER
module.controller('RootCtrl', ['dialogService', '$rootScope',function(dialogService, $rootScope) {
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
  // console.log(this.rootUrl);
}]);

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

module.run(function(user, $FB) {
  user.init({ appId: '548865ee78c79' });
  $FB.init('475092975961783');
});