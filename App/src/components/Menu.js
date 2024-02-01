import React, { Component } from 'react';
import { AppBar, FlatButton } from 'material-ui';

export default class Menu extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                    iconElementRight={<FlatButton label="Sair" />}
                    onRightIconButtonTouchTap={this.props.onLogout}
                    title={user.name} />
            </div>
        );
    }
}
