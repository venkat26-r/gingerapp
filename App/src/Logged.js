import React, { Component } from 'react';
import { hashHistory, Router, Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import { Snackbar } from 'material-ui';

import Menu from './components/Menu';
import Contacts from './pages/Contacts';
import Contact from './pages/Contact';
import Store from './stores/AppStore';
import { logout, hideMessage } from './actions/AppActions';

class Logged extends Component {
    constructor(props) {
        super(props);
        this.initialState = this.initialState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state = this.initialState();
    }

    initialState() {
        return {
            user: Store.getUser(),
            message: Store.getMessage(),
        }
    }

    updateState() {
        this.setState(this.initialState());
    }

    componentDidMount() {
        Store.on('change', this.updateState);
    }

    componentWillUnmount() {
        Store.removeListener('change', this.updateState);
    }

    handleHideMessage() {
        hideMessage();
    }

    handleLogout() {
        logout();
    }

    render() {
        const { user, message } = this.state;
        const view = this.props.children ? this.props.children : <Contacts />;
        const snack = <Snackbar
            open={message.visible}
            message={message.text}
            autoHideDuration={4000}
            onRequestClose={this.handleHideMessage.bind(this)} />;
        const cardStyle = {
            margin: '20px'
        }

        return (
            <MuiThemeProvider>
                <div>
                    <Menu user={user} onLogout={this.handleLogout.bind(this)} />
                    <Card style={cardStyle}>
                        <CardText children={view} />
                    </Card>
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
                <Route path="/" component={Logged}>
                    <Route path="/novo" component={Contact}/>
                    <Route path="/editar/:id" component={Contact}/>
                    <Route path="*" component={Contacts}/>
                </Route>
            </Router>
        );
    }
}
