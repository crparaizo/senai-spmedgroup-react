import React, { Component } from "react";
import Axios from 'axios';
import apiService from "../../services/apiService";
import './Consultas.css';

export default class ListarCadastrarConsulta extends Component {
    constructor() {
        super();

        this.state = {
            idProntuario: "",
            idMedico: "",
            dataHoraConsulta: "",
            idSituacao: "",
            descricao: "",
            listaConsultas: [],
            tabLista: true
        }
    }

    logout(){
        localStorage.removeItem('usuario-spmedgroup');
        window.location.reload();
    }

    componentDidMount() {
        apiService
            .call("consultas")
            .getAll()
            .then(data => {
                console.log(data.data);
                this.setState({ listaConsultas: data.data });
            });
    }

    // openPage(namePage) {
    //     var i;
    //     var x = document.getElementsByClassName("tabcontent");
    //     for (i = 0; i < x.length; i++) {
    //         x[i].style.display = "none";
    //     }
    //     document.getElementById(namePage).style.display = "flex";
    // }


    atualizaEstadoidProntuario(event) {
        this.setState({ idProntuario: event.target.value });
    }
    atualizaEstadoidMedico(event) {
        this.setState({ idMedico: event.target.value });
    }
    atualizaEstadoData(event) {
        this.setState({ dataHoraConsulta: event.target.value });
    }
    atualizaEstadoidSituacao(event) {
        this.setState({ idSituacao: event.target.value });
    }
    atualizaEstadoDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    alteraTabs(event) {
        event.preventDefault();
        this.setState({ tabLista: !this.state.tabLista }) // "!" -> inverso do estado que está (IF melhorado)
    }

    cadastrarConsulta(event) {
        event.preventDefault();

        let consulta = {
            idProntuario: this.state.idProntuario,
            idMedico: this.state.idMedico,
            dataHoraConsulta: this.state.dataHoraConsulta,
            idSituacao: this.state.idSituacao,
            descricao: this.state.descricao
        };

        Axios.post('http://localhost:5000/api/consultas', consulta, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }

        })
            .then(res => {
                this.call("consultas")
            })
        window.location.reload();

        console.log(consulta);

    }

    render() {

        return (

            <div>
                <header>
                    <div className="consultas-header">
                        <div className="consultas-header__quebra"></div>
                        <h1 className="consultas-header__h1">Consultas</h1>
                        <div className="consultas-header__quebra consultas-header__quebra--modificado"></div>
                        <label htmlFor="">
                            <input className="consultas-header__item" type="text" placeholder="Buscar por ..." />
                        </label>
                        <label htmlFor="">
                            <input className="consultas-header__item" type="text" placeholder="Buscar por Médico..." />
                        </label>
                        <label htmlFor="">
                            <input className="consultas-header__item" type="text" placeholder="Buscar por Paciente/Prontuário..." />
                        </label>
                        <label htmlFor="">
                            <input className="consultas-header__item" type="text" placeholder="Buscar por Data..." />
                        </label>
                        <label htmlFor="">
                            <input className="consultas-header__item" type="text" placeholder="Buscar por ID..." />
                            {/* <!-- Colocar icon de lupa? --> */}
                        </label>
                        <button className="consultas-header__button">Limpar</button>
                    </div>
                </header>
                <aside>
                    <div className="menu">
                        <h3 className="menu__titulo">Administrador</h3>
                        <img className="menu__imagem" src={require('../../assets/img/icon-login.png')} alt="" />
                        {/* <!-- IMAGEM --> */}
                        <div className="links">
                            <nav>
                                <ul>
                                    {/* <!-- Colocar URL's -->
                        <!-- Páginas de médico e paciente terão menos links --> */}
                                    <li className="links__item"><a className="links__titulo" href="/prontuarios">Prontuários</a></li>
                                    <div className="links__quebra"></div>
                                    <li className="links__item"><a className="links__titulo links__titulo--selecionado"
                                        href="#">Consultas</a></li>
                                    <div className="links__quebra"></div>
                                    <li className="links__item"><a className="links__titulo" href="/clinicas">Clínicas</a></li>
                                    <div className="links__quebra"></div>
                                    <li className="links__item"><a className="links__titulo" href="/medicos">Médicos</a></li>
                                    <div className="links__quebra"></div>
                                    <li className="links__item"><a className="links__titulo" href="/usuarios">Usuários</a></li>
                                    <div className="links__quebra"></div>
                                    <li className="links__item"><a className="links__titulo" href="/especialidades">Especialidades</a></li>
                                    <div className="links__quebra"></div>
                                </ul>
                            </nav>
                        </div>
                        {/* <!-- Escolher um deles: --> */}
                        <a className="menu__link" href="/login">Sair</a>
                        {/* <!-- <button>Sair</button> --> */}
                    </div>
                </aside>
                <main className="listas">
                    {/* <!-- Configuração Tab Html! -->
        <!-- (button)openPage("Nome") tem que ser igual (div/table)id="Nome" --> */}
                    <input type="button" className="listas__button listas__button--lista tablink" value='Lista' onClick={this.alteraTabs.bind(this)} />

                    <input type="button" className="listas__button listas__button--cadastrar tablink" value='Cadastrar+' onClick={this.alteraTabs.bind(this)} />

                    <div className="contorno">
                        <div id="Lista" className="tabela tabcontent" style={{ display: (this.state.tabLista ? "flex" : "none") }}>
                            <table className="tabela__real">
                                <thead className="tabela-head">
                                    <tr>
                                        <th className="tabela-head__titulo">Consulta(ID)</th>
                                        <th className="tabela-head__titulo">Paciente(ID)</th>
                                        <th className="tabela-head__titulo">Médico(ID)</th>
                                        <th className="tabela-head__titulo">Data da Consulta</th>
                                        <th className="tabela-head__titulo">Situação(ID)</th>
                                        <th className="tabela-head__titulo">Descrição</th>
                                        {/* <!-- <a href="#">Alterar</a> --> */}
                                    </tr>
                                </thead>
                                <tbody className="tabela-body">
                                    {this.state.listaConsultas.map(function (element) {
                                        return (
                                            <tr key={element.id}>
                                                <td className="tabela-body_dado">{element.id}</td>
                                                <td className="tabela-body_dado">{element.idProntuarioNavigation.idUsuarioNavigation.nome}</td>
                                                <td className="tabela-body_dado">{element.idMedicoNavigation.idUsuarioNavigation.nome}</td>
                                                <td className="tabela-body_dado">{element.dataHoraConsulta}</td>
                                                <td className="tabela-body_dado">{element.idSituacaoNavigation.nome}</td>
                                                {/* <td className="tabela-body_dado">{element.idSituacao ? element.idSituacao : 1}</td> */}
                                                <td className="tabela-body_dado">{element.descricao ? element.descricao : 'Vazia'}</td>
                                                <div className="botoes">
                                                    <button className="botoes__item botoes__item--alterar">Alterar</button>
                                                    <button className="botoes__item botoes__item--deletar">Deletar</button>
                                                </div>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <form onSubmit={this.cadastrarConsulta.bind(this)} noValidate>
                            <div id="Cadastrar" className="formulario tabcontent" style={{ display: (this.state.tabLista ? "none" : "flex") }}>
                                <label htmlFor=""><input className="formulario__item" type="text" value={this.state.idProntuario} onChange={this.atualizaEstadoidProntuario.bind(this)} placeholder="Nome do Paciente(ID)" /></label>
                                {/* <!-- <label htmlFor=""><input className="formulario__item" type="text" placeholder="ID do Paciente" /></label> --> */}
                                {/* <!-- FAZER UMA COIXA DE SELEÇÃO? --> */}
                                <label htmlFor=""><input className="formulario__item" type="text" value={this.state.idMedico} onChange={this.atualizaEstadoidMedico.bind(this)} placeholder="Nome do Médico(ID)" /></label>
                                {/* <!-- <label htmlFor=""><input className="formulario__item" type="text" placeholder="ID do Médico" /></label> --> */}
                                <label htmlFor=""><input className="formulario__item" type="date" value={this.state.dataHoraConsulta} onChange={this.atualizaEstadoData.bind(this)} placeholder="Data da Consulta" /></label>
                                <label htmlFor=""><input className="formulario__item" type="text" value={this.state.idSituacao} onChange={this.atualizaEstadoidSituacao.bind(this)} placeholder="Situação(ID)" /></label>
                                <label htmlFor=""><input className="formulario__item" type="text" value={this.state.descricao} onChange={this.atualizaEstadoDescricao.bind(this)} placeholder="Descrição" /></label>
                                <button className="formulario__button" type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                </main>

            </div>
        )
    }
}