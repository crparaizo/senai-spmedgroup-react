import React, { Component } from "react";
import './Clinicas.css';
import apiService from "../../services/apiService";

export default class ListarCadastrarClinica extends Component {
    constructor() {
        super();

        this.state = {
            nomeFantasia: "",
            horarioFuncionamento: "",
            cnpj: "",
            razaoSocial: "",
            endereco: "",
            listaClinicas: [],
            listaClinicasFiltrada: [],
            inputBusca: "",
            tabLista: true,
        }
    }

    logout() {
        localStorage.removeItem('usuario-spmedgroup');
        window.location.reload();
    }

    //Listar consultas
    buscarClinicas() {
        apiService
            .call("clinicas")
            .getAll()
            .then(res => {
                const clinicas = res.data;
                this.setState({ listaClinicas: clinicas, listaClinicasFiltrada: clinicas })
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

    alteraTabs(event) {
        event.preventDefault();
        this.setState({ tabLista: !this.state.tabLista }) // "!" -> inverso do estado que está (IF melhorado)
    }

    buscarClinicaItem() {

        let listaFiltrada = this.state.listaClinicas;

        if (this.state.inputBusca !== null && this.state.inputBusca !== "") {
            listaFiltrada = listaFiltrada.filter(x =>
                x.nomeFantasia.toLowerCase().includes(this.state.inputBusca.toLowerCase()) ||
                x.razaoSocial.toLowerCase().includes(this.state.inputBusca.toLowerCase()) ||
                x.endereco.toLowerCase().includes(this.state.inputBusca.toLowerCase()) ||
                x.horarioFuncionamento.toLowerCase().includes(this.state.inputBusca.toLowerCase()) ||
                x.cnpj.includes(this.state.inputBusca)
            );
        }

        this.setState({ listaClinicasFiltrada: listaFiltrada });
    }

    atualizaEstadoBusca(event) {
        this.setState({ inputBusca: event.target.value });
        this.buscarClinicaItem() //Serve para filtrar no mesmo momento que vai
    }

    //Sessão cadastro

    cadastrarClinica(event) {
        event.preventDefault();

        if (this.state.listaClinicas.map(x => x.cnpj).indexOf(this.state.cnpj) === -1) {

            apiService
                .call("clinicas")
                .create({
                    nomeFantasia: this.state.nomeFantasia,
                    horarioFuncionamento: this.state.horarioFuncionamento,
                    cnpj: this.state.cnpj,
                    razaoSocial: this.state.razaoSocial,
                    endereco: this.state.endereco
                })
                .then(res => {
                    this.buscarClinicas()
                })
        } else {
            this.setState({ erroMensagem: alert('CNPJ já cadastrado, tente outro diferente!') })
        }
    }

    render() {
        return (
            <div>

                <form onSubmit={this.buscarClinicaItem.bind(this)}>
                    <label>
                        <input
                            placeholder="Busque!"
                            type="text"
                            value={this.state.inputBusca}
                            onChange={this.atualizaEstadoBusca.bind(this)}
                        />
                    </label>
                    <label for="">
                        <input class="btn-new" value="Filtrar" type="submit" id="submitBtn" name="submit" />
                    </label>
                </form>

                <section className="lista_completa">
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
                            {this.state.listaClinicasFiltrada.map(element => {
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
                </section>

                <form onSubmit={this.cadastrarClinica.bind(this)} noValidate>
                    <input type="text" value={this.state.nomeFantasia} onChange={this.atualizaEstadoNome.bind(this)} placeholder="nome da clínica" required />
                    <input type="text" value={this.state.horarioFuncionamento} onChange={this.atualizaEstadoHorario.bind(this)} placeholder="horário de funcionamento" required />
                    <input type="text" value={this.state.cnpj} onChange={this.atualizaEstadoCnpj.bind(this)} placeholder="cnpj" required />
                    <input type="text" value={this.state.razaoSocial} onChange={this.atualizaEstadoRazao.bind(this)} placeholder="razão social" required />
                    <input type="text" value={this.state.endereco} onChange={this.atualizaEstadoEndereco.bind(this)} placeholder="endereço" required />
                    <button type="submit"> Cadastrar </button>
                </form>

                <p style={{ color: 'red', textAlign: 'center' }}>{this.state.erroMensagem}</p>

            </div>
        )
    }
}