import React, { Component } from 'react';

import './App.css';
import Guest from './Guest';
import Logged from './Logged';
import Loading from './pages/Loading';
import GetMe from './requests/GetMe';
import Store from './stores/AppStore';
import * as Actions from './actions/AppActions';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.loaded = false;
        this.initialState = this.initialState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state = this.initialState();
    }

    initialState() {
        return {
            loading: !this.loaded,
            user: Store.getUser(),
        }
    }

    updateState() {
        this.setState(this.initialState());
    }

    componentDidMount() {
        const me = this;
        Store.on('change_user', this.updateState);
        GetMe()
            .then(user => Actions.setUser(user))
            .catch(err => {

            })
            .finally(() => {
                me.loaded = true;
                me.setState({
                    loading: !me.loaded
                });
            });
    }

    componentWillUnmount() {
        Store.removeListener('change_user', this.updateState);
    }

    render() {
        const { loading, user } = this.state;
        let view = <Loading />;

        if (!loading) {
            view = user && user.id ? <Logged /> : <Guest />;
        }

        return view;
    }
}
