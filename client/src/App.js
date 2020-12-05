import React, { Component } from 'react'
import api from './server'


class App extends Component {
  /**
   * DEFININDO O ESTADO PARA RECEBER OS DADOS
   */
  state = {
    data: []
  }

  /**
   * CONFIGURAÇÃO DE ACESSO AO DOM   * 
   */

  async componentDidMount() {
    const response = await api.get('/')
    this.setState({ data: response.data })
  }

  render() {
    const { data } = this.state
    console.log(data)
    return (
      <div>
        <h1>Listar Artigos</h1>
        <ul>
          {data.map(data => (
            <li key={data._id}>
              <h2>Ttitulo: {data.tittle}</h2>
              <p>Conteudo: {data.content}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App;
