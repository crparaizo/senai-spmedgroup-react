import React, { Component } from "react";
import apiService from "../../services/apiService";
import './Medicos.css';

// import ListaMedicos from '../../components/Lista/ListaMedicos';

export default class ListarCadastrarMedico extends Component {
    constructor() {
        super();

        this.state = {
            idUsuario: "",
            crm: "",
            listaCrm: [], //Caixa de seleção -> Fazer um filter?
            listaMedicos: [], //Puxar informações da tabela Médicos para mostrar (com "inner join") 
            idEspecialidade: "",
            listaEspecialidade: [],
            idClinica: "",
            listaClinicas: [],
            listaConsultas: [], //Listar todas as consultas de determinada pessoa
            listaMedicosFiltrada: [],
            tabLista: true,
            inputBusca: "",
            listaUsuarios: []
        }
    }

    logout() {
        localStorage.removeItem('medico-spmedgroup');
        window.location.reload();
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

        let listaMedicos = [];

        apiService
            .call("usuarios")
            .getAll()
            .then(data => {
                data.data.forEach(element => {
                    if (element.idTipoUsuarioNavigation.nome == "Medico") {
                        listaMedicos.push(element);
                    }
                });
                this.setState({ listaUsuarios: listaMedicos });
            });

        apiService
            .call("medicos")
            .getAll()
            .then(data => {
                this.setState({ listaMedicos: data.data, listaMedicosFiltrada: data.data });
            });
    }

    atualizaEstadoidUsuario(event) {
        this.setState({ idUsuario: event.target.value });
    }

    atualizaEstadoCrm(event) {
        this.setState({ crm: event.target.value });

        // this.state.listaCrm.forEach(element => {
        //     console.log(element.nome);
        //     console.log(event.target.value);

        //     if (element.nome == event.target.value)
        //     {
        //         this.setState({ categoriaId : element.id });
        //     }
        // });

    }

    atualizaEstadoidEspecialidade(event) { //??
        this.setState({ idEspecialidade: event.target.value });
    }

    atualizaEstadoidClinica(event) {
        this.setState({ idClinica: event.target.value });
    }

    alteraTabs(event) {
        event.preventDefault();
        this.setState({ tabLista: !this.state.tabLista }) // "!" -> inverso do estado que está (IF melhorado)
    }

    buscarMedicoItem() {

        let listaFiltrada = this.state.listaMedicos;

        if (this.state.inputBusca !== null && this.state.inputBusca !== "") {
            listaFiltrada = listaFiltrada.filter(x =>
                x.idUsuarioNavigation.nome.toLowerCase().includes(this.state.inputBusca.toLowerCase()) ||
                x.crm.includes(this.state.inputBusca) ||
                x.idEspecialidadeNavigation.nome.toLowerCase().includes(this.state.inputBusca.toLowerCase()) ||
                x.idClinicaNavigation.nomeFantasia.toLowerCase().includes(this.state.inputBusca.toLowerCase())
            );
        }
        this.setState({ listaMedicosFiltrada: listaFiltrada });
    }

    atualizaEstadoBusca(event) {
        this.setState({ inputBusca: event.target.value }, () => {
            this.buscarMedicoItem() //Serve para filtrar no mesmo momento que vai
        });
    }

    cadastrarMedico(event) {
        event.preventDefault();

        // let medico = {
        //     idUsuario: this.state.idUsuario,
        //     crm: this.state.crm,
        //     idEspecialidade: this.state.idEspecialidade,
        //     idClinica: this.state.idClinica
        // };

        // Axios.post('http://localhost:5000/api/medicos', medico, {
        //     headers: {
        //         Authorization: "Bearer " + localStorage.getItem('medico-spmedgroup'),
        //         "Content-Type": "application/json"
        //     }

        // })
        //     .then(res => {
        //         this.call("medicos")
        //     })

        if (this.state.listaMedicos.map(x => x.crm).indexOf(this.state.crm) === -1) {
            apiService
                .call("medicos")
                .create({
                    idUsuario: this.state.idUsuario,
                    crm: this.state.crm,
                    idEspecialidade: this.state.idEspecialidade,
                    idClinica: this.state.idClinica
                })
                .then(res => {
                    this.componentDidMount()
                })
                .then(res => {
                    alert("Médico cadastrado!");
                    this.setState({
                        idUsuario: '',
                        crm: '',
                        idEspecialidade: '',
                        idClinica: ''
                    })
                })
        } else {
            this.setState({ erroMensagem: alert('CRM já cadastrado, tente outro diferente!') })
        }
    }

    render() {
        return (
            <div>
                <header>
                    <div className="topo-medico">
                        <div className="topo-medico__quebra"></div>
                        <h1 className="topo-medico__h1">Médicos</h1>
                        <div className="topo-medico__quebra topo-medico__quebra--modificado"></div>
                        <form onSubmit={this.buscarMedicoItem.bind(this)}>
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
                    <div className="menu-medico">
                        <h3 className="menu-medico__titulo">Administrador</h3>
                        <img className="menu-medico__imagem" src={require('../../assets/img/icon-login.png')} alt="" />
                        <div className="links-medico">
                            <nav>
                                <ul>
                                    <li className="links-medico__item"><a className="links-medico__titulo" href="/prontuarios">Prontuários</a></li>
                                    <div className="links-medico__quebra"></div>
                                    <li className="links-medico__item"><a className="links-medico__titulo" href="/consultas">Consultas</a></li>
                                    <div className="links-medico__quebra"></div>
                                    <li className="links-medico__item"><a className="links-medico__titulo" href="/clinicas">Clínicas</a></li>
                                    <div className="links-medico__quebra"></div>
                                    <li className="links-medico__item links-medico__titulo links-medico__titulo--selecionado">Médicos</li>
                                    <div className="links-medico__quebra"></div>
                                    <li className="links-medico__item"><a className="links-medico__titulo "
                                        href="/usuarios">Usuários</a></li>
                                    <div className="links-medico__quebra"></div>
                                    <li className="links-medico__item"><a className="links-medico__titulo" href="/especialidades">Especialidades</a></li>
                                    <div className="links-medico__quebra"></div>
                                </ul>
                            </nav>
                        </div>
                        <a className="menu-medico__link" onClick={this.logout.bind(this)} href="/">Sair</a>
                    </div>
                </aside>

                {/* <ListaMedicos lista={this.state.listaMedicos} /> */}

                <main className="listas-medico">
                    <button className="listas-medico__button listas-medico__button--lista tablink" value='Lista' onClick={this.alteraTabs.bind(this)}>Lista</button>
                    <button className="listas-medico__button listas-medico__button--cadastrar tablink" value='Cadastrar+' onClick={this.alteraTabs.bind(this)}>Cadastrar+</button>
                    <div className="contorno">
                        <div id="Lista" className="tabela-medico tabcontent" style={{ display: (this.state.tabLista ? "flex" : "none") }}>
                            <table className="tabela-medico__real">
                                <thead className="tabela-medico-head">
                                    <tr>
                                        <th className="tabela-medico-head__titulo">Médico(ID)</th>
                                        <th className="tabela-medico-head__titulo">CRM</th>
                                        <th className="tabela-medico-head__titulo">Especialidade</th>
                                        <th className="tabela-medico-head__titulo">Clínica</th>
                                    </tr>
                                </thead>
                                <tbody className="tabela-medico-body">
                                    {this.state.listaMedicosFiltrada.map(element => {
                                        return (
                                            <tr key={element.id}>
                                                <td className="tabela-medico-body_dado">{element.id}</td>
                                                <td className="tabela-medico-body_dado">{element.idUsuarioNavigation.nome}</td>
                                                <td className="tabela-medico-body_dado">{element.crm}</td>
                                                <td className="tabela-medico-body_dado">{element.idEspecialidadeNavigation.nome}</td>
                                                <td className="tabela-medico-body_dado">{element.idClinicaNavigation.nomeFantasia}</td>
                                                <div className="botoes-medico">
                                                    <button className="botoes-medico__item botoes-medico__item--alterar">Alterar</button>
                                                    <button className="botoes-medico__item botoes-medico__item--deletar">Deletar</button>
                                                </div>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div id="Cadastrar" className="formulario-medico tabcontent" style={{ display: (this.state.tabLista ? "none" : "flex") }}>
                            <form onSubmit={this.cadastrarMedico.bind(this)} noValidate>

                                <select
                                    className="formulario-prontuario__item"
                                    type="text"
                                    value={this.state.idUsuario}
                                    onChange={this.atualizaEstadoidUsuario.bind(this)}
                                    required
                                >
                                    <option>Nome do Médico</option>{
                                        this.state.listaUsuarios.map((element) => {
                                            return <option key={element.id} value={element.id}>{element.nome}</option>
                                        })
                                    }
                                </select>

                                <label htmlFor=""><input className="formulario-medico__item" value={this.state.crm} onChange={this.atualizaEstadoCrm.bind(this)} type="email" placeholder="CRM" required /></label>
                                <label htmlFor=""><input className="formulario-medico__item" value={this.state.idEspecialidade} onChange={this.atualizaEstadoidEspecialidade.bind(this)} type="text" placeholder="Especialidade" required /></label>

                                <select
                                    className="formulario-medico__item"
                                    type="text"
                                    value={this.state.idEspecialidade}
                                    onChange={this.atualizaEstadoidEspecialidade.bind(this)}
                                >
                                    <option>Especialidade</option>{
                                        this.state.listaEspecialidade.map((element) => {
                                            return <option key={element.id} value={element.id}>{element.nome}</option>
                                        })
                                    }
                                </select>

                                <label htmlFor=""><input className="formulario-medico__item" value={this.state.idClinica} onChange={this.atualizaEstadoidClinica.bind(this)} type="text" placeholder="Clínica" required /></label>

                                {/* <select
                                className="formulario-medico__item"
                                    type="text"
                                    value={this.state.idClinica}
                                    onChange={this.atualizaEstadoidClinica.bind(this)}
                                >
                                    <option>Paciente</option>{
                                        this.state.listaClinicas.map((element) => {
                                            return <option key={element.id} value={element.id}>{element.nome}</option>
                                        })
                                    }
                                </select> */}

                                <button className="formulario-medico__button" type="submit">Enviar</button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}