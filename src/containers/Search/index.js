import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

class Search extends Component {
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
          console.log(`Data obtained for "${searchText}"!`)
          return res.data;
        })
        .then(data => {
          console.log(`Data read for "${searchText}"!`)
          console.log(data);
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <div>
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
        }</div>
    );
  }
}

export default Search;
