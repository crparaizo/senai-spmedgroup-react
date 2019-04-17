import React, { Component } from "react";
import Axios from 'axios';
import apiService from "../../services/apiService";

export default class ListarCadastrarConsulta extends Component {
    constructor() {
        super();

        this.state = {
            idProntuario: "",
            idMedico: "",
            dataHoraConsulta: "",
            idSituacao: "",
            descricao: "",
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
        this.setState({ idSituacao: event.target.value });
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
            idSitucao: this.state.idSituacao,
            descricao: this.state.descricao
        };

        Axios.post('http://localhost:5000/api/consultas', consulta, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('usuario-spmedgroup'),
                "Content-Type": "application/json"
            }

        });

        console.log(consulta);

    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID - Consulta</th>
                            <th>ID - Prontuário</th>
                            <th>ID - Médico</th>
                            <th>Data Consulta</th>
                            <th>ID- Situação</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaConsultas.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.idProntuario}</td>
                                    <td>{element.idMedico}</td>
                                    <td>{element.dataHoraConsulta}</td>
                                    <td>{element.idSituacao}</td>
                                    <td>{element.descricao  ? element.descricao : 'Vazia'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}