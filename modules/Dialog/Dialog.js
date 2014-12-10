var myDialog = angular.module('myDialog', ['ui.bootstrap','dialogs.main', 'myFeedback']);
myDialog.service('dialogService',['$timeout','dialogs', 'feedbackService', function($timeout,dialogs, feedbackService){
    this.launch = function(which){
      switch(which){
        case 'error':
          dialogs.error();
          break;
        case 'notify':
          dialogs.notify();
          break;
        case 'confirm':
          var dlg = dialogs.confirm();
          dlg.result.then(function(btn){
            // this.confirmed = 'You confirmed "Yes."';
          },function(btn){
            // this.confirmed = 'You confirmed "No."';
          });
          break;
        case 'feedback':
          var dlg = dialogs.create('modules/dialog/feedback/feedback.html','feedbackCtrl',{},{size:'lg',keyboard: true,backdrop: true,windowClass: 'my-class'});
          dlg.result.then(function(user){
            feedbackService.sendFeedback(user.name,user.email);
            dialogs.notify('Nachricht gesendet', 'Wir haben Deine Anfrage erhalten');
          },function(){
            //if nothing do xy

          });
          break;
      }
    }; // end launch
  }]);

  