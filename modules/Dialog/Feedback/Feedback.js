module.controller('feedbackCtrl',function($scope,$modalInstance,data){
    //-- Variables --//

    $scope.user = {name : ''};
    $scope.user = {email : ''};

    //-- Methods --//

    $scope.cancel = function(){
      $modalInstance.dismiss('Canceled');
    }; // end cancel

    $scope.save = function(){
      $modalInstance.close($scope.user);
    }; // end save

    $scope.hitEnter = function(evt){
      if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,'')) && !(angular.equals($scope.user.email,null) || angular.equals($scope.user.email,''))){
        console.log(!(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,'')));
        console.log(!(angular.equals($scope.user.email,null) || angular.equals($scope.user.email,'')));
        $scope.save();}
      else
      {console.log(!(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,'')));
        console.log(!(angular.equals($scope.user.email,null) || angular.equals($scope.user.email,'')));}
    };
  }); 

var myFeedback = angular.module('myFeedback', []);
myFeedback.service('feedbackService',['$http',function($http){
  var feedback =this;
  feedback.message={};
  feedback.errors={};
  feedback.sucess=false;

  this.sendFeedback = function(name, email, feedback) {
    $http({
          url: 'modules/Dialog/Feedback/Feedback.php',
          method: "POST",
          // withCredentials: true,
          // headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
          data: {   
                    name: name,
                    email: email
                  }
        }).success(function(data, thisService) {

            if (!data.success) {
              // if not successful, bind errors to error variables
              feedback.errors= data.errors;
            } else {
              // if successful, bind success message to message
              feedback.message= data.message;
              feedback.sucess=true;
            }
          });
  };
}]);