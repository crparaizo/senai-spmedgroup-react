import React, { Component } from "react";
import Axios from 'axios';
import './Especialidades.css';
import apiService from "../../services/apiService";

export default class ListarCadastrarEspecialidade extends Component {
    constructor() {
        super();

        this.state = {
            nome: "",
            listaEspecialidades: [],
            listaEspecialidadesFiltrada: [],
            inputBusca: '',
            tabLista: true
        }
    }

    logout() {
        localStorage.removeItem('especialidade-spmedgroup');
        window.location.reload();
    }

    buscarEspecialidades() {

        apiService
            .call("especialidades")
            .getAll()

            // Axios.get('http://192.168.3.151:5000/api/especialidades', {
            //     headers: {
            //         Authorization: "Bearer " + localStorage.getItem('especialidade-spmedgroup'),
            //         "Content-Type": "application/json"
            //     }
            // })

            .then(res => {
                const especialidades = res.data;
                this.setState({ listaEspecialidades: especialidades, listaEspecialidadesFiltrada: especialidades })
            })
    }

    componentDidMount() {
        this.buscarEspecialidades();
    }

    atualizaEstadoNome(event) {
        this.setState({ nome: event.target.value });
    }

    alteraTabs(event) {
        event.preventDefault();
        this.setState({ tabLista: !this.state.tabLista }) // "!" -> inverso do estado que está (IF melhorado)
    }

    buscarEspecialidadeItem() {

        let listaFiltrada = this.state.listaEspecialidades;

        if (this.state.inputBusca !== null && this.state.inputBusca !== "") {
            listaFiltrada = listaFiltrada.filter(x =>
                x.nome.toLowerCase().includes(this.state.inputBusca.toLowerCase())
            );
        }

        this.setState({ listaEspecialidadesFiltrada: listaFiltrada });
    }

    atualizaEstadoBusca(event) {
        this.setState({ inputBusca: event.target.value }, () => {
            this.buscarEspecialidadeItem() //Serve para filtrar no mesmo momento que vai
        });
    }

    //Sessão cadastro

    cadastrarEspecialidade(event) {
        event.preventDefault();

        if (this.state.listaEspecialidades.map(x => x.nome).indexOf(this.state.nome) === -1) { //Condição para array de objeto (para array de elementos é diferente e mais simples)

            // let especialidade = {
            //     nome: this.state.nome
            // }

            apiService
                .call("especialidades")
                .create({ nome: this.state.nome })

                // Axios.post('http://192.168.3.151:5000/api/especialidades', especialidade, {
                //     headers: {
                //         Authorization: "Bearer " + localStorage.getItem('especialidade-spmedgroup'),
                //         "Content-Type": "application/json"
                //     }
                // })

                .then(res => {
                    this.buscarEspecialidades()
                })
                .then(res => {
                    alert("Especialidade cadastrada!")
                    this.setState({
                        nome: ''
                    })
                })

        } else {
            //this.setState({ erroMensagem: 'Especialidade já cadastrada!' })
            this.setState({ erroMensagem: alert('Especialidade já cadastrada! Tente outro nome!') })
        }
    }

    excluirPorId(event) {
        event.preventDefault();

        const idEspecialidade = (event.target.getAttribute('idEspecialidade'))

        let jwt = localStorage.getItem('usuario-spmedgroup');

        if (window.confirm("Quer excluir mesmo?")) {

            Axios.delete(`http://192.168.3.151:5000/api/especialidades/` + idEspecialidade, {
                headers: {
                    "authorization": 'Bearer ' + jwt
                }
            })
                .then(() => {
                    this.buscarEspecialidades();
                    alert("Especialidade removida!")
                })
                .catch((erro) => {
                    console.log('erro' + erro)
                })
        }
    }

    render() {
        return (
            <div>

                <header>
                    <div className="topo-especialidade">
                        <div className="topo-especialidade__quebra"></div>
                        <h1 className="topo-especialidade__h1">Especialidades</h1>
                        <div className="topo-especialidade__quebra topo-especialidade__quebra--modificado"></div>
                        <form onSubmit={this.buscarEspecialidadeItem.bind(this)}>
                            <label>
                                <input
                                    className="topo-especialidade__label"
                                    placeholder="Busque! - nome"
                                    type="text"
                                    value={this.state.inputBusca}
                                    onChange={this.atualizaEstadoBusca.bind(this)}
                                />
                            </label>
                        </form>
                    </div>
                </header>

                <aside>
                    <div className="menu-especialidade">
                        <h3 className="menu-especialidade__titulo">Administrador</h3>
                        <img className="menu-especialidade__imagem" src={require('../../assets/img/icon-login.png')} alt="" />
                        {/* <!-- IMAGEM --> */}
                        <div className="links-especialidade">
                            <nav>
                                <ul>
                                    {/* <!-- Colocar URL's -->
                        <!-- Páginas de médico e paciente terão menos links-especialidade --> */}
                                    <li className="links-especialidade__item"><a className="links-especialidade__titulo" href="/prontuarios">Prontuários</a></li>
                                    <div className="links-especialidade__quebra"></div>
                                    <li className="links-especialidade__item"><a className="links-especialidade__titulo" href="/consultas">Consultas</a></li>
                                    <div className="links-especialidade__quebra"></div>
                                    <li className="links-especialidade__item"><a className="links-especialidade__titulo" href="/clinicas">Clínicas</a></li>
                                    <div className="links-especialidade__quebra"></div>
                                    <li className="links-especialidade__item"><a className="links-especialidade__titulo" href="/medicos">Médicos</a></li>
                                    <div className="links-especialidade__quebra"></div>
                                    <li className="links-especialidade__item"><a className="links-especialidade__titulo"
                                        href="/usuarios">Usuários</a></li>
                                    <div className="links-especialidade__quebra"></div>
                                    <li className="links-especialidade__item links-especialidade__titulo links-especialidade__titulo--selecionado">Especialidades</li>
                                    <div className="links-especialidade__quebra"></div>
                                </ul>
                            </nav>
                        </div>
                        <a className="menu-especialidade__link" onClick={this.logout.bind(this)} href="/">Sair</a>
                    </div>
                </aside>

                <main className="listas-especialidade">
                    <button className="listas-especialidade__button listas-especialidade__button--lista tablink" value='Lista' onClick={this.alteraTabs.bind(this)}>Lista</button>
                    <button className="listas-especialidade__button listas-especialidade__button--cadastrar tablink" value='Cadastrar+' onClick={this.alteraTabs.bind(this)}>Cadastrar+</button>
                    <div className="contorno">
                        <div id="Lista" className="tabela-especialidade tabcontent" style={{ display: (this.state.tabLista ? "flex" : "none") }}>
                            <table className="tabela-especialidade__real">
                                <thead className="tabela-especialidade-head">
                                    <tr>
                                        <th className="tabela-especialidade-head__titulo">Nome</th>
                                    </tr>
                                </thead>
                                <tbody className="tabela-especialidade-body">
                                    {this.state.listaEspecialidadesFiltrada.map(element => {
                                        return (
                                            <tr key={element.id}>
                                                <td className="tabela-especialidade-body_dado">{element.id}</td>
                                                <td className="tabela-especialidade-body_dado">{element.nome}</td>
                                                <div className="botoes-especialidade">
                                                    {/* <button className="botoes-especialidade__item botoes-especialidade__item--alterar">Alterar</button> */}
                                                    <button className="botoes-especialidade__item botoes-especialidade__item--deletar" idEspecialidade={element.id} onClick={this.excluirPorId.bind(this)}>Deletar</button>
                                                </div>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div id="Cadastrar" className="formulario-especialidade tabcontent" style={{ display: (this.state.tabLista ? "none" : "flex") }}>
                            <form onSubmit={this.cadastrarEspecialidade.bind(this)} noValidate>
                                <label htmlFor=""><input className="formulario-especialidade__item" value={this.state.nome} onChange={this.atualizaEstadoNome.bind(this)} type="text" placeholder="Nome" required /></label>
                                <button className="formulario-especialidade__button" type="submit">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </main>

            </div>
        )
    }
}