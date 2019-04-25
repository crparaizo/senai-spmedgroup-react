import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarClinica extends Component {
    constructor() {
        super();

        this.state = {
            nomeFantasia: "", //Filtro do Filtro
            horarioFuncionamento: "", //Filtro do Filtro
            cnpj: "",
            razaoSocial: "", //Filtro do Filtro
            endereco: "", //Filtro do Filtro
            listaClinicas: [],

            cnpjBuscaClinica: "", //Buscar especialidade por cnpj
            listaResultadocnpj: [],
            listaFiltradacnpj: [],

            idBuscaClinica: "", //Busca especialidade por ID
            listaResultadoId: [],
            listaFiltradaId: []
        }
    }

    //Listar consultas
    buscarClinicas() {
        Axios.get('http://localhost:5000/api/clinicas', {
            // http://192.168.56.1:5000/api/especialidades - IP do pc do Senai  
            // http://191.180.47.145:5000/api/especialidades - IP do pc de Casa 
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                const clinicas = res.data;
                this.setState({ listaClinicas: clinicas })

                this.setState({ listaResultadocnpj: clinicas })
                this.setState({ listaFiltradacnpj: clinicas })

                this.setState({ listaResultadoId: clinicas })
                this.setState({ listaFiltradaId: clinicas })
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

    //CNPJ -> Busca

    buscarPorcnpj() {
        //event
        //event.preventDefault();

        let cnpj = this.state.cnpjBuscaClinica;
        let _listaFiltrada = [];

        if (cnpj == "" || cnpj == null) {
            _listaFiltrada = this.state.listaResultadocnpj;
        } else { // Lambda: primeiro "nome" -> nome da coluna da lista que eu fiz, segundo "nome" -> let que eu criei
            _listaFiltrada = this.state.listaResultadocnpj.filter(x => x.cnpj.toLowerCase().includes(cnpj.toLowerCase()));
            //x => x.nome.toLowerCase() == nome.toLowerCase() //Filtra a palavra inteira em lower case
            //x => x.nome.toLowerCase().includes(nome.toLowerCase()) //Filtra por letras que tem igual na lista
        }

        // console.log(_listaFiltrada);
        this.setState({ listaFiltradacnpj: _listaFiltrada });
    }

    atualizaEstadoDocnpj(event) {
        this.setState({ cnpjBuscaClinica: event.target.value });
        this.buscarPorcnpj() //Serve para filtrar no mesmo momento que vai
    }

    //Id -> Busca

    buscarPorIdClinica(event) {
        event.preventDefault();

        let id = this.state.idBuscaClinica;
        let _listaFiltrada = [];

        if (id == "" || id == null) {
            _listaFiltrada = this.state.listaResultadoId;
        } else {
            _listaFiltrada = this.state.listaResultadoId.filter(x => x.id == id);
        }

        // console.log(_listaFiltrada);
        this.setState({ listaFiltradaId: _listaFiltrada });
    }

    atualizaEstadoIdClinica(event) {
        this.setState({ idBuscaClinica: event.target.value });
    }


    //Sessão cadastro

    cadastrarClinica(event) {
        event.preventDefault();

        if (this.state.listaClinicas.map(x => x.cnpj).indexOf(this.state.cnpj) === -1) {

            let clinica = {
                nomeFantasia: this.state.nomeFantasia,
                horarioFuncionamento: this.state.horarioFuncionamento,
                cnpj: this.state.cnpj,
                razaoSocial: this.state.razaoSocial,
                endereco: this.state.endereco
            };

            Axios.post('http://localhost:5000/api/clinicas', clinica, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    this.buscarClinicas()
                })
        } else {
            this.setState({ erroMensagem: 'CNPJ já cadastrada' })
        }
    }

    render() {
        return (
            <div>
                {/* Habilitar inputs e fazer função para liberar e desabilitar o outro */}

                <form onSubmit={this.buscarPorcnpj.bind(this)}>
                    <label>
                        <input
                        disabled
                            placeholder="Insira o cnpj de uma clínica"
                            type="text"
                            value={this.state.cnpjBuscaClinica}
                            onChange={this.atualizaEstadoDocnpj.bind(this)}
                        />
                    </label>
                    <label for="">
                        <input class="btn-new" value="Filtrar" type="submit" id="submitBtn" name="submit" />
                    </label>
                </form>
                <section className="busca_nome_busca">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>
                        {this.state.listaClinicas.map(function (listado) {
                            return (
                                <tr key={listado.id}>
                                    <td>{listado.id}</td>
                                    <td>{listado.nome}</td>
                                </tr>
                            );
                        })}
                    </table>
                </section>
                <form onSubmit={this.buscarPorIdClinica.bind(this)}>
                    <label>
                        <input
                        disabled
                            placeholder="Insira o id de uma clínica"
                            type="text"
                            value={this.state.idBuscaClinica}
                            onChange={this.atualizaEstadoIdClinica.bind(this)}
                        />
                    </label>
                    <label for="">
                        <input class="btn-new" value="Filtrar" type="submit" id="submitBtn" name="submit" />
                    </label>
                </form>
                <section className="id_busca_id">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>
                        {this.state.listaClinicas.map(function (listado) {
                            return (
                                <tr key={listado.id}>
                                    <td>{listado.id}</td>
                                    <td>{listado.nome}</td>
                                </tr>
                            );
                        })}
                    </table>
                </section>

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
                            {this.state.listaClinicas.map(element => {
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