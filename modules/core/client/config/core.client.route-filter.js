(function () {
	'use strict';

	angular
		.module('core')
		.run(routeFilter);

	routeFilter.$inject = ['$rootScope', '$state', 'Authentication', '$translate', '$location'];

	function routeFilter($rootScope, $state, Authentication, $translate, $location) {
		$rootScope.$on('$stateChangeStart', stateChangeStart);
		$rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
		$rootScope.$on('$translateChangeSuccess', function(){
			$rootScope.currentLang = $translate.use();
		});

		var currentLang = ($location.path().indexOf('/fr') > -1) ? 'fr' : 'en';
		var otherLang = (currentLang === 'fr') ? 'en' : 'fr';

		$rootScope.currentLang = currentLang;
		$rootScope.otherLang = otherLang;
		$rootScope.otherLangURL = ($location.path() !== '/' ? $location.path().replace('/' + currentLang, '/' + otherLang) : $location.path() + otherLang);
		$translate.use(currentLang);
		document.documentElement.lang = currentLang;

		function stateChangeStart(event, toState, toParams) {
			// Check authentication before changing state
			var userroles   = (Authentication.user && Authentication.user.roles !== undefined) ? Authentication.user.roles : ['guest'];
			var hasroles    = (toState.data && toState.data.roles && toState.data.roles.length > 0);
			var hasnotroles = (toState.data && toState.data.notroles && toState.data.notroles.length > 0);
			var allowed     = true;
			var roles;
			var i;
			if (hasroles) {
				allowed = false;
				for (i = 0, roles = toState.data.roles; i < roles.length; i++) {
					if ((roles[i] === 'guest') || (!!~userroles.indexOf(roles[i]))) {
						allowed = true;
						break;
					}
				}
			}
			if (allowed && hasnotroles) {
				for (i = 0, roles = toState.data.notroles; i < roles.length; i++) {
					if (!!~userroles.indexOf(roles[i])) {
						allowed = false;
						break;
					}
				}
			}
			if (!allowed) {
				event.preventDefault();
				if (Authentication.user !== null && typeof Authentication.user === 'object') {
					$state.transitionTo('forbidden');
				} else {
					$state.go('authentication.signin').then(function () {
						// Record previous state
						storePreviousState(toState, toParams);
					});
				}
			}
		}

		function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
			// Record previous state
			storePreviousState(fromState, fromParams);

			var currentLang = '';
			var otherLang = '';

			if ($state.params.lang !== undefined) {
				currentLang = $state.params.lang;
				otherLang = ($state.params.lang === 'fr' ? 'en' : 'fr');
			} else {
				$state.params.lang = 'en';
				currentLang = 'en';
				otherLang = 'fr';
			}

			$rootScope.currentLang = currentLang;
			$rootScope.otherLang = otherLang;
			$rootScope.otherLangURL = ($location.path() !== '/' ? $location.path().replace('/' + currentLang, '/' + otherLang) : $location.path() + otherLang);
			$translate.use(currentLang);
			document.documentElement.lang = currentLang;
    	}

	    // Store previous state
	    function storePreviousState(state, params) {
			// only store this state if it shouldn't be ignored
			if (!state.data || !state.data.ignoreState) {
	        	$state.previous = {
					state: state,
					params: params,
					href: $state.href(state, params)
	        	};
	    	}
	    }
	}
}());
