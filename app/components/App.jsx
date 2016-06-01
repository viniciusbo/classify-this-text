import React from 'react'
import { Map, List, fromJS } from 'immutable'
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
            name: 'Transporte'
          },
          {
            key: 1,
            name: 'Qualidade de vida'
          },
          {
            key: 2,
            name: 'Eventos'
          },
          {
            key: 3,
            name: 'Educação'
          },
          {
            key: 4,
            name: 'Turismo'
          },
          {
            key: 5,
            name: 'Clima'
          },
          {
            key: 10,
            name: 'Outros'
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
  }

  addDataToState(data) {
    data.sending = false;
    const texts = this.state.data.get('texts').push(data);
    const newData = this.state.data.set('texts', texts);
    this.setState({ data: newData });
  }

  render() {
    return (
      <div className="app">
        <Header query={this.state.data.get('query')} />

        <main>
          <div className="container">
            <h3>In which category does the text fits most?</h3>

            <TextList data={this.state.data.get('texts')} categories={this.state.data.get('categories')} onClassificate={this.handleTextClassification.bind(this)} />
            <p className="text-center"><span className="fa fa-spinner fa-spin fa-2x"></span></p>
          </div>
        </main>
      </div>
    )
  }

  handleTextClassification(dataIndex, data, category) {
    this.socket.emit('classificate', data, category, () => {
      const texts = this.state.data.get('texts').splice(dataIndex, 1);
      console.log(texts);
      const newData = this.state.data.update('texts', texts);
      this.setState({ data: newData });
    });

    const texts = this.state.data.get('texts').update(dataIndex, row => {
      row.sending = true;
      return row;
    });
    const newData = this.state.data.set('texts', texts);
    this.setState({ data: newData });
  }
}

