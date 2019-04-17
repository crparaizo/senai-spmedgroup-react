import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarEspecialidade extends Component {
    constructor() {
        super();

        this.state = {
            nome: "",
            listaEspecialidades: [],

            nomeBuscaEspecialidade: "", //Buscar especialidade por nome
            listaResultadoNome: [],
            listaFiltradaNome: [],

            idBuscaEspecialidade: "", //Busca especialidade por ID
            listaResultadoId: [],
            listaFiltradaId: [],

        }
    }

    buscarEspecialidades() {
        Axios.get('http://localhost:5000/api/especialidades', {
            // http://192.168.56.1:5000/api/especialidades - IP do pc do Senai  
            // http://191.180.47.145:5000/api/especialidades - IP do pc de Casa 
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                const especialidades = res.data;
                this.setState({ listaEspecialidades: especialidades })

                this.setState({ listaResultadoNome: especialidades }) //Especialidade por Nome
                this.setState({ listaFiltradaNome: especialidades })

                this.setState({ listaResultadoId: especialidades }) //Especialidade por ID
                this.setState({ listaFiltradaId: especialidades })
            })
    }

    componentDidMount() {
        this.buscarEspecialidades();
    }

    atualizaEstadoNome(event) {
        this.setState({ nome: event.target.value });
    }

    //Nome -> Busca

    buscarPorNomeEspecialidade(event) {
        event.preventDefault();

        let nome = this.state.nomeBuscaEspecialidade;
        let _listaFiltrada = [];

        if (nome == "" || nome == null) {
            _listaFiltrada = this.state.listaResultadoNome;
        } else { // Lambda: primeiro "nome" -> nome da coluna da lista que eu fiz, segundo "nome" -> let que eu criei
            _listaFiltrada = this.state.listaResultadoNome.filter(x => x.nome.includes(nome).ignoreCase);
        }

        console.log(_listaFiltrada);
        this.setState({ listaFiltradaNome: _listaFiltrada });
    }

    atualizaEstadoNomeEspecialidade(event) {
        this.setState({ nomeBuscaEspecialidade: event.target.value });
    }

    //Id -> Busca

    buscarPorIdEspecialidade(event) {
        event.preventDefault();

        let id = this.state.idBuscaEspecialidade;
        let _listaFiltrada = [];

        if (id == "" || id == null) {
            _listaFiltrada = this.state.listaResultadoId;
        } else {
            _listaFiltrada = this.state.listaResultadoId.filter(x => x.idBuscaEspecialidade == id);
        }

        console.log(_listaFiltrada);
        this.setState({ listaFiltradaId: _listaFiltrada });
    }

    atualizaEstadoIdEspecialidade(event) {
        this.setState({ idBuscaEspecialidade: event.target.value });
    }



    cadastrarEspecialidade(event) {
        event.preventDefault();

        let especialidade = {
            nome: this.state.nome
        };

        Axios.post('http://localhost:5000/api/especialidades', especialidade, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                this.buscarEspecialidades()
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.buscarPorNomeEspecialidade.bind(this)}>
                    <label>
                        <input
                            placeholder="Insira o nome de uma especialidade"
                            type="text"
                            value={this.state.nomeBuscaEspecialidade}
                            onChange={this.atualizaEstadoNomeEspecialidade.bind(this)}
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
                        {this.state.listaFiltradaNome.map(function (listado) {
                            return (
                                <tr key={listado.id}>
                                    <td>{listado.id}</td>
                                    <td>{listado.nome}</td>
                                </tr>
                            );
                        })}
                    </table>
                </section>
                <form onSubmit={this.buscarPorIdEspecialidade.bind(this)}>
                    <label>
                        <input
                            placeholder="Insira o id de uma especialidade"
                            type="text"
                            value={this.state.idBuscaEspecialidade}
                            onChange={this.atualizaEstadoIdEspecialidade.bind(this)}
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
                        {this.state.listaFiltradaId.map(function (listado) {
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
                                <th>ID - Especialidade</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listaEspecialidades.map(element => {
                                return (
                                    <tr key={element.id}>
                                        <td>{element.id}</td>
                                        <td>{element.nome}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}