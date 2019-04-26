import React, { Component } from "react";
import Axios from 'axios';
import apiService from "../../services/apiService";
import './Usuarios.css';

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
            listaProntuarios: [],
            tabLista: true
        }
    }

    logout() {
        localStorage.removeItem('usuario-spmedgroup');
        window.location.reload();
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

    alteraTabs(event) {
        event.preventDefault();
        this.setState({ tabLista: !this.state.tabLista }) // "!" -> inverso do estado que está (IF melhorado)
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
                <header>
                    <div className="topo-usuario">
                        <div className="topo-usuario__quebra"></div>
                        <h1 className="topo-usuario__h1">Usuários</h1>
                        <div className="topo-usuario__quebra topo-usuario__quebra--modificado"></div>
                        {/* <!-- Filtros específicos --> */}
                        <label htmlFor="">
                            <input className="topo-usuario__item" type="text" placeholder="Buscar por..." />
                        </label>
                        <select name="" id="">
                            <option value="">ID</option>
                            <option value="">Email</option>
                        </select>
                        {/* <!-- FILTRO DO FILTRO --> */}
                        <label htmlFor="">
                            <input className="topo-usuario__item" type="text" placeholder="Buscar por Tipo de Usuário..." />
                        </label>
                        <label htmlFor="">
                            <input className="topo-usuario__item" type="text" placeholder="Buscar por Nome..." />
                        </label>
                        <button className="topo-usuario__button">Limpar</button>
                    </div>
                </header>
                <aside>
                    <div className="menu-usuario">
                        <h3 className="menu-usuario__titulo">Administrador</h3>
                        <img className="menu-usuario__imagem" src={require('../../assets/img/icon-login.png')} alt="" />
                        {/* <!-- IMAGEM --> */}
                        <div className="links-usuario">
                            <nav>
                                <ul>
                                    {/* <!-- Colocar URL's -->
                        <!-- Páginas de médico e paciente terão menos links-usuario --> */}
                                    <li className="links-usuario__item"><a className="links-usuario__titulo" href="/prontuarios">Prontuários</a></li>
                                    <div className="links-usuario__quebra"></div>
                                    <li className="links-usuario__item"><a className="links-usuario__titulo" href="/consultas">Consultas</a></li>
                                    <div className="links-usuario__quebra"></div>
                                    <li className="links-usuario__item"><a className="links-usuario__titulo" href="clinicas">Clínicas</a></li>
                                    <div className="links-usuario__quebra"></div>
                                    <li className="links-usuario__item"><a className="links-usuario__titulo" href="medicos">Médicos</a></li>
                                    <div className="links-usuario__quebra"></div>
                                    <li className="links-usuario__item"><a className="links-usuario__titulo links-usuario__titulo--selecionado"
                                        href="usuarios">Usuários</a></li>
                                    <div className="links-usuario__quebra"></div>
                                    <li className="links-usuario__item"><a className="links-usuario__titulo" href="/especialidades">Especialidades</a></li>
                                    <div className="links-usuario__quebra"></div>
                                </ul>
                            </nav>
                        </div>
                        <a className="menu-usuario__link" onClick={this.logout.bind(this)} href="/">Sair</a>
                    </div>
                </aside>
                <main className="listas-usuario">
                    <button className="listas-usuario__button listas-usuario__button--lista tablink" value='Lista' onClick={this.alteraTabs.bind(this)}>Lista</button>

                    <button className="listas-usuario__button listas-usuario__button--cadastrar tablink"
                        value='Cadastrar+' onClick={this.alteraTabs.bind(this)}>Cadastrar+</button>

                    <div className="contorno">
                        <div id="Lista" className="tabela-usuario tabcontent" style={{ display: (this.state.tabLista ? "flex" : "none") }}>
                            <table className="tabela-usuario__real">
                                <thead className="tabela-usuario-head">
                                    <tr>
                                        <th className="tabela-usuario-head__titulo">Usuário(ID)</th>
                                        <th className="tabela-usuario-head__titulo">Nome</th>
                                        <th className="tabela-usuario-head__titulo">Email</th>
                                        <th className="tabela-usuario-head__titulo">Senha</th>
                                        <th className="tabela-usuario-head__titulo">Tipo Usuário</th>
                                        {/* <!-- <a href="#">Alterar</a> --> */}
                                    </tr>
                                </thead>
                                <tbody className="tabela-usuario-body">
                                    {this.state.listaUsuarios.map(element => {
                                        return (
                                            <tr key={element.id}>
                                                <td className="tabela-usuario-body_dado">{element.id}</td>
                                                <td className="tabela-usuario-body_dado">{element.nome}</td>
                                                <td className="tabela-usuario-body_dado">{element.email}</td>
                                                <td className="tabela-usuario-body_dado">{element.senha}</td>
                                                <td className="tabela-usuario-body_dado">{element.idTipoUsuario}</td>
                                                <div className="botoes-usuario">
                                                    <button className="botoes-usuario__item botoes-usuario__item--alterar">Alterar</button>
                                                    <button className="botoes-usuario__item botoes-usuario__item--deletar">Deletar</button>
                                                </div>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div id="Cadastrar" className="formulario-usuario tabcontent" style={{ display: (this.state.tabLista ? "none" : "flex") }}>
                            <form onSubmit={this.cadastrarUsuario.bind(this)} noValidate>
                                <label htmlFor=""><input className="formulario-usuario__item" value={this.state.nome} onChange={this.atualizaEstadoNome.bind(this)} type="text" placeholder="Nome" required /></label>
                                <label htmlFor=""><input className="formulario-usuario__item" value={this.state.email} onChange={this.atualizaEstadoEmail.bind(this)} type="email" placeholder="Email" required /></label>
                                <label htmlFor=""><input className="formulario-usuario__item" value={this.state.senha} onChange={this.atualizaEstadoSenha.bind(this)} type="text" placeholder="Senha" required /></label>
                                {/* <!-- FAZER UMA COIXA DE SELEÇÃO? --> */}
                                <label htmlFor=""><input className="formulario-usuario__item" value={this.state.idTipoUsuario} onChange={this.atualizaEstadoidTipoUsuario.bind(this)} type="text" placeholder="Tipo de Usuário" required /></label>
                                {/* <!-- <select name="" id="">
                    <option value="">Administrador</option>
                    <option value="">Médico</option>
                    <option value="">Paciente</option>
                </select> --> */}
                                <button className="formulario-usuario__button" type="submit">Enviar</button>
                            </form>
                        </div>
                    </div>
                </main>

            </div>

        )
    }
}