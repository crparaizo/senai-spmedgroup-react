import React, { Component } from "react";
// import Axios from 'axios';
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
        localStorage.removeItem('usuario-spmedgroup');
        window.location.reload();
    }

    buscarEspecialidades() {

        apiService
            .call("especialidades")
            .getAll()

            // Axios.get('http://192.168.3.151:5000/api/especialidades', {
            //     headers: {
            //         Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
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
        this.setState({ inputBusca: event.target.value });
        this.buscarEspecialidadeItem() //Serve para filtrar no mesmo momento que vai
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
                //         Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                //         "Content-Type": "application/json"
                //     }
                // })

                .then(res => {
                    this.buscarEspecialidades()
                })

        } else {
            //this.setState({ erroMensagem: 'Especialidade já cadastrada!' })
            this.setState({ erroMensagem: alert('Especialidade já cadastrada! Tente outro nome!') })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.buscarEspecialidadeItem.bind(this)}>
                    <label>
                        <input
                            placeholder="Busque!"
                            type="text"
                            value={this.state.inputBusca}
                            onChange={this.atualizaEstadoBusca.bind(this)}
                        />
                    </label>
                    <label for="">
                        <input class="btn-new" value="Filtrar" type="submit" id="submitBtn" name="submit" />
                    </label>
                </form>

                <section className="lista_completa">
                    <table>
                        <thead>
                            <tr>
                                <th>ID - Especialidade</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listaEspecialidadesFiltrada.map(element => {
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

                {/* <p className="text__login" style={{ color: 'red', textAlign: 'center' }}>{this.state.erroMensagem}</p> */}
            </div>
        )
    }
}