import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarConsulta extends Component {
    constructor() {
        super();

        this.state = {
            idProntuario: "",
            idMedico: "",
            dataHoraConsulta: "",
            idSitucao: "",
            descricao: "",
            listaConsultas: []
        }
    }

    buscarEspecialidades() {
        Axios.get('http://localhost:5000/api/consultas')
            // http://192.168.56.1:5000/api/consultas - IP do pc do Senai  
            // http://191.180.47.145:5000/api/consultas - IP do pc de Casa         
            .then(res => {
                const consultas = res.data;
                this.setState({ listaConsultas: consultas })
            })
    }

    componentDidMount() {
        this.buscarConsultas();
    }

    atualizaEstadoidProntuario(event) {
        this.setState({ idProntuario: event.target.value });
    }
    atualizaEstadoidMedico(event) {
        this.setState({ idMedico: event.target.value });
    }
    atualizaEstadoData(event) {
        this.setState({ dataHoraConsulta: event.target.value });
    }
    atualizaEstadoidSituacao(event) {
        this.setState({ idSitucao: event.target.value });
    }
    atualizaEstadoDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    cadastrarConsulta(event) {
        event.preventDefault();

        let consulta = {
            idProntuario: this.state.idProntuario,
            idMedico: this.state.idMedico,
            dataHoraConsulta: this.state.dataHoraConsulta,
            idSitucao: this.state.idSitucao,
            descricao: this.state.descricao
        };

        Axios.post('http://localhost:5000/api/consultas', consulta, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                this.buscarConsultas()
            })
    }

    render() {
        return (
            <div>
                {/* Falta HTML.... */}
            </div>
        )
    }
}