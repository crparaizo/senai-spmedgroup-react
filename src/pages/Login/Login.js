import React, { Component } from 'react';
import Axios from 'axios';
// import { parseJwt } from '../../services/auth';
// import { Link } from 'react-router-dom'; //Pra que usar isso?
import './Login.css';
import apiService from "../../services/apiService";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            //Login
            email: '',
            senha: '',
            erroMensagem: ''
            //Cadastro
            // nomeCadastro: '',
            // emailCadastro: '',
            // senhaCadastro: '',
            // descricaoCadastro: ''
        }
    }

    //Cadastro

    // atualizaEstadoNomeCadastro(event) {
    //     this.setState({ nomeCadastro: event.target.value });
    // }

    // atualizaEstadoEmailCadastro(event) {
    //     this.setState({ emailCadastro: event.target.value });
    // }

    // atualizaEstadoSenhaCadastro(event) {
    //     this.setState({ senhaCadastro: event.target.value });
    // }

    // atualizaEstadoDescricaoCadastro(event) {
    //     this.setState({ descricaoCadastro: event.target.value });
    // }


    // cadastrarUsuario(event) {
    //     event.preventDefault();

    //     let usuario = {
    //         nomeCadastro: this.state.nomeCadastro,
    //         emailCadastro: this.state.emailCadastro,
    //         senhaCadastro: this.state.senhaCadastro,
    //         descricaoCadastro: this.state.descricaoCadastro
    //     };

    //     Axios.post('http://localhost:5000/api/usuarios', usuario
    //     )

    //     console.log(usuario);
    // }

    //Login

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    efetuaLogin(event) {
        event.preventDefault();

        // alert(this.state.email + " - " + this.state.senha);

        apiService
            .call("login")
            .create({
                email: this.state.email,
                senha: this.state.senha
            })
            .then(data => {
                if (data.status === 200) {
                    console.log(data);
                    localStorage.setItem("usuario-spmedgroup", data.data.token); //Gravar o token

                    let jwtDecode = require('jwt-decode'); // Importando framework

                    let decodificado = jwtDecode(localStorage.getItem("usuario-spmedgroup")); // Decodificando token
                    console.log("decodificado");
                    console.log(decodificado);

                    //Verifica o tipo de usuário e redireciona para a página default
                    if (decodificado.tipoUsuario === "Administrador") {
                        this.props.history.push("/consultas"); //Mudar rota  //Página que irá redirecionar -> consultas
                    } else if (decodificado.tipoUsuario === "Médico") {
                        this.props.history.push("/consultas"); //Mudar rota
                    } else {
                        this.props.history.push("/consultas"); //Mudar rota
                    }
                }
            })



            // Axios.post("http://192.168.3.151:5000/api/login", { THIS
            //     email: this.state.email,
            //     senha: this.state.senha
            // })
            //     .then(data => {
            //         if (data.status === 200) {
            //             console.log(data);
            //             localStorage.setItem("usuario-spmedgroup", data.data.token); //Gravar o token

            //             let jwtDecode = require('jwt-decode'); // Importando framework

            //             let decodificado = jwtDecode(localStorage.getItem("usuario-spmedgroup")); // Decodificando token
            //             console.log("decodificado");
            //             console.log(decodificado);

            //             //Verifica o tipo de usuário e redireciona para a página default
            //             if (decodificado.tipoUsuario === "Administrador") {
            //                 this.props.history.push("/consultas"); //Mudar rota  //Página que irá redirecionar -> consultas
            //             } else if (decodificado.tipoUsuario === "Médico") {
            //                 this.props.history.push("/consultas"); //Mudar rota
            //             } else {
            //                 this.props.history.push("/consultas"); //Mudar rota
            //             }
            //         }
            //     })

            // .then(data => {
            //     if (data.status === 200) {
            //         console.log(data);
            //         localStorage.setItem("usuario-spmedgroup", data.data.token);
            //         //Verifica o tipo de usuário e redireciona para a página default
            //         console.log(parseJwt().Role);
            //         if (parseJwt().Role == "Administrador") {
            //             this.props.history.push("/adm/adm"); //Mudar rota  //Página que irá redirecionar -> consultas
            //         } else if (parseJwt().Role == "Medico") {
            //             this.props.history.push("/medico"); //Mudar rota
            //         } else {
            //             this.props.history.push("/paciente"); //Mudar rota
            //         }
            //     }
            // })

            .catch(erro => {
                this.setState({ erroMensagem: 'E-mail ou senha inválido' });
            })
    }

    render() {
        return (
            <div>

                <header>
                    <div className="login__header">
                        <div className="topo__quebra"></div>
                        <h1 className="topo__h1">Login</h1>
                        <div className="topo__quebra"></div>
                    </div>
                </header>

                <main>
                    <div className="formularios">
                        <div className="elemento-formulario elemento-formulario--modificado-um">
                            <h2 className="elemento-formulario__h2">Ainda não tem cadastro?</h2>
                            <h3 className="elemento-formulario__h3">Entre em contato!</h3>
                            <label htmlFor="">
                                <input className="elemento-formulario__item" type="text" placeholder="Insira seu nome..." />
                            </label>
                            <label htmlFor="">
                                <input className="elemento-formulario__item" type="text" placeholder="Insira seu email..." />
                            </label>
                            <label htmlFor="">
                                <input className="elemento-formulario__item" type="password" placeholder="Insira sua senha..." />
                            </label>
                            <textarea className="elemento-formulario__item elemento-formulario__item--textearea"
                                placeholder="Descreva o motivo da sua solicitação de contato..." name="" id="" cols="30"
                                rows="10"></textarea>
                            <button className="elemento-formulario__item elemento-formulario__item--button" type="submit">Enviar</button>
                        </div>

                        {/* <!-- <div className="imagem-formulario">
                <img className="imagem-formulario__item" src="img/icon-login.png" alt="">
            </div> --> */}

                        <form onSubmit={this.efetuaLogin.bind(this)}>

                            <div className="elemento-formulario elemento-formulario--modificado-dois">
                                <h2 className="elemento-formulario__h2">Já tem cadastro?</h2>
                                <p className="text__login" style={{ color: 'red', textAlign: 'center' }}>{this.state.erroMensagem}</p>
                                <label htmlFor="">
                                    <input value={this.state.email} onChange={this.atualizaEstadoEmail.bind(this)} className="elemento-formulario__item" type="text" placeholder="Insira seu email..." />
                                </label>
                                <label htmlFor="">
                                    <input value={this.state.senha} onChange={this.atualizaEstadoSenha.bind(this)} className="elemento-formulario__item" type="password" placeholder="Insira seu senha..." />
                                </label>
                                <button className="elemento-formulario__item elemento-formulario__item--button" type="submit">Entrar</button>
                            </div>
                        </form>
                    </div>
                </main>

            </div>
        )
    };
}
