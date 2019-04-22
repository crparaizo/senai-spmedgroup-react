import React, { Component } from "react";
import Axios from 'axios';
import apiService from "../../services/apiService";

export default class ListarCadastrarUsuario extends Component {
    constructor() {
        super();

        this.state = {
            nome: "",
            email: "",
            senha: "",
            idTipoUsuario: "",
            tipoUsuario: [],
            listaUsuarios: [],
            listaProntuarios: []
        }
    }

    componentDidMount() {
        apiService
            .call("tiposusuarios")
            .getAll()
            .then(data => {
                this.setState({ tipoUsuario: data.data });
            });

        apiService
            .call("usuarios")
            .getAll()
            .then(data => {
                this.setState({ listaUsuarios: data.data });
            });

        apiService
            .call("prontuarios")
            .getAll()
            .then(data => {
                this.setState({ listaProntuarios: data.data });
            });
    }

    atualizaEstadoNome(event) {
        this.setState({ nome: event.target.value });
    }

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    atualizaEstadoidTipoUsuario(event) {
        this.setState({ idTipoUsuario: event.target.value });
    }

    cadastrarUsuario(event) {
        event.preventDefault();

        let usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            idTipoUsuario: this.state.idTipoUsuario
        };

        Axios.post('http://localhost:5000/api/usuarios', usuario, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            this.call("usuarios")
        })
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID - Usuário</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>ID - Tipo Usuário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaUsuarios.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.nome}</td>
                                    <td>{element.email}</td>
                                    <td>{element.senha}</td>
                                    <td>{element.idTipoUsuario}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <form onSubmit={this.cadastrarUsuario.bind(this)} noValidate>
                    <input type="text" value={this.state.nome} onChange={this.atualizaEstadoNome.bind(this)} placeholder="Nome" required />
                    <input type="text" value={this.state.email} onChange={this.atualizaEstadoEmail.bind(this)} placeholder="Email" required />
                    <input type="text" value={this.state.senha} onChange={this.atualizaEstadoSenha.bind(this)} placeholder="Senha" required />
                    <input type="text" value={this.state.idTipoUsuario} onChange={this.atualizaEstadoidTipoUsuario.bind(this)} placeholder="Id tipo usuário" required />
                    <button type="submit"> Cadastrar </button>
                </form>
                
            </div>
        )
    }
}