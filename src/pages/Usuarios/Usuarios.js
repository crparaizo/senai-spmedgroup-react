import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarUsuario extends Component {
    constructor() {
        super();

        this.state = {
            nome: "",
            email: "",
            senha: "",
            tipoUsuario: [],
            idTipoUsuario: "",
            listaUsuarios: []
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
    }

    componentDidMount() {
        this.buscarUsuarios();
    }

    atualizaEstadoidUsuario(event) {
        this.setState({ idUsuario: event.target.value });
    }

    atualizaEstadoNome(event) {
        this.setState({ nome: event.target.value });
    }

    atualizaEstadoEmail(event) {
        this.setState({ emal: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    cadastrarUsuario(event) {
        event.preventDefault();

        let usuario = {
            idUsuario: this.state.idUsuario,
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        };

        Axios.post('http://localhost:5000/api/usuarios', usuario, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }
        })
    }

    render() {
        return (
            <div>
                <tbody>
                    {this.state.listaUsuarios.map(element => {
                        return (
                            <tr key={element.id}>
                                <td>{element.id}</td>
                                <td>{element.nome}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </div>
        )
    }
}