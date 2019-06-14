import React, { Component } from "react";
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

        let listaPacientes = [];

        apiService
            .call("usuarios")
            .getAll()
            .then(data => {
                data.data.forEach(element => {
                    if (element.idTipoUsuarioNavigation.nome == "Paciente") {
                        listaPacientes.push(element);
                    }
                });
                this.setState({ listaUsuarios: listaPacientes });
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
                x.endereco.toLowerCase().includes(this.state.inputBusca.toLowerCase()) ||
                x.rg.includes(this.state.inputBusca) ||
                x.cpf.includes(this.state.inputBusca) ||
                x.telefone.toLowerCase().includes(this.state.inputBusca)
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
                    this.componentDidMount()
                })
                .then(res => {
                    alert("Prontuário cadastrado!");
                    this.setState({
                        idUsuario: '',
                        rg: '',
                        cpf: '',
                        dataNascimento: '',
                        telefone: '',
                        endereco: ''
                    })
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
                        <div className="topo-prontuario">
                            <div className="topo-prontuario__quebra"></div>
                            <h1 className="topo-prontuario__h1">Prontuários</h1>
                            <div className="topo-prontuario__quebra topo-prontuario__quebra--modificado"></div>
                            <label for="">
                                <form onSubmit={this.buscarProntuarioItem.bind(this)}>
                                    <label>
                                        <input
                                        className="topo-prontuario__label"
                                            placeholder="Busque!"
                                            type="text"
                                            value={this.state.inputBusca}
                                            onChange={this.atualizaEstadoBusca.bind(this)}
                                        />
                                    </label>
                                </form>
                            </label>
                            <a href="/localizacoes" className="topo-prontuario-link">Localizações dos Pacientes</a>
                        </div>
                    </header>
                    <aside>
                        <div className="menu-prontuario">
                            <h3 className="menu-prontuario__titulo">Administrador</h3>
                            <img className="menu-prontuario__imagem" src={require('../../assets/img/icon-login.png')} alt="" />
                            <div className="links-prontuario">
                                <nav>
                                    <ul>
                                        <li className="links-prontuario__item links-prontuario__titulo links-prontuario__titulo--selecionado">Prontuários</li>
                                        <div className="links-prontuario__quebra"></div>
                                        <li className="links-prontuario__item"><a className="links-prontuario__titulo" href="/consultas">Consultas</a></li>
                                        <div className="links-prontuario__quebra"></div>
                                        <li className="links-prontuario__item"><a className="links-prontuario__titulo" href="/clinicas">Clínicas</a></li>
                                        <div className="links-prontuario__quebra"></div>
                                        <li className="links-prontuario__item"><a className="links-prontuario__titulo" href="/medicos">Médicos</a></li>
                                        <div className="links-prontuario__quebra"></div>
                                        <li className="links-prontuario__item"><a className="links-prontuario__titulo" href="/usuarios">Usuários</a></li>
                                        <div className="links-prontuario__quebra"></div>
                                        <li className="links-prontuario__item"><a className="links-prontuario__titulo" href="/especialidades">Especialidades</a></li>
                                        <div className="links-prontuario__quebra"></div>
                                    </ul>
                                </nav>
                            </div>
                            <a className="menu-prontuario__link" href="/">Sair</a>
                        </div>
                    </aside>
                    <main className="listas-prontuario">
                        {/* <!-- Configurar modal! --> */}
                        <button className="listas-prontuario__button listas-prontuario__button--lista tablink" value='Lista' onClick={this.alteraTabs.bind(this)}>Lista</button>
                        <button className="listas-prontuario__button listas-prontuario__button--cadastrar tablink"
                            value='Cadastrar+' onClick={this.alteraTabs.bind(this)}>Cadastrar+</button>
                        <div className="contorno">
                            <div id="Lista" className="tabela-prontuario tabcontent" style={{ display: (this.state.tabLista ? "flex" : "none") }}>
                                <table className="tabela-prontuario__real">
                                    <thead className="tabela-prontuario-head">
                                        <tr>
                                            <th className="tabela-prontuario-head__titulo">Prontuario(ID)</th>
                                            <th className="tabela-prontuario-head__titulo">Paciente</th>
                                            <th className="tabela-prontuario-head__titulo">RG</th>
                                            <th className="tabela-prontuario-head__titulo">CPF</th>
                                            <th className="tabela-prontuario-head__titulo">Data Nascimento</th>
                                            <th className="tabela-prontuario-head__titulo">Telefone</th>
                                            <th className="tabela-prontuario-head__titulo">Endereço</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tabela-prontuario-body">
                                        {this.state.listaProntuariosFiltrada.map(element => {
                                            return (
                                                <tr key={element.id}>
                                                    <td className="tabela-prontuario-body_dado">{element.id}</td>
                                                    <td className="tabela-prontuario-body_dado">{element.idUsuarioNavigation.nome}</td>
                                                    <td className="tabela-prontuario-body_dado">{element.rg}</td>
                                                    <td className="tabela-prontuario-body_dado">{element.cpf}</td>
                                                    <td className="tabela-prontuario-body_dado">{element.dataNascimento}</td>
                                                    <td className="tabela-prontuario-body_dado">{element.telefone}</td>
                                                    <td className="tabela-prontuario-body_dado">{element.endereco}</td>
                                                    <div className="botoes-prontuario">
                                                        <button className="botoes-prontuario__item botoes-prontuario__item--alterar">Alterar</button>
                                                        <button className="botoes-prontuario__item botoes-prontuario__item--deletar">Deletar</button>
                                                    </div>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div id="Cadastrar" className="formulario-prontuario tabcontent" style={{ display: (this.state.tabLista ? "none" : "flex") }}>
                                <form onSubmit={this.cadastrarProntuario.bind(this)} noValidate>

                                    <select
                                        className="formulario-prontuario__item"
                                        type="text"
                                        value={this.state.idUsuario}
                                        onChange={this.atualizaEstadoIdUsuario.bind(this)}
                                        required
                                    >
                                        <option>Nome do Paciente</option>{
                                            this.state.listaUsuarios.map((element) => {
                                                return <option key={element.id} value={element.id}>{element.nome}</option>
                                            })
                                        }
                                    </select>

                                    <label htmlFor=""><input className="formulario-prontuario__item" type="text" value={this.state.rg} onChange={this.atualizaEstadoRg.bind(this)} placeholder="RG" required /></label>
                                    <label htmlFor=""><input className="formulario-prontuario__item" type="text" value={this.state.cpf} onChange={this.atualizaEstadoCpf.bind(this)} placeholder="CPF" required /></label>
                                    <label htmlFor=""><input className="formulario-prontuario__item" type="date" value={this.state.dataNascimento} onChange={this.atualizaEstadoDataNascimento.bind(this)} placeholder="Data de Nascimento" required /></label>
                                    <label htmlFor=""><input className="formulario-prontuario__item" type="text" value={this.state.telefone} onChange={this.atualizaEstadoTelefone.bind(this)} placeholder="Telefone" required /></label>
                                    <label htmlFor=""><input className="formulario-prontuario__item" type="text" value={this.state.endereco} onChange={this.atualizaEstadoEndereco.bind(this)} placeholder="Endereço" required /></label>
                                    <button type="submit" className="formulario-prontuario__button">Cadastrar</button>
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