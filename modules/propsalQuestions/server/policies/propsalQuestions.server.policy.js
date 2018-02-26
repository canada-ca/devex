'use strict';

/**
 * Module dependencies
 */
var acl     = require ('acl');
var helpers = require ((require ('path')).resolve ('./modules/core/server/controllers/core.server.helpers'));

// Using the memory backend
acl = new acl (new acl.memoryBackend ());


/**
 * Invoke PropsalQuestions Permissions
 */
exports.invokeRolesPolicies = function () {
	acl.allow ([{
		roles: ['admin','gov'],
		allows: [{
			resources: '/api/propsalQuestions',
			permissions: '*'
		}, {
			resources: '/api/propsalQuestions/:propsalQuestionId',
			permissions: '*'
		}]
	}, {
		roles: ['user'],
		allows: [{
			resources: '/api/propsalQuestions',
			permissions: ['get']
		}, {
			resources: '/api/propsalQuestions/:propsalQuestionId',
			permissions: ['get']
		}]
	}, {
		roles: ['guest'],
		allows: [{
			resources: '/api/propsalQuestions',
			permissions: ['get']
		}, {
			resources: '/api/propsalQuestions/:propsalQuestionId',
			permissions: ['get']
		}]
	}]);
};

/**
 * Check If PropsalQuestions Policy Allows
 */
exports.isAllowed = function (req, res, next) {
	var roles = (req.user) ? req.user.roles : ['guest'];

	// Check for user roles
	acl.areAnyRolesAllowed (roles, req.route.path, req.method.toLowerCase (), function (err, isAllowed) {
		if (err) {
			// An authorization error occurred
			return res.status (500).send ('Unexpected authorization error');
		} else {
			if (isAllowed) {
				// Access granted! Invoke next middleware
				return next ();
			} else {
				return res.status (403).json ({
					message: 'User is not authorized'
				});
			}
		}
	});
};