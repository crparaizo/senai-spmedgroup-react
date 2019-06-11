import React, { Component } from "react";
import Axios from 'axios';
import apiService from "../../services/apiService";
import './Prontuarios.css';

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
            listaClinicas: [],
            listaProntuariosFiltrada: [],
            tabLista: true,
            inputBusca: "",
        }
    }

    logout() {
        localStorage.removeItem('usuario-spmedgroup');
        window.location.reload();

        // localStorage.clear();
        // window.location.href = '/';
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
                this.setState({ listaProntuarios: data.data, listaProntuariosFiltrada: data.data });
            });

        apiService
            .call("usuarios")
            .getAll()
            .then(data => {
                this.setState({ listaUsuarios: data.data });
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

    alteraTabs(event) {
        event.preventDefault();
        this.setState({ tabLista: !this.state.tabLista }) // "!" -> inverso do estado que está (IF melhorado)
    }

    buscarProntuarioItem() {

        let listaFiltrada = this.state.listaProntuarios;

        if (this.state.inputBusca !== null && this.state.inputBusca !== "") {
            listaFiltrada = listaFiltrada.filter(x =>
                x.endereco.toLowerCase().includes(this.state.inputBusca.toLowerCase())
            );
        }

        this.setState({ listaProntuariosFiltrada: listaFiltrada });
    }

    atualizaEstadoBusca(event) {
        this.setState({ inputBusca: event.target.value }, () => {
            this.buscarProntuarioItem() //Serve para filtrar no mesmo momento que vai
        });        
    }

    cadastrarProntuario(event) {
        event.preventDefault();

        // let prontuario = {
        //     idUsuario: this.state.idUsuario,
        //     rg: this.state.rg,
        //     cpf: this.state.cpf,
        //     dataNascimento: this.state.dataNascimento,
        //     telefone: this.state.telefone,
        //     endereco: this.state.endereco
        // };

        // Axios.post('http://localhost:5000/api/prontuarios', prontuario, {
        //     headers: {
        //         Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(res => {
        //         this.call("prontuarios")
        //     })

        if (this.state.listaProntuarios.map(x => x.cpf).indexOf(this.state.cpf) === -1) {

            apiService
                .call("prontuarios")
                .create({
                    idUsuario: this.state.idUsuario,
                    rg: this.state.rg,
                    cpf: this.state.cpf,
                    dataNascimento: this.state.dataNascimento,
                    telefone: this.state.telefone,
                    endereco: this.state.endereco
                })
                .then(res => {
                    this.call("prontuarios")
                })
        } else {
            this.setState({ erroMensagem: alert('CPF já cadastrado, tente outro diferente!') })
        }
    }

    render() {
        return (
            <div>
                
                <body>
                    <header>
                        <div class="topo-prontuario">
                            <div class="topo-prontuario__quebra"></div>
                            <h1 class="topo-prontuario__h1">Prontuários</h1>
                            <div class="topo-prontuario__quebra topo-prontuario__quebra--modificado"></div>
                            {/* <!-- Filtros específicos --> */}
                            <label for="">
                                <form onSubmit={this.buscarProntuarioItem.bind(this)}>
                                    <label>
                                        <input
                                            placeholder="Busque! - endereço"
                                            type="text"
                                            value={this.state.inputBusca}
                                            onChange={this.atualizaEstadoBusca.bind(this)}
                                        />
                                    </label>
                                </form>
                            </label>
                            {/* <!-- FILTRO DO FILTRO --> */}
                            <a href="/localizacoes">LOCALIZAÇÕES DOS PACIENTES</a>

                        </div>
                    </header>
                    <aside>
                        <div class="menu-prontuario">
                            <h3 class="menu-prontuario__titulo">Administrador</h3>
                            <img class="menu-prontuario__imagem" src={require('../../assets/img/icon-login.png')} alt="" />
                            {/* <!-- IMAGEM --> */}
                            <div class="links-prontuario">
                                <nav>
                                    <ul>
                                        {/* <!-- Colocar URL's -->
                        <!-- Páginas de médico e paciente terão menos links-prontuario --> */}
                                        <li class="links-prontuario__item"><a class="links-prontuario__titulo links-prontuario__titulo--selecionado"
                                            href="/prontuarios">Prontuários</a></li>
                                        <div class="links-prontuario__quebra"></div>
                                        <li class="links-prontuario__item"><a class="links-prontuario__titulo" href="/consultas">Consultas</a></li>
                                        <div class="links-prontuario__quebra"></div>
                                        <li class="links-prontuario__item"><a class="links-prontuario__titulo" href="/clinica">Clínicas</a></li>
                                        <div class="links-prontuario__quebra"></div>
                                        <li class="links-prontuario__item"><a class="links-prontuario__titulo" href="/medicos">Médicos</a></li>
                                        <div class="links-prontuario__quebra"></div>
                                        <li class="links-prontuario__item"><a class="links-prontuario__titulo" href="/usuarios">Usuários</a></li>
                                        <div class="links-prontuario__quebra"></div>
                                        <li class="links-prontuario__item"><a class="links-prontuario__titulo" href="/especialidades">Especialidades</a></li>
                                        <div class="links-prontuario__quebra"></div>
                                    </ul>
                                </nav>
                            </div>
                            {/* <!-- Escolher um deles: --> */}
                            <a class="menu-prontuario__link" href="/">Sair</a>
                            {/* <!-- <button>Sair</button> --> */}
                        </div>
                    </aside>
                    <main class="listas-prontuario">
                        {/* <!-- Configurar modal! --> */}
                        <button class="listas-prontuario__button listas-prontuario__button--lista tablink" value='Lista' onClick={this.alteraTabs.bind(this)}>Lista</button>

                        <button class="listas-prontuario__button listas-prontuario__button--cadastrar tablink"
                            value='Cadastrar+' onClick={this.alteraTabs.bind(this)}>Cadastrar+</button>

                        <div class="contorno">
                            <div id="Lista" class="tabela-prontuario tabcontent" style={{ display: (this.state.tabLista ? "flex" : "none") }}>
                                <table class="tabela-prontuario__real">
                                    <thead class="tabela-prontuario-head">
                                        <tr>
                                            <th class="tabela-prontuario-head__titulo">Prontuario(ID)</th>
                                            <th class="tabela-prontuario-head__titulo">Paciente(ID)</th>
                                            <th class="tabela-prontuario-head__titulo">RG</th>
                                            <th class="tabela-prontuario-head__titulo">CPF</th>
                                            <th class="tabela-prontuario-head__titulo">Data Nascimento</th>
                                            <th class="tabela-prontuario-head__titulo">Telefone</th>
                                            <th class="tabela-prontuario-head__titulo">Endereço</th>
                                            {/* <!-- <a href="#">Alterar</a> --> */}
                                        </tr>
                                    </thead>
                                    <tbody class="tabela-prontuario-body">
                                        {this.state.listaProntuariosFiltrada.map(element => {
                                            return (
                                                <tr key={element.id}>
                                                    <td class="tabela-prontuario-body_dado">{element.id}</td>
                                                    <td class="tabela-prontuario-body_dado">{element.idUsuario}</td>
                                                    <td class="tabela-prontuario-body_dado">{element.rg}</td>
                                                    <td class="tabela-prontuario-body_dado">{element.cpf}</td>
                                                    <td class="tabela-prontuario-body_dado">{element.dataNascimento}</td>
                                                    <td class="tabela-prontuario-body_dado">{element.telefone}</td>
                                                    <td class="tabela-prontuario-body_dado">{element.endereco}</td>
                                                    <div class="botoes-prontuario">
                                                        <button class="botoes-prontuario__item botoes-prontuario__item--alterar">Alterar</button>
                                                        <button class="botoes-prontuario__item botoes-prontuario__item--deletar">Deletar</button>
                                                    </div>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div id="Cadastrar" class="formulario-prontuario tabcontent" style={{ display: (this.state.tabLista ? "none" : "flex") }}>
                                <form onSubmit={this.cadastrarProntuario.bind(this)} noValidate>
                                    <label htmlFor=""><input class="formulario-prontuario__item" type="text" value={this.state.idUsuario} onChange={this.atualizaEstadoIdUsuario.bind(this)} type="text" placeholder="Nome/ID do Usuário" required/></label>
                                    <label htmlFor=""><input class="formulario-prontuario__item" type="text" value={this.state.rg} onChange={this.atualizaEstadoRg.bind(this)} type="text" placeholder="RG"required /></label>
                                    <label htmlFor=""><input class="formulario-prontuario__item" type="text" value={this.state.cpf} onChange={this.atualizaEstadoCpf.bind(this)} type="text" placeholder="CPF" required /></label>
                                    <label htmlFor=""><input class="formulario-prontuario__item" type="date" value={this.state.dataNascimento} onChange={this.atualizaEstadoDataNascimento.bind(this)} type="date" placeholder="Data de Nascimento" required/></label>
                                    <label htmlFor=""><input class="formulario-prontuario__item" type="text" value={this.state.telefone} onChange={this.atualizaEstadoTelefone.bind(this)} type="text" placeholder="Telefone" required /></label>
                                    <label htmlFor=""><input class="formulario-prontuario__item" type="text" value={this.state.endereco} onChange={this.atualizaEstadoEndereco.bind(this)} type="text" placeholder="Endereço" required /></label>
                                    <button type="submit" class="formulario-prontuario__button">Cadastrar</button>
                                </form>


                                {/* <form onSubmit={this.cadastrarProntuario.bind(this)} noValidate>
                                    <input type="text" value={this.state.idUsuario} onChange={this.atualizaEstadoIdUsuario.bind(this)} placeholder="ID - usuário" required />
                                    <input type="text" value={this.state.rg} onChange={this.atualizaEstadoRg.bind(this)} placeholder="rg" required />
                                    <input type="text" value={this.state.cpf} onChange={this.atualizaEstadoCpf.bind(this)} placeholder="cpf" required />
                                    <input type="date" value={this.state.dataNascimento} onChange={this.atualizaEstadoDataNascimento.bind(this)} placeholder="Data de nascimento" required />
                                    <input type="text" value={this.state.telefone} onChange={this.atualizaEstadoTelefone.bind(this)} placeholder="telefone" required />
                                    <input type="text" value={this.state.endereco} onChange={this.atualizaEstadoEndereco.bind(this)} placeholder="endereço" required />
                                    <button type="submit"> Cadastrar </button>
                                </form> */}
                            </div>
                        </div>
                    </main>

                </body>
            </div>

        )
    }
}


{/* <select
    required
    value={this.state.idProntuarioNavigation}
    onChange={this.atualizaEstadoProntuario.bind(this)} required className="consulta--cadastrar__select">
    <option>Selecione o paciente</option>
    {this.state.listaProntuarios.map(element => {
        return (
            <option key={element.id} value={element.id}>
                {element.nome}
            </option>
        );
    })}
</select>  */}