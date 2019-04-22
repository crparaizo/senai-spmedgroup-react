import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarClinica extends Component {
    constructor() {
        super();

        this.state = {
            nomeFantasia: "",
            horarioFuncionamento: "",
            cnpj: "",
            razaoSocial: "",
            endereco: "",
            listaClinicas: []
        }
    }

    //Listar consultas
    buscarClinicas() {
        Axios.get('http://localhost:5000/api/clinicas', {
            // http://192.168.56.1:5000/api/especialidades - IP do pc do Senai  
            // http://191.180.47.145:5000/api/especialidades - IP do pc de Casa 
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                const clinicas = res.data;
                this.setState({ listaClinicas: clinicas })
            })
    }

    componentDidMount() {
        this.buscarClinicas();
    }

    atualizaEstadoNome(event) {
        this.setState({ nomeFantasia: event.target.value });
    }

    atualizaEstadoHorario(event) {
        this.setState({ horarioFuncionamento: event.target.value });
    }

    atualizaEstadoCnpj(event) {
        this.setState({ cnpj: event.target.value });
    }

    atualizaEstadoRazao(event) {
        this.setState({ razaoSocial: event.target.value });
    }

    atualizaEstadoEndereco(event) {
        this.setState({ endereco: event.target.value });
    }

    cadastrarClinica(event) {
        event.preventDefault();

        let clinica = {
            nomeFantasia: this.state.nomeFantasia,
            horarioFuncionamento: this.state.horarioFuncionamento,
            cnpj: this.state.cnpj,
            razaoSocial: this.state.razaoSocial,
            endereco: this.state.endereco
        };

        Axios.post('http://localhost:5000/api/clinicas', clinica, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                this.buscarClinicas()
            })
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID - Clínica</th>
                            <th>Nome</th>
                            <th>Horário</th>
                            <th>CNPJ</th>
                            <th>Razão Social</th>
                            <th>Endereço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaClinicas.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.nomeFantasia}</td>
                                    <td>{element.horarioFuncionamento}</td>
                                    <td>{element.cnpj}</td>
                                    <td>{element.razaoSocial}</td>
                                    <td>{element.endereco}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <form onSubmit={this.cadastrarClinica.bind(this)} noValidate>
                    <input type="text" value={this.state.nomeFantasia} onChange={this.atualizaEstadoNome.bind(this)} placeholder="nome da clínica" required />
                    <input type="text" value={this.state.horarioFuncionamento} onChange={this.atualizaEstadoHorario.bind(this)} placeholder="horário de funcionamento" required />
                    <input type="text" value={this.state.cnpj} onChange={this.atualizaEstadoCnpj.bind(this)} placeholder="cnpj" required />
                    <input type="text" value={this.state.razaoSocial} onChange={this.atualizaEstadoRazao.bind(this)} placeholder="razão social" required />
                    <input type="text" value={this.state.endereco} onChange={this.atualizaEstadoEndereco.bind(this)} placeholder="endereço" required />
                    <button type="submit"> Cadastrar </button>
                </form>
            </div>
        )
    }
}