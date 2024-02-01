import React, { Component } from 'react';
import { Link } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';

import CreateContact from '../requests/CreateContact';
import UpdateContact from '../requests/UpdateContact';
import LoadContact from '../requests/LoadContact';
import { showMessage } from '../actions/AppActions';

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            contact: {
                name: '',
                email: '',
                phone: '',
                address: '',
            },
            sending: false,
            title: 'Adicionar Contato'
        }

        if (props.params && props.params.id) {
            const me = this;
            LoadContact(props.params.id)
                .then(res => {
                    const contact = this.state.contact;
                    for (const field in contact) {
                        if (res[field]) {
                            contact[field] = res[field];
                        }
                    }
                    me.setState({
                        id: props.params.id,
                        title: `Editar '${res.name}'`,
                        contact,
                    });
                });
        }
    };

    handleChange(e) {
        const { name, value } = e.target;
        const { state } = this;
        state.contact[name] = value;
        this.setState(state);
    }

    handleSubmit() {
        const me = this;
        const { id, contact } = me.state;
        me.setState({
            sending: true
        });
        
        if (!id) {
            CreateContact(contact)
                .then(res => {
                    showMessage('Contato criado');
                    document.getElementById('gotocontact').click();
                    return true;
                })
                .catch(err => {
                    me.setState({
                        sending: false,
                    });
                    showMessage('Erro ao criar contato');
                });
        } else {
            UpdateContact(id, contact)
                .then(res => {
                    showMessage('Contato atualizado');
                    document.getElementById('gotocontact').click();
                    return true;
                })
                .catch(err => {
                    me.setState({
                        sending: false,
                    });
                    showMessage('Erro ao atualizar contato');
                });
        }
    }

    render() {
        const { title, contact, sending } = this.state;
        return (
            <div>
                <h4 className='title'>
                    {title}
                    <Link id='gotocontact' to='/' className="icon">&times;</Link>
                </h4>
                <TextField
                    type="name"
                    hintText="Nome"
                    floatingLabelText="Nome"
                    fullWidth={true}
                    onChange={this.handleChange.bind(this)}
                    value={contact.name}
                    name="name" />
                <TextField
                    type="email"
                    hintText="Email"
                    floatingLabelText="Email"
                    fullWidth={true}
                    onChange={this.handleChange.bind(this)}
                    value={contact.email}
                    name="email" />
                <TextField
                    type="phone"
                    hintText="Telefone"
                    floatingLabelText="Telefone"
                    fullWidth={true}
                    onChange={this.handleChange.bind(this)}
                    value={contact.phone}
                    name="phone" />
                <TextField
                    type="address"
                    hintText="Endereço"
                    floatingLabelText="Endereço"
                    fullWidth={true}
                    onChange={this.handleChange.bind(this)}
                    value={contact.address}
                    name="address" />
                <br />
                <br />
                <RaisedButton
                    label={sending ? 'Enviando' : 'Enviar'}
                    primary={true}
                    fullWidth={true}
                    disabled={sending}
                    onClick={this.handleSubmit.bind(this)} />
            </div>
        );
    }
}
