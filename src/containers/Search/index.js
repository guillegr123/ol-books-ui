import React, { Component } from 'react'
import { Input, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import SearchResultsList from '../../components/SearchResultsList'
import './Search.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      searchText: '',
      searchTimeoutId: 0,
      searchResults: []
    }
  }

  processSearch = () => {
    this.setState({ searchTimeoutId: 0 });
    var { searchText } = this.state;
    searchText = searchText.trim().replace(' ', '+');
    axios.get(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(res => {
          console.log(`Data obtained for "${searchText}"!`)
          return res.data;
        })
        .then(data => {
          console.log(`Data read for "${searchText}"!`)
          console.log(data);
          this.setState({ isLoading: false, searchResults: data.docs });
        });
  }

  onSearchTextChanged = e => {
    var searchText = e.target.value;
    this.setState({ searchText });
    var doSearch = searchText.trim() !== '';
    this.setState({ isLoading: doSearch});

    if (this.state.searchTimeoutId !== 0) {
      console.log('Cleared timeout');
      clearTimeout(this.state.searchTimeoutId);
    }

    if (doSearch) {
      this.setState({ searchTimeoutId: setTimeout(this.processSearch, 1000) });
    } else {
      this.setState({ searchResults: [] });
    }
  }

  render() {
    return (
      <Container text className="search">
        <div className="header">
          <Input
            loading={this.state.isLoading}
            value={this.state.searchText}
            onChange={this.onSearchTextChanged}
            placeholder="Buscar..." />
          <br />
          {
            this.state.isLoading
            &&
            <p>
              Buscando &quot;{this.state.searchText}&quot;...
            </p>
          }
        </div>
        <SearchResultsList docs={ this.state.searchResults } />  
      </Container>
    );
  }
}

export default Search;
