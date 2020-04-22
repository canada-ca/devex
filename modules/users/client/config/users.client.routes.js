(function() {
	'use strict';

	// Setting up route
	angular.module('users.routes').config(routeConfig);

	routeConfig.$inject = ['$stateProvider'];

	function routeConfig($stateProvider) {
		// Users state routing
		$stateProvider
			.state('en.settings', {
				abstract: true,
				url: '/settings',
				templateUrl: '/modules/users/client/views/settings/settings.client.view.html',
				controller: 'SettingsController',
				controllerAs: 'vm',
				data: {
					roles: ['user', 'admin', 'gov-request', 'gov']
				},
				resolve: {
					capabilities: [
						'CapabilitiesService',
						function(CapabilitiesService) {
							return CapabilitiesService.query().$promise;
						}
					]
				},
        		params: {
          			lang: 'en'
        		}
			})
			.state('fr.settings', {
				abstract: true,
				url: '/parametres',
				templateUrl: '/modules/users/client/views/settings/settings.client.view.html',
				controller: 'SettingsController',
				controllerAs: 'vm',
				data: {
					roles: ['user', 'admin', 'gov-request', 'gov']
				},
				resolve: {
					capabilities: [
						'CapabilitiesService',
						function(CapabilitiesService) {
							return CapabilitiesService.query().$promise;
						}
					]
				},
        		params: {
          			lang: 'fr'
        		}
			})
			.state ('en.settings.skills', {
				url: '/skills',
				templateUrl: '/modules/users/client/views/settings/profile-skills.html',
				controller: 'ProfileSkillsController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Skills'
				},
				resolve: {
					capabilities: [
						'CapabilitiesService',
						function(CapabilitiesService) {
							return CapabilitiesService.query().$promise;
						}
					]
				}
			})
			.state ('fr.settings.skills', {
				url: '/skills',
				templateUrl: '/modules/users/client/views/settings/profile-skills.html',
				controller: 'ProfileSkillsController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Compétences'
				}
			})
			.state ('en.settings.privacy', {
				url: '/privacy',
				templateUrl: '/modules/users/client/views/settings/profile-privacy.html',
				controller: 'ProfilePrivacyController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Privacy & Notifications'
				},
				ncyBreadcrumb: {
					label: 'Privacy & Notifications'
				}
			})
			.state ('fr.settings.privacy', {
				url: '/confidentialite',
				templateUrl: '/modules/users/client/views/settings/profile-privacy.html',
				controller: 'ProfilePrivacyController',
				controllerAs: 'vm',
				resolve: {
					subscriptions: function (NotificationsService) {
						return NotificationsService.subscriptions().$promise;
					}
				},
				data: {
					pageTitle: 'Confidentialité et notifications'
				},
				ncyBreadcrumb: {
					label: 'Confidentialité et notifications'
				}
			})
			.state ('en.settings.messages', {
				url: '/messages',
				templateUrl: '/modules/users/client/views/settings/profile-messages.html',
				controller: 'ProfileMessagesController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Messages'
				}
			})
			.state ('fr.settings.messages', {
				url: '/messages',
				templateUrl: '/modules/users/client/views/settings/profile-messages.html',
				controller: 'ProfileMessagesController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Messages'
				}
			})
			.state('en.settings.profile', {
				url: '/profile',
				templateUrl: '/modules/users/client/views/settings/profile-main.html',
				controller: 'EditProfileController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Settings'
				},
				ncyBreadcrumb: {
					label: 'Settings'
				}
			})
			.state('fr.settings.profile', {
				url: '/profil',
				templateUrl: '/modules/users/client/views/settings/profile-main.html',
				controller: 'EditProfileController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Paramètres'
				},
				ncyBreadcrumb: {
					label: 'Paramètres'
				}
			})
			.state('en.settings.payment', {
				url: '/payment',
				templateUrl: '/modules/users/client/views/settings/payment-settings.client.view.html',
				controller: 'EditProfileController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Payment Details'
				}
			})
			.state('fr.settings.payment', {
				url: '/paiement',
				templateUrl: '/modules/users/client/views/settings/payment-settings.client.view.html',
				controller: 'EditProfileController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Payment Details'
				}
			})
			.state('en.settings.password', {
				url: '/password',
				templateUrl: '/modules/users/client/views/settings/change-password.client.view.html',
				controller: 'ChangePasswordController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Settings password'
				}
			})
			.state('fr.settings.password', {
				url: '/motpasse',
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
			.state('en.authentication', {
				abstract: true,
				url: '/authentication',
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
		        	lang: 'en'
		        }
			})
			.state('fr.authentication', {
				abstract: true,
				url: '/authentication',
				templateUrl: '/modules/users/client/views/authentication/authentication.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				resolve: {
					usercount: function (UsersService) {
						return UsersService.countUsers ().then (function (o) {return o.count});
					}
				},
		        ncyBreadcrumb: {
		          	label: 'Authentification'
		        },
		        params: {
		        	lang: 'fr'
		        }
			})
			.state('en.authentication.gov', {
				url: '/signup',
				templateUrl: '/modules/users/client/views/authentication/gov.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Sign Up'
				},
		        ncyBreadcrumb: {
		          	label: 'Sign Up'
		        }
			})
			.state('fr.authentication.gov', {
				url: '/sinscrire',
				templateUrl: '/modules/users/client/views/authentication/gov.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'S\'inscrire'
				},
		        ncyBreadcrumb: {
		          	label: 'S\'inscrire'
		        }
			})
			.state('en.authentication.signinadmin', {
				url: '/signinadmin?err',
				templateUrl: '/modules/users/client/views/authentication/signin.admin.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Sign In'
				},
		        ncyBreadcrumb: {
		          	label: 'Sign In'
		        }
			})
			.state('fr.authentication.signinadmin', {
				url: '/seconnecteradmin?err',
				templateUrl: '/modules/users/client/views/authentication/signin.admin.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Se connecter'
				},
		        ncyBreadcrumb: {
		          	label: 'Se connecter'
		        }
			})
		 	.state('en.signup', {
				url: '/signup2',
				templateUrl: '/modules/users/client/views/authentication/signup.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Sign Up'
				},
		        ncyBreadcrumb: {
		        	label: 'Sign Up'
		        }
			})
			.state('fr.signup', {
				url: '/sinscrire2',
				templateUrl: '/modules/users/client/views/authentication/signup.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'S\'inscrire'
				},
		        ncyBreadcrumb: {
		        	label: 'S\'inscrire'
		        }
			})
			.state('en.authentication.signin', {
				url: '/signin?err',
				templateUrl: '/modules/users/client/views/authentication/signin.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Sign In'
				},
		        ncyBreadcrumb: {
		          	label: 'Sign In'
		        }
			})
			.state('fr.authentication.signin', {
				url: '/seconnecter?err',
				templateUrl: '/modules/users/client/views/authentication/signin.client.view.html',
				controller: 'AuthenticationController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Se connecter'
				},
		        ncyBreadcrumb: {
		          	label: 'Se connecter'
		        }
			})
			.state('password', {
				abstract: true,
				url: '/password',
				template: '<ui-view autoscroll="true"/>',
		        params: {
		        	lang: {
		            	value: function($translate){
		                    return $translate.proposedLanguage() || $translate.use();
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
				url: '/reset',
				template: '<ui-view autoscroll="true"/>',
        		params: {
	          		lang: {
	                	value: function($translate){
	                    	return $translate.proposedLanguage() || $translate.use();
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
