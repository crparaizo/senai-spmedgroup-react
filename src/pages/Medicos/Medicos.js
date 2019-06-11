import React, { Component } from "react";
import Axios from 'axios';
import apiService from "../../services/apiService";
import './Medicos.css';

import ListaMedicos from '../../components/Lista/ListaMedicos';

export default class ListarCadastrarMedico extends Component {
    constructor() {
        super();

        this.state = {
            idmedico: "",
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

    atualizaEstadoidmedico(event) {
        this.setState({ idmedico: event.target.value });
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
                x.nome.toLowerCase().includes(this.state.inputBusca.toLowerCase())
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
        //     idmedico: this.state.idmedico,
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
                    idmedico: this.state.idmedico,
                    crm: this.state.crm,
                    idEspecialidade: this.state.idEspecialidade,
                    idClinica: this.state.idClinica
                })
                .then(res => {
                    this.call("medicos")
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
                                    placeholder="Busque! - nome e email"
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
                                    <li className="links-medico__item"><a className="links-medico__titulo" href="clinicas">Clínicas</a></li>
                                    <div className="links-medico__quebra"></div>
                                    <li className="links-medico__item"><a className="links-medico__titulo" href="medicos">Médicos</a></li>
                                    <div className="links-medico__quebra"></div>
                                    <li className="links-medico__item"><a className="links-medico__titulo links-medico__titulo--selecionado"
                                        href="medicos">Usuários</a></li>
                                    <div className="links-medico__quebra"></div>
                                    <li className="links-medico__item"><a className="links-medico__titulo" href="/especialidades">Especialidades</a></li>
                                    <div className="links-medico__quebra"></div>
                                </ul>
                            </nav>
                        </div>
                        <a className="menu-medico__link" onClick={this.logout.bind(this)} href="/">Sair</a>
                    </div>
                </aside>


                <ListaMedicos lista={this.state.listaMedicos} />

                {/* <table>
                    <thead>
                        <tr>
                            <th>ID - Médico</th>
                            <th>ID - Usuário</th>
                            <th>CRM</th>
                            <th>ID - Especialidade</th>
                            <th>ID- Clínica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaMedicos.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.idmedico}</td>
                                    <td>{element.crm}</td>
                                    <td>{element.idEspecialidade}</td>
                                    <td>{element.idClinica}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table> */}

                <form onSubmit={this.cadastrarMedico.bind(this)} noValidate>
                    <input type="text" value={this.state.idmedico} onChange={this.atualizaEstadoidmedico.bind(this)} placeholder="ID -usuário" required />
                    <input type="text" value={this.state.crm} onChange={this.atualizaEstadoCrm.bind(this)} placeholder="crm" required />
                    <input type="text" value={this.state.idEspecialidade} onChange={this.atualizaEstadoidEspecialidade.bind(this)} placeholder="ID - especialidade" required />
                    <input type="text" value={this.state.idClinica} onChange={this.atualizaEstadoidClinica.bind(this)} placeholder="Id - clinica" required />
                    <button type="submit"> Cadastrar </button>
                </form>
            </div>
        )
    }
}