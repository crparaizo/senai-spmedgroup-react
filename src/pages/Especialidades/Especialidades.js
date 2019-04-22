import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarEspecialidade extends Component {
    constructor() {
        super();

        this.state = {
            nome: "",
            listaEspecialidades: [],
            listaEspecialidadesFiltrada: [],
            nomeBuscaEspecialidade: "", //Buscar especialidade por nome
            idBuscaEspecialidade: "", //Busca especialidade por ID
        }
    }

    componentDidMount() {
        this.buscarEspecialidades();
    }

    //Listar especialidades
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
                this.setState({ listaEspecialidadesFiltrada: especialidades })

            })
    }

    atualizaEstadoNome(event) {
        this.setState({ nome: event.target.value });
    }

    atualizaEstadoNomeEspecialidade(event) {
        this.setState({ nomeBuscaEspecialidade: event.target.value });
        this.buscarPorNomeEspecialidade() //Serve para filtrar no mesmo momento que vai
    }


    //Nome -> Busca
    buscarPorNomeEspecialidade() {
        let nome = this.state.nomeBuscaEspecialidade;

        let _listaFiltrada = [];

         // Lambda: primeiro "nome" -> nome da coluna da lista que eu fiz, segundo "nome" -> let que eu criei
            _listaFiltrada = this.state.listaEspecialidades.filter(x => x.nome.toLowerCase().includes(nome.toLowerCase()));
            //x => x.nome.toLowerCase() == nome.toLowerCase() //Filtra a palavra inteira em lower case
            //x => x.nome.toLowerCase().includes(nome.toLowerCase()) //Filtra por letras que tem igual na lista
        

        // console.log(_listaFiltrada);
        this.setState({ listaEspecialidadesFiltrada: _listaFiltrada });
    }

    atualizaEstadoIdEspecialidade(event) {
        this.setState({ idBuscaEspecialidade: event.target.value });
    }

    //Id -> Busca
    buscarPorIdEspecialidade(event) {
        event.preventDefault();

        this.setState({ listaEspecialidadesFiltrada: this.listaEspecialidades });

        let id = this.state.idBuscaEspecialidade;
        let _listaFiltrada = [];

        if (id == "" || id == null) {
            _listaFiltrada = this.state.listaEspecialidades;
        } else {
            _listaFiltrada = this.state.listaEspecialidadesFiltrada.filter(x => x.id == id);
        }

        // console.log(_listaFiltrada);
        this.setState({ listaEspecialidadesFiltrada: _listaFiltrada });
    }

    


    //Sessão cadastro

    cadastrarEspecialidade(event) {
        event.preventDefault();

        if (this.state.listaEspecialidades.map(x => x.nome).indexOf(this.state.nome) === -1) { //Condição para array de objeto (para array de elementos é diferente e mais simples)
            let especialidade = {
                nome: this.state.nome
            }

            Axios.post('http://localhost:5000/api/especialidades', especialidade, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                    "Content-Type": "application/json"
                }
            }).then(res => {
                this.buscarEspecialidades()
            })
        } else {
            this.setState({ erroMensagem: 'Especialidade já cadastrada' })
        }

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
                        {this.state.listaEspecialidadesFiltrada.map(function (listado) {
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
                        {this.state.listaEspecialidadesFiltrada.map(function (listado) {
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

                <form onSubmit={this.cadastrarEspecialidade.bind(this)} noValidate>
                    <input type="text" value={this.state.nome} onChange={this.atualizaEstadoNome.bind(this)} placeholder="nome da especialidade" required />
                    <button type="submit"> Cadastrar </button>
                </form>

                <p className="text__login" style={{ color: 'red', textAlign: 'center' }}>{this.state.erroMensagem}</p>

            </div>
        )
    }
}