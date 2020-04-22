// =========================================================================
//
// All the client side routes for programs
//
// =========================================================================
(function () {
	'use strict';

	angular.module('programs.routes').config(['$stateProvider', function ($stateProvider) {
		$stateProvider
		// -------------------------------------------------------------------------
		//
		// this is the top level, abstract route for all program routes, it only
		// contians the ui-view that all other routes get rendered in
		//
		// -------------------------------------------------------------------------
		.state('en.programs', {
			abstract: true,
	    url: '/teams',
			template: '<ui-view autoscroll="true"></ui-view>',
	        params: {
	        	lang: 'en'
	        }
	    })
	    .state('fr.programs', {
			abstract: true,
	        url: '/equipes',
			template: '<ui-view autoscroll="true"></ui-view>',
	        params: {
	        	lang: 'fr'
	        }
	    })
		// -------------------------------------------------------------------------
		//
		// program listing. Resolve to all programs in the system and place that in
		// the scope. listing itself is done through a directive
		//
		// -------------------------------------------------------------------------
		.state('en.programs.list', {
			url: '',
			templateUrl: '/modules/programs/client/views/list-programs.client.view.html',
			data: {
				pageTitle: 'Teams List'
			},
			ncyBreadcrumb: {
				label: 'Teams List'
			},
			resolve: {
				programs: function ($stateParams, ProgramsService) {
					return ProgramsService.query ();
				}
			},
			controller: 'ProgramsListController',
			controllerAs: 'vm'
		})
		.state('fr.programs.list', {
			url: '',
			templateUrl: '/modules/programs/client/views/list-programs.client.view.html',
			data: {
				pageTitle: 'Liste des équipes'
			},
			ncyBreadcrumb: {
				label: 'Liste des équipes'
			},
			resolve: {
				programs: ['$stateParams', 'ProgramsService', function ($stateParams, ProgramsService) {
					return ProgramsService.query ();
				}]
			},
			controller: 'ProgramsListController',
			controllerAs: 'vm'
		})
		// -------------------------------------------------------------------------
		//
		// view a program, resolve the program data
		//
		// -------------------------------------------------------------------------
		.state('en.programs.view', {
			url: '/:programId',
			templateUrl: '/modules/programs/client/views/view-program.client.view.html',
			controller: 'ProgramViewController',
			controllerAs: 'vm',
			resolve: {
				program: ['$stateParams', 'ProgramsService', function ($stateParams, ProgramsService) {
					return ProgramsService.get({
						programId: $stateParams.programId
					}).$promise;
				}]
			},
			data: {
				pageTitle: 'Team: {{program.title}}'
			},
			ncyBreadcrumb: {
				label: '{{vm.program.title}}',
				parent: 'en.programs.list'
			}
		})
		.state('fr.programs.view', {
			url: '/:programId',
			templateUrl: '/modules/programs/client/views/view-program.client.view.html',
			controller: 'ProgramViewController',
			controllerAs: 'vm',
			resolve: {
				program: function ($stateParams, ProgramsService) {
					return ProgramsService.get({
						programId: $stateParams.programId
					}).$promise;
				}
			},
			data: {
				pageTitle: 'Équipe: {{program.title_fr}}'
			},
			ncyBreadcrumb: {
				label: '{{vm.program.title_fr}}',
				parent: 'fr.programs.list'
			}
		})
		// -------------------------------------------------------------------------
		//
		// the base for editing
		//
		// -------------------------------------------------------------------------
		.state('en.programadmin', {
			abstract: true,
			url: '/programadmin',
			template: '<ui-view autoscroll="true"></ui-view>',
	        params: {
	        	lang: 'en'
	        }
		})
		.state('fr.programadmin', {
			abstract: true,
			url: '/adminequipe',
			template: '<ui-view autoscroll="true"></ui-view>',
	        params: {
	        	lang: 'fr'
	        }
		})
		// -------------------------------------------------------------------------
		//
		// edit a program
		//
		// -------------------------------------------------------------------------
		.state('en.programadmin.edit', {
			url: '/:programId/edit',
			templateUrl: '/modules/programs/client/views/edit-program.client.view.html',
			controller: 'ProgramEditController',
			controllerAs: 'vm',
			resolve: {
				program: ['$stateParams', 'ProgramsService', function ($stateParams, ProgramsService) {
					return ProgramsService.get({
						programId: $stateParams.programId
					}).$promise;
				}],
				editing: function () { return true; },
				previousState: ['$state', function ($state) {
					return {
						name: $state.current.name,
						params: $state.params,
						url: $state.href($state.current.name, $state.params)
					};
				}]
			},
			data: {
				roles: ['admin', 'gov'],
				pageTitle: 'Team: {{ program.title }}'
			},
			ncyBreadcrumb: {
				label: 'Edit Team',
				parent: 'en.programs.list'
			}
		})
		.state('fr.programadmin.edit', {
			url: '/:programId/modifier',
			templateUrl: '/modules/programs/client/views/edit-program.client.view.html',
			controller: 'ProgramEditController',
			controllerAs: 'vm',
			resolve: {
				program: function ($stateParams, ProgramsService) {
					return ProgramsService.get({
						programId: $stateParams.programId
					}).$promise;
				},
				editing: function () { return true; },
				previousState: function ($state) {
					return {
						name: $state.current.name,
						params: $state.params,
						url: $state.href($state.current.name, $state.params)
					};
				}
			},
			data: {
				roles: ['admin', 'gov'],
				pageTitle: 'Équipe : {{ program.title_fr }}'
			},
			ncyBreadcrumb: {
				label: 'Modifier l\'équipe',
				parent: 'fr.programs.list'
			}
		})
		// -------------------------------------------------------------------------
		//
		// create a new program and edit it
		//
		// -------------------------------------------------------------------------
		.state('en.programadmin.create', {
			url: '/create',
			templateUrl: '/modules/programs/client/views/edit-program.client.view.html',
			controller: 'ProgramEditController',
			controllerAs: 'vm',
			resolve: {
				program: ['ProgramsService', function (ProgramsService) {
					return new ProgramsService();
				}],
				editing: function () { return false; },
				previousState: ['$state', function ($state) {
				  return {
					name: $state.current.name,
					params: $state.params,
					url: $state.href($state.current.name, $state.params)
				  };
				}]
			},
			data: {
				roles: ['admin', 'gov'],
				pageTitle: 'New Team'
			},
			ncyBreadcrumb: {
				label: 'New Team',
				parent: 'en.programs.list'
			}
		})
		.state('fr.programadmin.create', {
			url: '/creer',
			templateUrl: '/modules/programs/client/views/edit-program.client.view.html',
			controller: 'ProgramEditController',
			controllerAs: 'vm',
			resolve: {
				program: function (ProgramsService) {
					return new ProgramsService();
				},
				editing: function () { return false; },
				previousState: function ($state) {
				  return {
					name: $state.current.name,
					params: $state.params,
					url: $state.href($state.current.name, $state.params)
				  };
				}
			},
			data: {
				roles: ['admin', 'gov'],
				pageTitle: 'Nouvelle équipe'
			},
			ncyBreadcrumb: {
				label: 'Nouvelle équipe',
				parent: 'fr.programs.list'
			}
		})
		;
	}]);
}());
