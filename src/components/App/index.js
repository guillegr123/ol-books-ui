import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
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
    var doSearch = searchText.trim() !== '';
    this.setState({ searchText, isLoading: doSearch });
    if (doSearch) {
      searchText = searchText.replace(' ', '+');
      axios.get(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(res => {
          console.log(res.data);
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Biblioteca abierta</h1>
        </header>
        <div className="App-body">
          <Input
            loading={ this.state.isLoading }
            value={ this.state.searchText }
            onChange={ this.onSearchTextChanged }
            placeholder="Buscar..." />
            <br />
            {
              this.state.isLoading
              &&
              <p>
                Buscando &quot;{ this.state.searchText }&quot;...
              </p>
            }
        </div>
      </div>
    );
  }
}

export default App;
