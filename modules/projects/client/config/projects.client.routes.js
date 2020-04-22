// =========================================================================
//
// All the client side routes for projects
//
// =========================================================================
(function () {
	'use strict';

	angular.module('projects.routes').config(['$stateProvider', function ($stateProvider) {
		$stateProvider
		// -------------------------------------------------------------------------
		//
		// this is the top level, abstract route for all project routes, it only
		// contians the ui-view that all other routes get rendered in
		//
		// -------------------------------------------------------------------------
		.state('en.projects', {
			abstract: true,
			url: '/projects',
			template: '<ui-view autoscroll="true"></ui-view>',
	        params: {
	        	lang: 'en'
	        }
		})
		.state('fr.projects', {
			abstract: true,
			url: '/projets',
			template: '<ui-view autoscroll="true"></ui-view>',
	        params: {
	        	lang: 'fr'
	        }
		})
		// -------------------------------------------------------------------------
		//
		// project listing. Resolve to all projects in the system and place that in
		// the scope. listing itself is done through a directive
		//
		// -------------------------------------------------------------------------
		.state('en.projects.list', {
			url: '',
			templateUrl: '/modules/projects/client/views/list-projects.client.view.html',
			data: {
				pageTitle: 'Projects List'
			},
			ncyBreadcrumb: {
				label: 'Projects List'
			},
			resolve: {
				projects: function ($stateParams, ProjectsService) {
					return ProjectsService.query ();
				}
			},
			controller: 'ProjectsListController',
			controllerAs: 'vm'
		})
		.state('fr.projects.list', {
			url: '',
			templateUrl: '/modules/projects/client/views/list-projects.client.view.html',
			data: {
				pageTitle: 'Liste des projets'
			},
			ncyBreadcrumb: {
				label: 'Liste des projets'
			},
			resolve: {
				projects: ['$stateParams', 'ProjectsService', function ($stateParams, ProjectsService) {
					return ProjectsService.query ();
				}]
			},
			controller: 'ProjectsListController',
			controllerAs: 'vm'
		})
		// -------------------------------------------------------------------------
		//
		// view a project, resolve the project data
		//
		// -------------------------------------------------------------------------
		.state('en.projects.view', {
			url: '/:projectId',
			params: {
				programId: null
			},
			templateUrl: '/modules/projects/client/views/view-project.client.view.html',
			controller: 'ProjectViewController',
			controllerAs: 'vm',
			resolve: {
				project: ['$stateParams', 'ProjectsService', function ($stateParams, ProjectsService) {
					return ProjectsService.get({
						projectId: $stateParams.projectId
					}).$promise;
				}]
			},
			data: {
				pageTitle: 'Project: {{ project.name }}'
			},
			ncyBreadcrumb: {
				label: '{{vm.project.name}}',
				parent: 'en.projects.list'
			}
		})
		.state('fr.projects.view', {
			url: '/:projectId',
			params: {
				programId: null
			},
			templateUrl: '/modules/projects/client/views/view-project.client.view.html',
			controller: 'ProjectViewController',
			controllerAs: 'vm',
			resolve: {
				project: function ($stateParams, ProjectsService) {
					return ProjectsService.get({
						projectId: $stateParams.projectId
					}).$promise;
				}
			},
			data: {
				pageTitle: 'Projet : {{ project.name_fr }}'
			},
			ncyBreadcrumb: {
				label: '{{vm.project.name_fr}}',
				parent: 'fr.projects.list'
			}
		})
		// -------------------------------------------------------------------------
		//
		// the base for editing
		//
		// -------------------------------------------------------------------------
		.state('en.projectadmin', {
			abstract: true,
			url: '/projectadmin',
			template: '<ui-view autoscroll="true"></ui-view>',
	        params: {
	        	lang: 'en'
	        }
		})
		.state('fr.projectadmin', {
			abstract: true,
			url: '/adminprojet',
			template: '<ui-view autoscroll="true"></ui-view>',
	        params: {
	        	lang: 'fr'
	        }
		})
		// -------------------------------------------------------------------------
		//
		// edit a project
		//
		// -------------------------------------------------------------------------
		.state('en.projectadmin.edit', {
			url: '/:projectId/edit',
			params: {
				context: null
			},
			templateUrl: '/modules/projects/client/views/edit-project.client.view.html',
			controller: 'ProjectEditController',
			controllerAs: 'vm',
			resolve: {
				project: ['$stateParams', 'ProjectsService', function ($stateParams, ProjectsService) {
					return ProjectsService.get({
						projectId: $stateParams.projectId
					}).$promise;
				}],
				programs: ['ProgramsService', function (ProgramsService) {
					return ProgramsService.myadmin ().$promise;
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
				pageTitle: 'Project {{ project.title }}'
			},
			ncyBreadcrumb: {
				label: 'Edit Project',
				parent: 'en.projects.list'
			}
		})
		.state('fr.projectadmin.edit', {
			url: '/:projectId/modifier',
			params: {
				context: null
			},
			templateUrl: '/modules/projects/client/views/edit-project.client.view.html',
			controller: 'ProjectEditController',
			controllerAs: 'vm',
			resolve: {
				project: function ($stateParams, ProjectsService) {
					return ProjectsService.get({
						projectId: $stateParams.projectId
					}).$promise;
				},
				programs: function (ProgramsService) {
					return ProgramsService.myadmin ().$promise;
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
				pageTitle: 'Projet {{ project.title }}'
			},
			ncyBreadcrumb: {
				label: 'Modifier le projet',
				parent: 'fr.projects.list'
			}
		})
		// -------------------------------------------------------------------------
		//
		// create a new project and edit it
		//
		// -------------------------------------------------------------------------
		.state('en.projectadmin.create', {
			url: '/create',
			params: {
				programId: null,
				programTitle: null,
				context: null
			},
			templateUrl: '/modules/projects/client/views/edit-project.client.view.html',
			controller: 'ProjectEditController',
			controllerAs: 'vm',
			resolve: {
				project: ['ProjectsService', function (ProjectsService) {
					return new ProjectsService();
				}],
				programs: ['ProgramsService', function (ProgramsService) {
					return ProgramsService.myadmin ().$promise;
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
				pageTitle: 'New Project'
			},
			ncyBreadcrumb: {
				label: 'New Project',
				parent: 'en.projects.list'
			}
		})
		.state('fr.projectadmin.create', {
			url: '/creer',
			params: {
				programId: null,
				programTitle: null,
				context: null
			},
			templateUrl: '/modules/projects/client/views/edit-project.client.view.html',
			controller: 'ProjectEditController',
			controllerAs: 'vm',
			resolve: {
				project: function (ProjectsService) {
					return new ProjectsService();
				},
				programs: function (ProgramsService) {
					return ProgramsService.myadmin ().$promise;
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
				pageTitle: 'Nouveau projet'
			},
			ncyBreadcrumb: {
				label: 'Nouveau projet',
				parent: 'fr.projects.list'
			}
		})
		;
	}]);
}());


