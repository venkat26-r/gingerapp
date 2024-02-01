import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Paper, CircularProgress } from 'material-ui';

export default class Loading extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="login-container">
                    <Paper zDepth={1} className="loading">
                        <CircularProgress />
                        <br />
                        <br />
                        Carregando
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}
