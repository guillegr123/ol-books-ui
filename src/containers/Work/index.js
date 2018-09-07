import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class SingleSeries extends Component {
  state = {
    olid: null,
    work: null
  }

  componentDidMount() {
    const { olid } = this.props.match.params;
    axios.get(`http://openlibrary.org/works/${olid}.json`)
      .then(res => res.data)
      .then(work => {
        console.log(work);
        this.setState({ olid, work })
      });
  }

  render() {
    const doc = this.state.work;
    const olid = this.state.olid;

    return (
      <Container text>
        {
          doc
          &&
          <div>
            {
              olid
              ?
              <img src={`http://covers.openlibrary.org/b/olid/${olid}-L.jpg`} alt={olid} />
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
