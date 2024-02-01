import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

import Constants from '../constants/AppConstants';

class AppStore extends EventEmitter {
    constructor() {
        super();
        this.user = null;
        this.message = {
            visible: false,
            text: '',
        };
    }

    change(action) {
        this.emit('change');
        this.emit('change_' + action);
    }

    setUser(user) {
    	this.user = user;
    	this.change('user');
    }

    getUser() {
    	return this.user;
    }

    showMessage(text) {
        this.message = {
            visible: true,
            text,
        }
        this.change('message');
    }

    hideMessage() {
        this.message = {
            visible: false,
            text: '',
        }
        this.change('message');
    }

    getMessage() {
        return this.message;
    }

    handleActions(action) {
    	const { actions } = Constants;
    	switch (action.type) {
            case actions.setUser:
                this.setUser(action.user);
                break;
            case actions.showMessage:
                this.showMessage(action.message);
                break;
            case actions.hideMessage:
                this.hideMessage();
                break;
            default:
            	break;
        }
    }
}

const store = new AppStore();
dispatcher.register(store.handleActions.bind(store));

export default store;
