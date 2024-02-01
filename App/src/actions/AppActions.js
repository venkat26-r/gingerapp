import dispatcher from '../dispatcher';
import AppConstants from '../constants/AppConstants';
import Request from '../utils/Request';

const { actions } = AppConstants;

export function setUser(user) {
	dispatcher.dispatch({
		type: actions.setUser,
        user,
	});
}

export function showMessage(message) {
	dispatcher.dispatch({
		type: actions.showMessage,
        message,
	});
}

export function hideMessage() {
	dispatcher.dispatch({
		type: actions.hideMessage,
	});
}

export function logout() {
	window.localStorage.removeItem('token');
	Request.defaults.headers = {};
	setUser(false);
}
