import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarMedico extends Component {
    constructor() {
        super();

        this.state = {
            idUsuario: "",
            crm: "",
            listaCrm: [],
            idEspecialidade: "",
            listaEspecialidade: [],
            idClinica: "",
            listaClinicas: [],
            listaMedicos: [],
            listaConsultas: []
        }
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
    }

    componentDidMount() {
        this.buscarMedicos();
    }

    atualizaEstadoNome(event) {
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

    atualizaEstadoNidClinica(event) {
        this.setState({ idClinica: event.target.value });
    }


    cadastrarMedico(event) {
        event.preventDefault();

        let medico = {
            idUsuario: this.state.idUsuario,
            crm: this.state.crm,
            idEspecialidade: this.state.idEspecialidade,
            idClinica: this.state.idClinica
        };

        Axios.post('http://localhost:5000/api/medicos', medico, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }
        })
    }

    render() {
        return (
            <div>
                <tbody>
                    {this.state.listaMedicos.map(element => {
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