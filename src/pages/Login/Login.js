import React, { Component } from 'react';
import Axios from 'axios';
import { parseJwt } from '../../services/auth';
// import { Link } from 'react-router-dom'; //Pra que usar isso?
import '../../assets/css/login.css';

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



        Axios.post("http://localhost:5000/api/login", {
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
                    if (decodificado.tipoUsuario == "Administrador") {
                        this.props.history.push("/adm/adm"); //Mudar rota  //Página que irá redirecionar -> consultas
                    } else if (decodificado.tipoUsuario == "Médico") {
                        this.props.history.push("/medico"); //Mudar rota
                    } else {
                        this.props.history.push("/paciente"); //Mudar rota
                    }
                }
            })

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
                {/* <!-- Página de Login --> */}
                <header>
                    <div className="quebra_especial"></div>
                    <h1>Login</h1>
                    <div className="quebra"></div>
                </header>
                <main>
                    <div className="conteudo">
                        <div className="sem_cadastro">
                            {/* <!--Colocar um retãngulo(div) fora para colorir--> */}
                            <h2>Ainda não tem cadastro?</h2>
                            <div className="retangulo_dentro">
                                <h3>Entre em contato!</h3>

                                <form >
                                    {/* onSubmit={this.cadastrarUsuario.bind(this)} */}

                                    <div>
                                        <input type="text" placeholder="Insira seu nome..." />
                                        {/* value={this.state.nomeCadastro} onChange={this.atualizaEstadoNomeCadastro.bind(this)} */}
                                        <div>
                                            <input type="text" placeholder="Insira seu email..." />
                                            {/* value={this.state.emailCadastro} onChange={this.atualizaEstadoEmailCadastro.bind(this)}  */}
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Insira sua senha..." />
                                            {/* value={this.state.senhaCadastro} onChange={this.atualizaEstadoSenhaCadastro.bind(th is)} */}
                                        </div>
                                        <div>
                                            <br />
                                            <textarea placeholder="Descreva o motivo da sua solicitação de contato..." name="" id=""
                                                cols="30" rows="10"></textarea>
                                            {/* value={this.state.descricaoCadastro} onChange={this.atualizaEstadoDescricaoCadastro.bind(this)}  */}
                                        </div>
                                        <button className="button" type="submit">Enviar</button>
                                    </div>

                                </form>

                            </div>

                            <form onSubmit={this.efetuaLogin.bind(this)}>

                                <div className="com_cadastro">
                                    <h2>Já tem cadastro?</h2>
                                    <p className="text__login" style={{ color: 'red', textAlign: 'center' }}>{this.state.erroMensagem}</p>
                                    <div>
                                        <input value={this.state.email} onChange={this.atualizaEstadoEmail.bind(this)} type="text" placeholder="Insira seu nome..." />
                                    </div>
                                    <div>
                                        <input value={this.state.senha} onChange={this.atualizaEstadoSenha.bind(this)} type="text" placeholder="Insira seu email..." />
                                    </div>
                                    <button className="button" type="submit">Entrar</button>
                                </div>

                            </form>

                        </div>
                    </div>
                </main>
            </div>
        )
    };
}
