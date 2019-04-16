import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarProntuario extends Component {
    constructor() {
        super();

        this.state = {
            idUsuario: "",
            rg: "",
            cpf: "",
            dataNascimento: "",
            telefone: "",
            endereco: "",
            listaProntuarios: []
        }
    }

    buscarProntuarios() {
        Axios.get('http://localhost:5000/api/prontuarios')
            // http://192.168.56.1:5000/api/prontuarios - IP do pc do Senai  
            // http://191.180.47.145:5000/api/prontuarios - IP do pc de Casa     
            .then(res => {
                const prontuarios = res.data;
                this.setState({ listaProntuarios: prontuarios }) //Necessita Disso?
            })
    }

    componentDidMount() {
        this.buscarProntuarios();
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
            .then(res => {
                this.buscarProntuarios()
            })
    }

    render() {
        return (
            <div>
                <tbody>
                    {this.state.listaProntuarios.map(element => {
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