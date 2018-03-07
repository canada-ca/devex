// =========================================================================
//
// All the client side routes for proposals
//
// =========================================================================
(function () {
	'use strict';

	angular.module('proposals.routes').config(['$stateProvider', function ($stateProvider) {
		$stateProvider
		// -------------------------------------------------------------------------
		//
		// this is the top level, abstract route for all proposal routes, it only
		// contians the ui-view that all other routes get rendered in
		//
		// -------------------------------------------------------------------------
		.state('proposals', {
			abstract: true,
			url: '/{lang:(?:en|fr)}/proposals',
			template: '<ui-view/>',
			resolve: {
				capabilities: function (SkillsService) {
					return SkillsService.list ();
				}
			},
	        params: {
	        	lang: {
            		value: function($translate){
                		return $translate.use();
            		}
        		}
	        }
		})
		// -------------------------------------------------------------------------
		//
		// proposal listing. Resolve to all proposals in the system and place that in
		// the scope. listing itself is done through a directive
		//
		// -------------------------------------------------------------------------
		.state('proposals.list', {
			url: '',
			templateUrl: '/modules/proposals/client/views/list-proposals.client.view.html',
			data: {
				pageTitle: '{{ "PROP_TITLE" | translate }}'
			},
			ncyBreadcrumb: {
				label: '{{ "PROP_TITLE" | translate }}'
			},
			resolve: {
				proposals: function ($stateParams, ProposalsService) {
					return ProposalsService.query ();
				}
			},
			controller: 'ProposalsListController',
			controllerAs: 'vm',
			roles: ['admin', 'gov']
		})
		// -------------------------------------------------------------------------
		//
		// view a proposal, resolve the proposal data
		//
		// -------------------------------------------------------------------------
		.state('proposals.view', {
			url: '/:proposalId',
			data: {
				roles: ['user']
			},
			templateUrl: '/modules/proposals/client/views/view-proposal.client.view.html',
			controller: 'ProposalViewController',
			controllerAs: 'ppp',
			bindToController: true,
			resolve: {
				proposal: function ($stateParams, ProposalsService) {
					return ProposalsService.get ({
						proposalId: $stateParams.proposalId
					}).$promise;
				}
			}
		})
		// -------------------------------------------------------------------------
		//
		// the base for editing
		//
		// -------------------------------------------------------------------------
		.state('proposaladmin', {
			abstract: true,
			url: '/{lang:(?:en|fr)}/proposaladmin',
			template: '<ui-view/>',
			data: {
				notroles: ['gov', 'guest']
			},
			resolve: {
				capabilities: function (SkillsService) {
					return SkillsService.list ();
				}
			},
	        params: {
	        	lang: {
                	value: function($translate){
                    	return $translate.use();
                	}
            	}
	        }
		})
		// -------------------------------------------------------------------------
		//
		// edit a proposal
		//
		// -------------------------------------------------------------------------
		.state('proposaladmin.edit', {
			url: '/:proposalId/edit/:opportunityId',
			data: {
				roles: ['user'],
				notroles: ['gov']
			},
			templateUrl: '/modules/proposals/client/views/edit-proposal.client.view.html',
			controller: 'ProposalEditController',
			controllerAs: 'ppp',
			bindToController: true,
			resolve: {
				proposal: function ($stateParams, ProposalsService) {
					return ProposalsService.get ({
						proposalId: $stateParams.proposalId
					}).$promise;
				},
				opportunity: function ($stateParams, OpportunitiesService) {
					return OpportunitiesService.get({
						opportunityId: $stateParams.opportunityId
					}).$promise;
				},
				editing: function () { return true; },
				org: function (Authentication, OrgsService) {
					var orgs = Authentication.user.orgsAdmin || [null];
					var org = orgs[0];
					if (org) return OrgsService.get ({orgId:org}).$promise;
					else return null;
				}
			}
		})
		// -------------------------------------------------------------------------
		//
		// create a new proposal and edit it
		//
		// -------------------------------------------------------------------------
		.state('proposaladmin.create', {
			url: '/create/:opportunityId',
			data: {
				roles: ['user'],
				notroles: ['gov'],
				pageTitle: '{{ "PROP_NEW" | translate }}'
			},
			templateUrl: '/modules/proposals/client/views/edit-proposal.client.view.html',
			controller: 'ProposalEditController',
			controllerAs: 'ppp',
			bindToController: true,
			resolve: {
				proposal: function ($stateParams, ProposalsService) {
					return new ProposalsService ();
				},
				opportunity: function ($stateParams, OpportunitiesService) {
					return OpportunitiesService.get({
						opportunityId: $stateParams.opportunityId
					}).$promise;
				},
				org: function (Authentication, OrgsService) {
					var orgs = Authentication.user.orgsAdmin || [null];
					var org = orgs[0];
					if (org) return OrgsService.get ({orgId:org}).$promise;
					else return null;
				},
				editing: function () { return false; }
			},
			ncyBreadcrumb: {
				label: '{{ "PROP_NEW" | translate }}'
			}
		})
		;
	}]);
}());


