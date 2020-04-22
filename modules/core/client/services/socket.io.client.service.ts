import angular from 'angular';
import io from 'socket.io-client';

(() => {
	'use strict';

	// Create the Socket.io wrapper service
	angular.module('core').factory('Socket', Socket);

	Socket.$inject = ['AuthenticationService', '$timeout'];

	function Socket(authenticationService, $timeout) {
		const service = {
			connect,
			emit,
			on,
			removeListener,
			socket: null
		};

		connect();

		return service;

		// Connect to Socket.io server
		function connect() {
			// Connect only when authenticated
			if (authenticationService.user) {
				service.socket = io();
			}
		}

		// Wrap the Socket.io 'emit' method
		function emit(eventName, data) {
			if (service.socket) {
				service.socket.emit(eventName, data);
			}
		}

		// Wrap the Socket.io 'on' method
		function on(eventName, callback) {
			if (service.socket) {
				service.socket.on(eventName, data => {
					$timeout(() => {
						callback(data);
					});
				});
			}
		}

		// Wrap the Socket.io 'removeListener' method
		function removeListener(eventName) {
			if (service.socket) {
				service.socket.removeListener(eventName);
			}
		}
	}
})();
