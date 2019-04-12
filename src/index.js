import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App'; //Mudar a rota

import ListarCadastrarClinica from './pages/Clinicas/Clinicas';
import Login from './pages/Login/Login';
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada';

// import ListarCadastrarEspecialidade from './pages/Clinicas/Especialidades';
// import ListarCadastrarUsuario from './pages/Clinicas/Usuarios';
// import ListarCadastrarMedico from './pages/Clinicas/Medicos';
// import ListarCadastrarProntuario from './pages/Clinicas/Prontuarios';
// import ListarCadastrarConsulta from './pages/Consultas/Consultas';

import { usuarioAutenticado } from './services/auth';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
// {/*css modules, styled components, BEM */ }

const Permissao = ({ component: Component }) => (
    //convertendo que se está acessando (component do Switch)           
    <Route
        render={props => usuarioAutenticado() ? //Operador ternário
            (<Component {...props} />) :
            (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
        }
    />
);

const rotas = (
    <Router>
        <div>
            <Switch>
                {/*Permissao*/}
                <Route exact path="/" component={App} />
                <Route path="/clinicas" component={ListarCadastrarClinica} />
                <Route path="/login" component={Login} />
                {/* <Route path="/especialidades" component={Especialidades} />
                <Route path="/usuarios" component={Usuarios} />
                <Route path="/medicos" component={Medicos} />
                <Route path="/prontuarios" component={Prontuarios} />
                <Route path="/consultas" component={Consultas} /> */}
                <Route component={NaoEncontrada} /> {/* Esse é o default do Switch, nenhuma outra Route será lida dps disso */}
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root')); // Acrescentar rotas aqui!

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
