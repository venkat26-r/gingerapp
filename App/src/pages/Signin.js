import React, { Component } from 'react';
import { Link } from 'react-router';
import { Paper, AppBar, TextField, RaisedButton } from 'material-ui';

import { showMessage } from '../actions/AppActions';
import CreateUser from '../requests/CreateUser';

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sending: false,
            email: '',
            password: '',
            name: '',
            errors: {
                email: false,
                password: false,
                name: false,
            }
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { state } = this;
        state[name] = value;
        this.setState(state);
    }

    handleSubmit() {
        const me = this;
        const { email, password, name } = this.state;
        me.setState({
            sending: true
        });
        CreateUser({
            email,
            name,
            password,
        })
            .then(res => {
                showMessage('Usuário criado');
                document.getElementById('gotologin').click();
                return true;
            })
            .catch(err => {
                const errors = {
                    email: false,
                    password: false,
                    name: false,
                };
                if (err && err.response && err.response.data && err.response.data.messages) {
                    for (const error in errors) {
                        if (err.response.data.messages[error]) {
                            errors[error] = err.response.data.messages[error];
                        }
                    }
                }

                me.setState({
                    sending: false,
                    errors,
                });
                showMessage('Erro ao criar usuário');
            });
    }

    render() {
        const { email, name, password, errors, sending } = this.state;
        return (
            <div className="login-container">
                <AppBar title="Cadastrar" showMenuIconButton={false} />
                <Paper zDepth={1} className="form">
                    <TextField
                        hintText="Nome"
                        floatingLabelText="Nome"
                        fullWidth={true}
                        errorText={errors.name}
                        onChange={this.handleChange.bind(this)}
                        value={name}
                        name="name" />
                    <TextField
                        type="email"
                        hintText="Email"
                        floatingLabelText="Email"
                        fullWidth={true}
                        errorText={errors.email}
                        onChange={this.handleChange.bind(this)}
                        value={email}
                        name="email" />
                    <TextField
                        type="password"
                        hintText="Senha"
                        floatingLabelText="Senha"
                        fullWidth={true}
                        errorText={errors.password}
                        onChange={this.handleChange.bind(this)}
                        value={password}
                        name="password" />
                    <br />
                    <br />
                    <RaisedButton
                        label={sending ? 'Enviando' : 'Enviar'}
                        primary={true}
                        fullWidth={true}
                        disabled={sending}
                        onClick={this.handleSubmit.bind(this)} />
                    <br />
                    <br />
                    <div className="message">
                        Já é cadastrado? <Link id="gotologin" to="/login">Faça login</Link>
                    </div>
                </Paper>
            </div>
        );
    }
}
