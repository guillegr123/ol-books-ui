import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      searchText: ''
    }
  }

  onSearchTextChanged = e => {
    var searchText = e.target.value;
    this.setState({ searchText, isLoading: searchText.trim() !== '' });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Biblioteca abierta</h1>
        </header>
        <body className="App-body">
          <Input
            loading={ this.state.isLoading }
            value={ this.state.searchText }
            onChange={ this.onSearchTextChanged }
            iconPosition="right"
            placeholder="Buscar..." />
            <br />
            {
              this.state.isLoading
              &&
              <p>
                Buscando &quot;{ this.state.searchText }&quot;...
              </p>
            }
        </body>
      </div>
    );
  }
}

export default App;
