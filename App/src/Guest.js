import React, { Component } from 'react';
import { hashHistory, Router, Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Snackbar } from 'material-ui';

import Login from './pages/Login';
import Signin from './pages/Signin';
import Store from './stores/AppStore';
import { hideMessage } from './actions/AppActions';

class Guest extends Component {
    constructor(props) {
        super(props);
        this.initialState = this.initialState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state = this.initialState();
    }

    initialState() {
        return {
            message: Store.getMessage(),
        }
    }

    updateState() {
        this.setState(this.initialState());
    }

    componentDidMount() {
        Store.on('change_message', this.updateState);
    }

    componentWillUnmount() {
        Store.removeListener('change_message', this.updateState);
    }

    handleHideMessage() {
        hideMessage();
    }

    render() {
        const { message } = this.state;
        const snack = <Snackbar
            open={message.visible}
            message={message.text}
            autoHideDuration={4000}
            onRequestClose={this.handleHideMessage.bind(this)} />;
        return (
            <MuiThemeProvider>
                <div>
                    {this.props.children ? this.props.children : <Login />}
                    {snack}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default class AppRouter extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Guest}>
                    <Route path="login" component={Login} />
                    <Route path="signin" component={Signin} />
                    <Route path="*" component={Login}/>
                </Route>
            </Router>
        );
    }
}
