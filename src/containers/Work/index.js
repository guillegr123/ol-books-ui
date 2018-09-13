import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import store from '../../store';

class SingleSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      olid: null,
      work: null
    };
  }

  componentDidMount() {
    console.log('ComponentDidMount');
    const { olid } = this.props.match.params;
    axios.get(`http://openlibrary.org/works/${olid}.json`)
      .then(res => res.data)
      .then(work => {
        console.log('Work obtained');
        console.log(work);
        store.dispatch({
          type: 'ADD_WORK_TO_HISTORY',
          olid,
          title: work.title
        });
        console.log('Set state');
        this.setState({ olid, work });
        console.log('State setted');
      });
  }

  render() {
    let doc = this.state.work;
    let olid = this.state.olid;
    let itemData = this.props.location.itemData;

    return (
      <Container text>
        {
          doc
          &&
          <div>
            {
              itemData.coverKey
              ?
              <img src={`http://covers.openlibrary.org/b/olid/${itemData.coverKey}-L.jpg`} alt={itemData.coverKey} />
              :
              <div className="ui image placeholder" />
            }
            <h1>{doc.title}</h1>
            <div>
              <ul>
                {
                  doc.author_name
                  &&
                  <li>
                    <b>Autor(es): </b>
                    { doc.author_name.join(', ') }
                  </li>
                }
                {
                  doc.publisher
                  &&
                  <li>
                    <b>Editorial(es): </b>
                    { doc.publisher.join(', ') }
                  </li>
                }
                {
                  doc.language
                  &&
                  <li>
                    <b>Idioma(s): </b>
                    { doc.language.join(', ') }
                  </li>
                }
              </ul>
            </div>
          </div>
        }
      </Container>
    )
  }
}

export default SingleSeries;
