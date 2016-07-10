import React from 'react'
import { Map, List } from 'immutable'
import socket from 'socket.io-client'

import Header from './Header'
import TextList from './TextList'

require('./App.css')

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: Map({
        query: null,
        categories: List([
          {
            key: 0,
            name: 'Transporte',
            keywords: 'onibus,busao,transito,carro,moto,rodovia,estrada,acidente,trafego,engarrafamento'
          },
          {
            key: 1,
            name: 'Educação',
            keywords: 'universidade,escola,aluno,professor,prof,aula,prova,ensino'
          },
          {
            key: 2,
            name: 'Lazer',
            keywords: '"lugar bonito",viagem,passeio,praia,passear,trilha,trip,verao,"foi divertido",visitar,visita,visite,conheça,rodoviaria'
          },
          {
            key: 3,
            name: 'Segurança pública',
            keywords: 'assalto,roubo,assaltado,roubado,bandido,ladrao,sequestro,marginal'
          },
          {
            key: 4,
            name: 'Saúde',
            keywords: 'gripe,chicungunha,denge,zika,resfriado,infarto,infarte,derrame,avg,doente,doença,dodoi,hospital,"posto de saude",postinho,uti,hospitalizado,febre,"dor no corpo",upa'
          }
        ]),
        texts: List()
      })
    };

    this.init();
  }

  init() {
    this.socket = socket('http://localhost:8090');
    this.socket.on('data', this.addDataToState.bind(this));
    this.socket.on('query', this.setQueryToState.bind(this));
  }

  addDataToState(data) {
    if (this.state.data.get('texts').size > 50)
      return;

    data.sending = false;
    const texts = this.state.data.get('texts').push(data);
    const newData = this.state.data.set('texts', texts);
    this.setState({ data: newData });
  }

  setQueryToState(query) {
    this.setState({ data: this.state.data.set('query', query) });
  }

  render() {
    return (
      <div className="app">
        <main>
          <div className="container">
            <h3>In which category does the text fits most?</h3>

            <TextList
              data={this.state.data.get('texts').slice(0, 10)}
              categories={this.state.data.get('categories')}
              onClassificate={this.handleTextClassificate.bind(this)}
              onRemove={this.handleTextRemove.bind(this)} />

            {this.renderLoadIndicator()}
          </div>
        </main>
      </div>
    )
  }

  handleTextClassificate(dataIndex, data, category) {
    this.socket.emit('classificate', data, category, () => {
      const newData = this.removeTextFromList(dataIndex);
      this.setState({ data: newData });
    });

    const texts = this.state.data.get('texts').update(dataIndex, row => {
      row.sending = true;
      return row;
    });
    const newData = this.state.data.set('texts', texts);
    this.setState({ data: newData });
  }

  removeTextFromList(dataIndex) {
    const texts = this.state.data.get('texts').splice(dataIndex, 1);
    const newData = this.state.data.set('texts', texts);
    return newData;
  }

  handleTextRemove(dataIndex) {
    const newData = this.removeTextFromList(dataIndex);
    this.setState({ data: newData });
  }

  renderLoadIndicator() {
    if (this.state.data.get('texts').size >= 50)
      return;

    return <p className="text-center"><span className="fa fa-spinner fa-spin fa-2x"></span></p>;
  }
}

