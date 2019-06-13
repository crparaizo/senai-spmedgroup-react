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
        localStorage.removeItem('clinica-spmedgroup');
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
        this.setState({ inputBusca: event.target.value }, () => {
            this.buscarClinicaItem() //Serve para filtrar no mesmo momento que vai
        });
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
                .then(res => {
                    alert("Clínica cadastrada!")
                    this.setState({
                        nomeFantasia: '',
                        horarioFuncionamento: '',
                        cnpj: '',
                        razaoSocial: '',
                        endereco: ''
                    })
                })
        } else {
            this.setState({ erroMensagem: alert('CNPJ já cadastrado, tente outro diferente!') })
        }
    }

    render() {
        return (
            <div>

                <header>
                    <div className="topo-clinica">
                        <div className="topo-clinica__quebra"></div>
                        <h1 className="topo-clinica__h1">Clínicas</h1>
                        <div className="topo-clinica__quebra topo-clinica__quebra--modificado"></div>
                        <form onSubmit={this.buscarClinicaItem.bind(this)}>
                            <label>
                                <input
                                    placeholder="Busque!"
                                    type="text"
                                    value={this.state.inputBusca}
                                    onChange={this.atualizaEstadoBusca.bind(this)}
                                />
                            </label>
                        </form>
                    </div>
                </header>
                <aside>
                    <div className="menu-clinica">
                        <h3 className="menu-clinica__titulo">Administrador</h3>
                        <img className="menu-clinica__imagem" src={require('../../assets/img/icon-login.png')} alt="" />
                        {/* <!-- IMAGEM --> */}
                        <div className="links-clinica">
                            <nav>
                                <ul>
                                    {/* <!-- Colocar URL's -->
                        <!-- Páginas de médico e paciente terão menos links-clinica --> */}
                                    <li className="links-clinica__item"><a className="links-clinica__titulo" href="/prontuarios">Prontuários</a></li>
                                    <div className="links-clinica__quebra"></div>
                                    <li className="links-clinica__item"><a className="links-clinica__titulo" href="/consultas">Consultas</a></li>
                                    <div className="links-clinica__quebra"></div>
                                    <li className="links-clinica__item links-clinica__titulo links-clinica__titulo--selecionado">Clínicas</li>
                                    <div className="links-clinica__quebra"></div>
                                    <li className="links-clinica__item"><a className="links-clinica__titulo" href="/medicos">Médicos</a></li>
                                    <div className="links-clinica__quebra"></div>
                                    <li className="links-clinica__item"><a className="links-clinica__titulo"
                                        href="/usuarios">Usuários</a></li>
                                    <div className="links-clinica__quebra"></div>
                                    <li className="links-clinica__item"><a className="links-clinica__titulo" href="/especialidades">Especialidades</a></li>
                                    <div className="links-clinica__quebra"></div>
                                </ul>
                            </nav>
                        </div>
                        <a className="menu-clinica__link" onClick={this.logout.bind(this)} href="/">Sair</a>
                    </div>
                </aside>

                <p style={{ color: 'red', textAlign: 'center' }}>{this.state.erroMensagem}</p>

                <main className="listas-clinica">
                    {/* <!-- Configurar modal! --> */}
                    <button className="listas-clinica__button listas-clinica__button--lista tablink" value='Lista' onClick={this.alteraTabs.bind(this)}>Lista</button>
                    <button className="listas-clinica__button listas-clinica__button--cadastrar tablink"
                        value='Cadastrar+' onClick={this.alteraTabs.bind(this)}>Cadastrar+</button>
                    <div className="contorno">
                        <div id="Lista" className="tabela-clinica tabcontent" style={{ display: (this.state.tabLista ? "flex" : "none") }}>
                            <table className="tabela-clinica__real">
                                <thead className="tabela-clinica-head">
                                    <tr>
                                        <th className="tabela-clinica-head__titulo">Clínica(ID)</th>
                                        <th className="tabela-clinica-head__titulo">Nome</th>
                                        <th className="tabela-clinica-head__titulo">Horário</th>
                                        <th className="tabela-clinica-head__titulo">CNPJ</th>
                                        <th className="tabela-clinica-head__titulo">Razão Social</th>
                                        <th className="tabela-clinica-head__titulo">Endereço</th>
                                    </tr>
                                </thead>
                                <tbody className="tabela-clinica-body">
                                    {this.state.listaClinicasFiltrada.map(element => {
                                        return (
                                            <tr key={element.id}>
                                                <td className="tabela-clinica-body_dado">{element.id}</td>
                                                <td className="tabela-clinica-body_dado">{element.nomeFantasia}</td>
                                                <td className="tabela-clinica-body_dado">{element.horarioFuncionamento}</td>
                                                <td className="tabela-clinica-body_dado">{element.cnpj}</td>
                                                <td className="tabela-clinica-body_dado">{element.razaoSocial}</td>
                                                <td className="tabela-clinica-body_dado">{element.endereco}</td>
                                                <div className="botoes-clinica">
                                                    <button className="botoes-clinica__item botoes-clinica__item--alterar">Alterar</button>
                                                    <button className="botoes-clinica__item botoes-clinica__item--deletar">Deletar</button>
                                                </div>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div id="Cadastrar" className="formulario-clinica tabcontent" style={{ display: (this.state.tabLista ? "none" : "flex") }}>
                            <form onSubmit={this.cadastrarClinica.bind(this)} noValidate>
                                <label htmlFor=""><input className="formulario-clinica__item" type="text" value={this.state.nomeFantasia} onChange={this.atualizaEstadoNome.bind(this)} placeholder="Nome da Clínica" required /></label>
                                <label htmlFor=""><input className="formulario-clinica__item" type="text" value={this.state.horarioFuncionamento} onChange={this.atualizaEstadoHorario.bind(this)} placeholder="Horário" required /></label>
                                <label htmlFor=""><input className="formulario-clinica__item" type="text" value={this.state.cnpj} onChange={this.atualizaEstadoCnpj.bind(this)} placeholder="CNPJ" required /></label>
                                <label htmlFor=""><input className="formulario-clinica__item" type="text" value={this.state.razaoSocial} onChange={this.atualizaEstadoRazao.bind(this)} placeholder="Razão Social" required /></label>
                                <label htmlFor=""><input className="formulario-clinica__item" type="text" value={this.state.endereco} onChange={this.atualizaEstadoEndereco.bind(this)} placeholder="Endereço" required /></label>
                                <button type="submit" className="formulario-clinica__button">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}