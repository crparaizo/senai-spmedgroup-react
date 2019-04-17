import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarEspecialidade extends Component {
    constructor() {
        super();

        this.state = {
            nome: "",
            listaEspecialidades: []
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
            })
    }

    componentDidMount() {
        this.buscarEspecialidades();
    }

    atualizaEstadoNome(event) {
        this.setState({ nome: event.target.value });
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
            </div>
        )
    }
}