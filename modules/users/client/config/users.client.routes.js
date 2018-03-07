(function () {
	'use strict';

	// Setting up route
	angular
		.module('users.routes')
		.config(routeConfig);

	routeConfig.$inject = ['$stateProvider'];

	function routeConfig($stateProvider) {
		// Users state routing
		$stateProvider
			.state('settings', {
				abstract: true,
				url: '/{lang:(?:en|fr)}/settings',
				templateUrl: '/modules/users/client/views/settings/settings.client.view.html',
				controller: 'SettingsController',
				controllerAs: 'vm',
				data: {
					roles: ['user', 'admin', 'gov-request', 'gov']
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
			.state ('settings.skills', {
				url: '/skills',
				templateUrl: '/modules/users/client/views/settings/profile-skills.html',
				controller: 'ProfileSkillsController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Skills'
				}
			})
			.state ('settings.privacy', {
				url: '/privacy',
				templateUrl: '/modules/users/client/views/settings/profile-privacy.html',
				controller: 'ProfilePrivacyController',
				controllerAs: 'vm',
				resolve: {
					subscriptions: function (NotificationsService) {
						return NotificationsService.subscriptions().$promise;
					}
				},
				data: {
					pageTitle: '{{ "PROFILE_PRIVACY" | translate }}'
				},
				ncyBreadcrumb: {
					label: '{{ "PROFILE_PRIVACY" | translate }}'
				}
			})
			.state ('settings.messages', {
				url: '/messages',
				templateUrl: '/modules/users/client/views/settings/profile-messages.html',
				controller: 'ProfileMessagesController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Messages'
				}
			})
			.state('settings.profile', {
				url: '/profile',
				templateUrl: '/modules/users/client/views/settings/profile-main.html',
				controller: 'EditProfileController',
				controllerAs: 'vm',
				data: {
					pageTitle: '{{ "PROFILE_SETTINGS" | translate }}'
				},
				ncyBreadcrumb: {
					label: '{{ "PROFILE_SETTINGS" | translate }}'
				}
			})
			.state('settings.payment', {
				url: '/payment',
				templateUrl: '/modules/users/client/views/settings/payment-settings.client.view.html',
				controller: 'EditProfileController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Payment Details'
				}
			})
			.state('settings.password', {
				url: '/password',
				templateUrl: '/modules/users/client/views/settings/change-password.client.view.html',
				controller: 'ChangePasswordController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Settings password'
				}
			})
			// .state('settings.picture', {
			// 	url: '/picture',
			// 	templateUrl: '/modules/users/client/views/settings/change-profile-picture.client.view.html',
			// 	controller: 'ChangeProfilePictureController',
			// 	controllerAs: 'vm',
			// 	data: {
			// 		pageTitle: 'Settings picture'
			// 	}
			// })
			.state('authentication', {
				abstract: true,
				url: '/{lang:(?:en|fr)}/authentication',
				templateUrl: '/modules/users/client/views/authentication/authentication.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				resolve: {
					usercount: function (UsersService) {
						return UsersService.countUsers ().then (function (o) {return o.count});
					}
				},
		        ncyBreadcrumb: {
		          label: 'Authentication'
		        },
		        params: {
		        	lang: {
	                	value: function($translate){
	                    	return $translate.use();
	                	}
	            	}
		        }
			})
			.state('authentication.gov', {
				url: '/government',
				templateUrl: '/modules/users/client/views/authentication/gov.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Government'
				},
        ncyBreadcrumb: {
          label: 'Government'
        }
			})
			.state('authentication.signinadmin', {
				url: '/signinadmin?err',
				templateUrl: '/modules/users/client/views/authentication/signin.admin.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Signin'
				},
        ncyBreadcrumb: {
          label: 'Signin'
        }
			})
		 .state('signup', {
				url: '/signup',
				templateUrl: '/modules/users/client/views/authentication/signup.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Signup'
				},
        ncyBreadcrumb: {
          label: 'Signup'
        }
			})
			.state('authentication.signin', {
				url: '/signin?err',
				templateUrl: '/modules/users/client/views/authentication/signin.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Signin'
				},
        ncyBreadcrumb: {
          label: 'Signin'
        }
			})
			.state('password', {
				abstract: true,
				url: '/{lang:(?:en|fr)}/password',
				template: '<ui-view autoscroll="true"/>',
		        params: {
		        	lang: {
		            	value: function($translate){
		                    return $translate.use();
		                }
		            }
		        }
			})
			.state('password.forgot', {
				url: '/forgot',
				templateUrl: '/modules/users/client/views/password/forgot-password.client.view.html',
				controller: 'PasswordController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Password forgot'
				}
			})
			.state('password.reset', {
				abstract: true,
				url: '/{lang:(?:en|fr)}/reset',
				template: '<ui-view autoscroll="true"/>',
        		params: {
	          		lang: {
	                	value: function($translate){
	                    	return $translate.use();
	                	}
	            	}
        		}
			})
			.state('password.reset.invalid', {
				url: '/invalid',
				templateUrl: '/modules/users/client/views/password/reset-password-invalid.client.view.html',
				data: {
					pageTitle: 'Password reset invalid'
				}
			})
			.state('password.reset.success', {
				url: '/success',
				templateUrl: '/modules/users/client/views/password/reset-password-success.client.view.html',
				data: {
					pageTitle: 'Password reset success'
				}
			})
			.state('password.reset.form', {
				url: '/:token',
				templateUrl: '/modules/users/client/views/password/reset-password.client.view.html',
				controller: 'PasswordController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Password reset form'
				}
			});
	}
}());
