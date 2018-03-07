(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('app', {
        abstract: true,
        url: '/{lang:(?:en|fr)}',
        template: '<ui-view/>',
        params: {
          lang: {
            value: function($translate){
              return $translate.use();
            }
          }
        }
      })
      .state('app.home', {
        url: '',
        templateUrl: '/modules/core/client/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '{{ "HOME" | translate }}'
        }
      })
      .state('app.not-found', {
        url: '/not-found',
        templateUrl: '/modules/core/client/views/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true,
          pageTitle: 'Not Found'
        },
        ncyBreadcrumb: {
          label: 'Not Found'
        }
      })
      .state('app.bad-request', {
        url: '/bad-request',
        templateUrl: '/modules/core/client/views/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true,
          pageTitle: 'Bad Request'
        },
        ncyBreadcrumb: {
          label: 'Bad Request'
        }
      })
      .state('app.forbidden', {
        url: '/forbidden',
        templateUrl: '/modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Forbidden'
        }
      })
      .state('app.disclaimer', {
        url: '/disclaimer',
        templateUrl: '/modules/core/client/views/disclaimer.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Disclaimer'
        }
      })
      .state('app.privacy', {
        url: '/privacy',
        templateUrl: '/modules/core/client/views/privacy.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Privacy'
        }
      })
      .state('app.accessibility', {
        url: '/accessibility',
        templateUrl: '/modules/core/client/views/accessibility.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Accessibility'
        }
      })
      .state('app.codewithus', {
        url: '/codewithus',
        templateUrl: '/modules/core/client/views/codewithus.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Code With Us'
        }
      })
      .state('roadmap', {
        url: '/roadmap',
        templateUrl: '/modules/core/client/views/roadmap.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Roadmap'
        }
      })
      .state('iotblog', {
        url: '/iotblog',
        templateUrl: '/modules/core/client/views/iotblog.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'IOT Blog'
        }
      })
      .state('app.codewithusps', {
        url: '/codewithusps',
        templateUrl: '/modules/core/client/views/codewithus-ps.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Code With Us'
        }
      })
      .state('app.copyright', {
        url: '/copyright',
        templateUrl: '/modules/core/client/views/copyright.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Copyright'
        }
      })
      ;
  }
}());
