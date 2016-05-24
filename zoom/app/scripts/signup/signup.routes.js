'use strict';
angular
       .module('zoomApp')
       .run(handlerEmailConfirmation)
       .config(config);

function config($stateProvider, $urlRouterProvider, $locationProvider) {
 $stateProvider
    .state('signup', {
        url: '/signup',
        controller: 'SignupController as vm',
        templateUrl: 'scripts/signup/signup.html'
    })
 
};
handlerEmailConfirmation.$inject = ['$state', '$rootScope', 'toastr'];
function handlerEmailConfirmation($state, $rootScope, toastr) {
    var cleanupfunc1 = $rootScope.$on('auth:oauth-registration', function (ev, user) {
  toastr.success('Your account has been successfully created through facebook.', 'Welcome ' + user.email);
                 $rootScope.user = user;
                 $rootScope.home = true;
                 $state.go('app.home');
    });
   
    $rootScope.$on('$destroy', cleanupfunc1);

  

    var cleanupfunc2 = $rootScope.$on('auth:email-confirmation-success', function (ev, user) {
        toastr.success('Your account has been successfully created.', 'Welcome ' + user.email);
        $rootScope.user = user;
        $rootScope.home = true;
        $state.go('app.home');

    });
    $rootScope.$on('$destroy', cleanupfunc2);

    var cleanupfunc3 = $rootScope.$on('auth:email-confirmation-error', function () {
        toastr.error('Request a password reset to verify your identify.', 'Unable to confirm your account.');
    });
    $rootScope.$on('$destroy', cleanupfunc3);

    var cleanupfunc5 = $rootScope.$on('auth:validation-error', function () {
         toastr.wanning('You should log in.')
         $state.go('login');
      
    });
    $rootScope.$on('$destroy', cleanupfunc5);

    var cleanupfunc6 = $rootScope.$on('auth:session-expired', function () {
        toastr.wanning('Session has expired. Please log in.');
        $state.go('login');
    });
    $rootScope.$on('$destroy', cleanupfunc6);

   
}