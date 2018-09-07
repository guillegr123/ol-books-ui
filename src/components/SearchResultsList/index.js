import React from 'react';
import { List, Image } from 'semantic-ui-react'
import './SearchResultsList.css'

const SearchResultsList = props => (
  <List divided relaxed>
    { props.docs.map(doc =>
      <List.Item key={doc.key}>
        {
          doc.cover_edition_key
          ?
          <Image src={`http://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`} />
          :
          <div className="ui image placeholder" />
        }
        <List.Content>
          <List.Header>
            { doc.title }
          </List.Header>
          <List.Description>
            <ul>
              <li>
                <b>Tipo: </b> { doc.type }
              </li>
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
          </List.Description>
        </List.Content>
      </List.Item>
    ) }
 </List>
);

export default SearchResultsList;
