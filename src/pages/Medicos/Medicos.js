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
                    alert("Médico cadastrado!");
                    this.componentDidMount()
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
                        {/* <!-- IMAGEM --> */}
                        <div className="links-medico">
                            <nav>
                                <ul>
                                    {/* <!-- Colocar URL's -->
                        <!-- Páginas de médico e paciente terão menos links-medico --> */}
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



                {/* <table>
                    <thead>
                        <tr>
                            <th>ID - Médico</th>
                            <th> Nome médico</th>
                            <th>CRM</th>
                            <th>Especialidade</th>
                            <th>ID- Clínica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaMedicosFiltrada.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.idUsuarioNavigation.nome}</td>
                                    <td>{element.crm}</td>
                                    <td>{element.idEspecialidadeNavigation.nome}</td>
                                    <td>{element.idClinicaNavigation.nomeFantasia}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <form onSubmit={this.cadastrarMedico.bind(this)} noValidate>
                    <input type="text" value={this.state.idUsuario} onChange={this.atualizaEstadoidUsuario.bind(this)} placeholder="ID -usuário" required />
                    <input type="text" value={this.state.crm} onChange={this.atualizaEstadoCrm.bind(this)} placeholder="crm" required />
                    <input type="text" value={this.state.idEspecialidade} onChange={this.atualizaEstadoidEspecialidade.bind(this)} placeholder="ID - especialidade" required />
                    <input type="text" value={this.state.idClinica} onChange={this.atualizaEstadoidClinica.bind(this)} placeholder="Id - clinica" required />
                    <button type="submit"> Cadastrar </button>
                </form> */}





                <main className="listas-medico">
                    {/* <!-- Configurar modal! --> */}
                    <button className="listas-medico__button listas-medico__button--lista tablink" value='Lista' onClick={this.alteraTabs.bind(this)}>Lista</button>
                    <button className="listas-medico__button listas-medico__button--cadastrar tablink"
                        value='Cadastrar+' onClick={this.alteraTabs.bind(this)}>Cadastrar+</button>
                    <div className="contorno">
                        <div id="Lista" className="tabela-medico tabcontent" style={{ display: (this.state.tabLista ? "flex" : "none") }}>
                            <table className="tabela-medico__real">
                                <thead className="tabela-medico-head">
                                    <tr>
                                        <th className="tabela-medico-head__titulo">Médico(ID)</th>
                                        <th className="tabela-medico-head__titulo">Nome</th>
                                        <th className="tabela-medico-head__titulo">CRM</th>
                                        <th className="tabela-medico-head__titulo">Especialidade</th>
                                        <th className="tabela-medico-head__titulo">Clínica(ID)</th>
                                    </tr>
                                </thead>
                                <tbody className="tabela-medico-body">
                                    {this.state.listaMedicosFiltrada.map(element => {
                                        return (
                                            <tr key={element.id}>
                                                <td className="tabela-medico-body_dado">{element.id}</td>
                                                <td className="tabela-medico-body_dado">{element.idUsuarioNavigation.nome}</td>
                                                <td className="tabela-medico-body_dado">{element.crm}</td>
                                                <td className="tabela-medico-body_dado">{element.idEspecialidadeNavigation}</td>
                                                <td className="tabela-medico-body_dado">{element.idClinicaNavigation}</td>
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
                                <label htmlFor=""><input className="formulario-medico__item" type="text" value={this.state.idUsuario} onChange={this.atualizaEstadoidUsuario.bind(this)} placeholder="Nome/ID do Usuário" required /></label>
                                <label htmlFor=""><input className="formulario-medico__item" type="text" value={this.state.crm} onChange={this.atualizaEstadoCrm.bind(this)} placeholder="RG" required /></label>
                                <label htmlFor=""><input className="formulario-medico__item" type="text" value={this.state.idEspecialidade} onChange={this.atualizaEstadoidEspecialidade.bind(this)} placeholder="CPF" required /></label>
                                <label htmlFor=""><input className="formulario-medico__item" type="text" value={this.state.idClinica} onChange={this.atualizaEstadoidClinica.bind(this)} placeholder="Data de Nascimento" required /></label>
                                <button type="submit" className="formulario-medico__button">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}