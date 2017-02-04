var app = angular
            .module('mof', [
              'ngCookies',
              'ngRoute',
              'ngStorage',
              'ngMessages',
              'angularMoment',
              'angular-loading-bar',
              'cloudinary',
              'ui.bootstrap',
              'appRoutes',
              'ngSanitize',
              'ngFileUpload',
              'toastr',
              'ngLodash',
              'angularUtils.directives.dirDisqus',
              'satellizer'])
  .config(['cfpLoadingBarProvider','$authProvider', function(cfpLoadingBarProvider, $authProvider){

    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/api/login';
    $authProvider.signupUrl = '/api/register';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';

    cfpLoadingBarProvider.includeSpinner   = false;
    cfpLoadingBarProvider.includeBar       = true;

  }]);