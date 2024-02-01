import React, { Component } from 'react';
import { Link } from 'react-router';
import { FloatingActionButton, Dialog, FlatButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EditorIcon from 'material-ui/svg-icons/editor/mode-edit';
import ContentDelete from 'material-ui/svg-icons/content/delete-sweep';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import GetContacts from '../requests/GetContacts';
import DeleteContact from '../requests/DeleteContact';
import { showMessage } from '../actions/AppActions';

export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            id: null,
            dialog: false,
        }
        this.loadContacts = this.loadContacts.bind(this);
    };

    loadContacts() {
        const me = this;
        GetContacts()
            .then(res => me.setState({
                contacts: res,
                dialog: false,
                id: null,
            }));
    }

    componentDidMount() {
        this.loadContacts();
    }

    makeRow(table, i) {
        return <TableRow key={i}>
            <TableRowColumn>{table.name}</TableRowColumn>
            <TableRowColumn>{table.email}</TableRowColumn>
            <TableRowColumn>{table.phone}</TableRowColumn>
            <TableRowColumn>{table.address}</TableRowColumn>
            <TableRowColumn>
                <Link to={'/editar/' + table.id}>
                    <EditorIcon />
                </Link>
                <ContentDelete onClick={this.handleOpenDialog.bind(this, table.id)} />
            </TableRowColumn>
        </TableRow>;
    }

    makeHeader() {
        return <TableRow>
            <TableHeaderColumn>Nome</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Telefone</TableHeaderColumn>
            <TableHeaderColumn>Endereço</TableHeaderColumn>
            <TableHeaderColumn>#</TableHeaderColumn>
        </TableRow>;
    }

    handleOpenDialog(i) {
        this.setState({
            dialog: true,
            id: i,
        });
    }

    handleDelete() {
        const me = this;
        DeleteContact(me.state.id)
            .then(re => {
                showMessage('Contato removido');
                me.loadContacts();
                return true;
            });
    }

    handleCancelDelete() {
        this.handleCloseDialog();
    }

    handleCloseDialog() {
        this.setState({
            dialog: false,
            id: null,
        });
    }

    render() {
        const { contacts, dialog } = this.state;
        const addButton = <Link to='/novo'>
            <FloatingActionButton
                className='floating-action-button'>
                <ContentAdd />
            </FloatingActionButton>
        </Link>;
        if (contacts && contacts.length > 0) {
            const me = this;
            const actions = [
                <FlatButton
                    label="Cancelar"
                    primary={false}
                    onTouchTap={this.handleCancelDelete.bind(this)} />,
                <FlatButton
                    label="OK"
                    primary={true}
                    onTouchTap={this.handleDelete.bind(this)} />
            ];
            const table = <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    {this.makeHeader()}
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {contacts.map((p, i) => {
                        return me.makeRow(p, i);
                    })}
                </TableBody>
            </Table>;
            return (
                <div>
                    <h4 className="title">Contatos</h4>
                    {contacts.length} Contato(s) encontrado(s)
                    {table}
                    {addButton}
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={dialog}
                        onRequestClose={this.handleCloseDialog.bind(this)}>
                        Dseja remover o contato?
                    </Dialog>
                </div>
            );
        }

        return (<div><h4 className="title">Contatos</h4>Nenhuma contato encontrado{addButton}</div>);
    }
}
