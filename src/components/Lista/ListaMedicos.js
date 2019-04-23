import React, { Component } from 'react'

class ListaMedicos extends Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID - Médico</th>
                        <th>ID - Usuário</th>
                        <th>CRM</th>
                        <th>ID - Especialidade</th>
                        <th>ID- Clínica</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.lista.map(element => {
                        return (
                            <tr key={element.id}>
                                <td>{element.id}</td>
                                <td>{element.idUsuario}</td>
                                <td>{element.crm}</td>
                                <td>{element.idEspecialidade}</td>
                                <td>{element.idClinica}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default ListaMedicos;