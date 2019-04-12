import React, { Component } from "react";
import Axios from 'axios';

export default class ListarCadastrarClinica extends Component {
    constructor() {
        super();

        this.state = {
            nomeFantasia: "",
            horarioFuncionamento: "",
            cnpj: "",
            razaoSocial: "",
            endereco: "",
            medicos: "",
            listaClinicas: []
        }
    }
}