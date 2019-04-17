import React, { Component } from "react";
import Axios from 'axios';
import apiService from "../../services/apiService";

export default class ListarCadastrarProntuario extends Component {
    constructor() {
        super();

        this.state = {
            idUsuario: "",
            listaUsuarios: [],
            rg: "",
            cpf: "",
            dataNascimento: "",
            telefone: "",
            endereco: "",
            listaProntuarios: [],
            listaMedicos: [],
            listaEspecialidades: [],
            listaConsultas: [],
            listaClinicas: []
        }
    }

    componentDidMount() {
        apiService
            .call("consultas")
            .getAll()
            .then(data => {
                this.setState({ listaConsultas: data.data });
            });

        apiService
            .call("especialidades")
            .getAll()
            .then(data => {
                this.setState({ listaEspecialidade: data.data });
            });

        apiService
            .call("clinicas")
            .getAll()
            .then(data => {
                this.setState({ listaClinicas: data.data });
            });

        apiService
            .call("medicos")
            .getAll()
            .then(data => {
                this.setState({ listaMedicos: data.data });
            });

        apiService
            .call("prontuarios")
            .getAll()
            .then(data => {
                this.setState({ listaProntuarios: data.data });
            });

        apiService
            .call("usuarios")
            .getAll()
            .then(data => {
                this.setState({ listaPUsuarios: data.data });
            });
    }

    atualizaEstadoIdUsuario(event) {
        this.setState({ idUsuario: event.target.value });
    }

    atualizaEstadoRg(event) {
        this.setState({ rg: event.target.value });
    }

    atualizaEstadoCpf(event) {
        this.setState({ cpf: event.target.value });
    }

    atualizaEstadoDataNascimento(event) {
        this.setState({ dataNascimento: event.target.value });
    }

    atualizaEstadoTelefone(event) {
        this.setState({ telefone: event.target.value });
    }

    atualizaEstadoEndereco(event) {
        this.setState({ endereco: event.target.value });
    }

    cadastrarProntuario(event) {
        event.preventDefault();

        let prontuario = {
            idUsuario: this.state.idUsuario,
            rg: this.state.rg,
            cpf: this.state.cpf,
            dataNascimento: this.state.dataNascimento,
            telefone: this.state.telefone,
            endereco: this.state.endereco
        };

        Axios.post('http://localhost:5000/api/prontuarios', prontuario, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }
        })
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID - Prontuário</th>
                            <th>ID - Usuário</th>
                            <th>RG</th>
                            <th>CPF</th>
                            <th>Data Nascimento</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaProntuarios.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.idUsuario}</td>
                                    <td>{element.rg}</td>
                                    <td>{element.cpf}</td>
                                    <td>{element.dataNascimento}</td>
                                    <td>{element.telefone}</td>
                                    <td>{element.endereco}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}