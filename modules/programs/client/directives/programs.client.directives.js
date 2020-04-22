(function () {
	'use strict';
	angular.module ('programs')
	// -------------------------------------------------------------------------
	//
	// directive for listing programs
	//
	// -------------------------------------------------------------------------
	.directive ('programList', function () {
		return {
			restrict     : 'E',
			controllerAs : 'vm',
			scope        : {},
			templateUrl  : '/modules/programs/client/views/list.programs.directive.html',
			controller   : ['$scope', 'ProgramsService', 'AuthenticationService', 'Notification', 'dataService', '$filter', '$translate', function ($scope, ProgramsService, authenticationService, Notification, dataService, $filter, $translate) {
				$scope.isEnglish = function() {
			        return ($translate.use() === 'en');
			    };
			    $scope.isFrench = function() {
			        return ($translate.use() === 'fr');
			    };
			    $scope.goTo = function(state){
			        var lang = $translate.use();
			        $state.go(lang + '.' + state);
			    }

				var vm = this;
				var isAdmin  = authenticationService.user && !!~authenticationService.user.roles.indexOf ('admin');
				var isGov    = authenticationService.user && !!~authenticationService.user.roles.indexOf ('gov');
				vm.isAdmin = isAdmin;
				vm.isGov = isGov;
				vm.userCanAdd = (isAdmin || isGov);
				vm.programs = ProgramsService.query ();
				vm.publish = function (program, state) {
					var publishedState = program.isPublished;
					var t = state ? $filter('translate')('PUBLISHED') : $filter('translate')('UNPUBLISHED')
					program.isPublished = state;
					program.createOrUpdate ()
					//
					// success, notify and return to list
					//
					.then (function () {
						Notification.success ({
							message : '<i class="glyphicon glyphicon-ok"></i> ' + $filter('translate')('TEAM_TEAM') + ' '+t+' Successfully!'
						});
					})
					//
					// fail, notify and stay put
					//
					.catch (function (res) {
						program.isPublished = publishedState;
						Notification.error ({
							message : res.data.message,
							title   : '<i class=\'glyphicon glyphicon-remove\'></i> ' + $filter('translate')('TEAM_TEAM') + ' '+t+' Error!'
						});
					});
				};
				vm.request = function (program) {
					ProgramsService.makeRequest ({
						programId: program._id
					}).$promise
					.then (function () {
						program.userIs.request = true;
						Notification.success({ message: '<i class="fas fa-check-circle"></i> Membership request sent successfully!' });
					})
					.catch (function (res) {
						Notification.error ({
							message : res.data.message,
							title   : '<i class=\'fas fa-exclamation-triangle\'></i> Membership Request Error!'
						});
					});
				};
			}]
		}
	})
	;
}());
