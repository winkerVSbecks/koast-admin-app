'use strict';

angular.module('koastAdminApp.directives', []);

angular.module('koastAdminApp', [
    'ui.router',
    'ngAnimate',
    'koastAdminApp.service',
    'koastAdminApp.directives'
  ])
  .controller('mainCtrl', function() {
  })
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/home/home.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'app/login/login.html',
          controller: 'loginCtrl'
         })
        .state('backup', {
          url: '/backup',
          templateUrl: 'app/backup/backup.html',
          controller: 'backupCtrl as backupCtrl'
        });

      $urlRouterProvider.otherwise('/');
    }
  ])
  .run(function($state, $rootScope, user) {
    $rootScope.$on('$stateChangeSuccess', function() {
      if(!user.isAuthenticated() && $state.current.name !== 'login') {
        $state.go('login', { redirect: $state.current });
      }
    });
  });

angular.module('koastAdminApp.service', ['koast'])
  .value('ADMIN_DISCOVERY_PATH', 'TODO')
  .value('KOAST_ROOT', 'http://TODO/api/')
  .run(function (koastAdmin) {
    //load the supported koast admin functionality and urls as soon as the app is loaded
    koastAdmin.load();
  });
