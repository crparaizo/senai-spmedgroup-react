import React, { Component } from 'react';
import Axios from 'axios';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: ''
        }
    }

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    efetuaLogin(event) {
        event.preventDefault();

        // alert(this.state.email + " - " + this.state.senha);

        Axios.post('http://localhost:5000/api/login', {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(data => {
                localStorage.setItem("usuario-spmedgroup", data.data.token);
                this.props.history.push('/consultas'); //Página que irá redirecionar
                console.log(data);
            })
            .catch(erro => {
                console.log(erro);
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