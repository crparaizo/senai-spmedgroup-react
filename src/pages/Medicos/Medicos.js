import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarMedico extends Component {
    constructor() {
        super();

        this.state = {
            idUsuario: "",
            crm: "",
            idEspecialidade: "",
            clinica: "",
            idClinica: "",
            listaCrm: [],
            especialidade: "",
            listaEspecialidade: [],
            listaMedicos: []
        }
    }

    buscarMedicos() {
        Axios.get('http://localhost:5000/api/medicos')
            // http://192.168.56.1:5000/api/medicos - IP do pc do Senai  
            // http://191.180.47.145:5000/api/medicos - IP do pc de Casa         
            .then(res => {
                const medicos = res.data;
                this.setState({ listaCrm: medicos })
            })
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
            .then(res => {
                this.buscarMedicos()
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